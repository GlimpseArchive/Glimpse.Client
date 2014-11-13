'use strict';

var glimpse = require('glimpse');
var requestRepository = require('../repository/request-repository');

var _requests = [];
var _requestIndex = {};
var _filteredRequests = [];
var _filters = {};
var _requestSelectedId = null;

function notifyRequestsChanged(targetRequests) {
    glimpse.emit('shell.request.summary.changed', targetRequests);
}

// TODO: Shift into different module
// TODO: This needs to be refactored to dynamically lookup records, etc
// TODO: Even at the moment this is going to need to be refactored
var filterRequests = (function () {
    var filterSchema = {
        userId: {
            type: 'exact',
            get: function (request) { return request.user.id; }
        },
        uri: { type: 'exact' }, // TODO: Switch over to `regex` at some point
        method: { type: 'array' },
        contentType: { type: 'array' },
        statusCode: { type: 'array' }
    };
    var filterSchemaActions = {
        exact: function (recordValue, filterValue) {
            return recordValue === filterValue;
        },
        array: function (recordValue, filterValue) {
            var filterValues = filterValue.split(',').map(function (item) { return item.trim(); });

            return filterValues.indexOf(recordValue + '') > -1;
        }
    };

    function hasFilters(filters) {
        return Object.keys(filters).length;
    }

    function checkMatch(request, filters) {
        for (var key in filters) {
            var filterValue = filters[key];
            if (filterValue) {
                var schema = filterSchema[key];
                var schemaAction = filterSchemaActions[schema.type];
                var requestValue = schema.get ? schema.get(request) : request[key];

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

    return function (allRequests, newRequests, filterHasChanged) {
        if (hasFilters(_filters)) {
            var targetRequests = newRequests;

            if (filterHasChanged) {
                targetRequests = allRequests;
                _filteredRequests = [];
            }

            var matchFound = applyFilters(targetRequests, _filteredRequests, _filters);
            if (!newRequests || matchFound || filterHasChanged) {
                notifyRequestsChanged(_filteredRequests);
            }
        } else {
            notifyRequestsChanged(_requests);
        }
    };
})();

// Update Filter
(function () {
    function updateFilter(payload) {
        for (var key in payload) {
            _filters[key] = payload[key];
        }

        filterRequests(_requests, null, true);
    }

    glimpse.on('shell.request.filter.updated', updateFilter);
})();

// Clear User
(function () {
    function clearUser() {
        _filters.userId = null;

        filterRequests(_requests, null, true);
    }

    glimpse.on('shell.request.user.clear.selected', clearUser);
})();

// Select User
(function () {
    function selectUser(payload) {
        _filters.userId = payload.userId;

        filterRequests(_requests, null, true);
    }

    glimpse.on('shell.request.user.selected', selectUser);
})();

// Clear Request
(function () {
    function clearRequest() {
        _requestIndex[_requestSelectedId]._selected = false;
        _requestSelectedId = null;

        filterRequests(_requests, [], false);
    }

    glimpse.on('shell.request.detail.closed', clearRequest);
})();

// Select Request
(function () {
    function clear(oldRequestId, requests) {
        if (oldRequestId) {
            var oldRequest = requests[oldRequestId];
            if (oldRequest) {
                oldRequest._selected = false;
            }
        }
    }
    function select(requestId, requests) {
        var request = requests[requestId];
        if (request) {
            request._selected = true;
        }
    }

    function selectRequest(payload) {
        var requestId = payload.requestId;
        var oldRequestId = _requestSelectedId;
        var requests = _requestIndex;

        clear(oldRequestId, requests);
        select(requestId, requests);

        _requestSelectedId = requestId;

        filterRequests(_requests, [], false);

        glimpse.emit('data.request.detail.requested', payload);
    }

    glimpse.on('shell.request.summary.selected', selectRequest);
})();

// Found Request
(function () {
    function foundRequest(payload) {
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
    glimpse.on('data.request.summary.found', foundRequest);
})();

// Trigger Requests
// TODO: Look at changing the name of this to bring it into line with the above
(function () {
    function triggerRequest() {
        requestRepository.triggerGetLastestSummaries();
    }

    glimpse.on('shell.request.summary.requested', triggerRequest);
})();
