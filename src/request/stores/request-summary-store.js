var glimpse = require('glimpse'),
    requestRepository = require('../repository/request-repository.js'),
    _requests = [],
    _filteredRequests = [],
    _filters = {};

function requestsChanged(targetRequests) {
    glimpse.emit('shell.request.summary.changed', targetRequests);
}

// TODO: This needs to be refactored to dynamically lookup records, etc
// TODO: Even at the moment this is going to need to be refactored
var filterRequests = (function() {
    var filterSchema = {
            userId: {
                type: 'exact',
                get: function(request) { return request.user.id; }
            },
            uri: { type: 'exact' }, // TODO: Switch over to `regex` at some point
            method: { type: 'array' },
            contentType: { type: 'array' },
            statusCode: { type: 'array' }
        },
        filterSchemaActions = {
            exact: function(recordValue, filterValue) {
                return recordValue === filterValue;
            },
            array: function(recordValue, filterValue) {
                var filterValues = filterValue.split(',').map(function(item) { return item.trim(); });

                return filterValues.indexOf(recordValue + '') > -1;
            }
        };

    function hasFilters(filters) {
        for (var key in filters) {
            return true;
        }
        return false;
    }

    function checkMatch(request, filters) {
        for (var key in filters) {
            var filterValue = filters[key];
            if (filterValue) {
                var schema = filterSchema[key],
                    schemaAction = filterSchemaActions[schema.type],
                    requestValue = schema.get ? schema.get(request) : request[key];

                if (!schemaAction(requestValue, filterValue)) {
                    return false;
                }
            }
        }

        return true;
    }

    function applyFilters(sourceRequests, destinationRequests, filters) {
        var matchFound = false;

        for (var i = sourceRequests.length - 1; i >= 0; i--) {
            var sourceRequest = sourceRequests[i];

            if (checkMatch(sourceRequest, filters)) {
                destinationRequests.unshift(sourceRequest);
                matchFound = true;
            }
        }

        return matchFound;
    }

    return function(allRequests, newRequests, filterHasChanged) {
        if (hasFilters(_filters)) {
            var sourceRequests = newRequests;

            if (filterHasChanged) {
                sourceRequests = allRequests;
                _filteredRequests = [];
            }

            var matchFound = applyFilters(sourceRequests, _filteredRequests, _filters);
            if (matchFound || filterHasChanged) {
                requestsChanged(_filteredRequests);
            }
        }
        else {
            requestsChanged(_requests);
        }
    };
})();

(function() {
    function userClear() {
        _filters.userId = null;

        filterRequests(_requests, null, true);
    }

    glimpse.on('shell.request.user.clear.selected', userClear);
})();

(function() {
    function filterUpdate(payload) {
        for (var key in payload) {
            _filters[key] = payload[key];
        }

        filterRequests(_requests, null, true);
    }

    glimpse.on('shell.request.filter.updated', filterUpdate);
})();

(function() {
    function userSwitch(payload) {
        _filters.userId = payload.userId;

        filterRequests(_requests, null, true);
    }

    glimpse.on('shell.request.user.selected', userSwitch);
})();

(function() {
    function dataFound(payload) {
        // TODO: Really bad hack to get things going atm
        _requests = payload.allRequests;

        filterRequests(_requests, payload.newRequests, false);
    }

    // External data coming in
    glimpse.on('data.request.summary.found', dataFound);
})();

(function() {
    function triggerRequest() {
        if (!FAKE_SERVER) {
            requestRepository.triggerGetLastestSummaries();
        }
    }

    glimpse.on('shell.request.summary.requested', triggerRequest);
})();
