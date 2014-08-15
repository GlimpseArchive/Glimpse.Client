var glimpse = require('glimpse'),
    requestRepository = require('../repository/request-repository.js'),
    _requests = [],
    _requestIndex = {},
    _filteredRequests = [],
    _filters = {},
    _requestSelected = null;

function notifyRequestsChanged(targetRequests) {
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

    function applyFilters(targetRequests, destinationRequests, filters) {
        var matchFound = false;

        for (var i = targetRequests.length - 1; i >= 0; i--) {
            var sourceRequest = targetRequests[i];

            if (checkMatch(sourceRequest, filters)) {
                destinationRequests.unshift(sourceRequest);
                matchFound = true;
            }
        }

        return matchFound;
    }

    return function(allRequests, newRequests, filterHasChanged) {
        if (hasFilters(_filters)) {
            var targetRequests = newRequests;

            if (filterHasChanged) {
                targetRequest = allRequests;
                _filteredRequests = [];
            }

            var matchFound = applyFilters(targetRequest, _filteredRequests, _filters);
            if (!newRequests || matchFound || filterHasChanged) {
                notifyRequestsChanged(_filteredRequests);
            }
        }
        else {
            notifyRequestsChanged(_requests);
        }
    };
})();

(function() {
    function updateFilter(payload) {
        for (var key in payload) {
            _filters[key] = payload[key];
        }

        filterRequests(_requests, null, true);
    }

    glimpse.on('shell.request.filter.updated', updateFilter);
})();

(function() {
    function clearUser() {
        _filters.userId = null;

        filterRequests(_requests, null, true);
    }

    glimpse.on('shell.request.user.clear.selected', clearUser);
})();

(function() {
    function selectUser(payload) {
        _filters.userId = payload.userId;

        filterRequests(_requests, null, true);
    }

    glimpse.on('shell.request.user.selected', selectUser);
})();

(function() {
    var clear = function(oldRequestId, requests) {
            if (oldRequestId) {
                var oldRequest = requests[oldRequestId];
                if (oldRequest) {
                    oldRequest._selected = false;
                }
            }
        },
        select = function(requestId, requests) {
            var request = requests[requestId];
            if (request) {
                request._selected = true;
            }
        };

    function selectRequest(payload) {
        var requestId = payload.requestId,
            oldRequestId = _requestSelected,
            requests = _requestIndex;

        clear(oldRequestId, requests);
        select(requestId, requests);

        _requestSelected = requestId;

        filterRequests(_requests, [], false);

        glimpse.emit('data.request.detail.requested', payload);
    }

    glimpse.on('shell.request.summary.selected', selectRequest);
})();

(function() {
    function foundData(payload) {
        // TODO: Really bad hack to get things going atm

        // Store data locally
        _requests = payload.allRequests;

        for (var i = 0; i < payload.newRequests.length; i++) {
            var request = payload.newRequests[i];
            _requestIndex[request.id] = request;
        }

        filterRequests(_requests, payload.newRequests, false);
    }

    // External data coming in
    glimpse.on('data.request.summary.found', foundData);
})();

// TODO: Look at changing the name of this to bring it into line with the above
(function() {
    function triggerRequest() {
        if (!FAKE_SERVER) {
            requestRepository.triggerGetLastestSummaries();
        }
    }

    glimpse.on('shell.request.summary.requested', triggerRequest);
})();
