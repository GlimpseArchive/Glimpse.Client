var glimpse = require('glimpse'),
    _requests = [],
    _filteredRequests = [],
    _filters = {};

function requestsChanged(targetRequests) {
    glimpse.emit('shell.request.summary.changed', targetRequests);
}

// TODO: This needs to be refactored to dynamically lookup records, etc
// TODO: Even at the moment this is going to need to be refactored
var filterRequests = (function() {
        function hasFilters(filters) {
            return filters.userId;
        }

        function checkMatch(request, filters) {
            return (request.user.id === filters.userId);
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

                if (applyFilters(sourceRequests, _filteredRequests, _filters)) {
                    requestsChanged(_filteredRequests);
                }
            }
            else {
                requestsChanged(_requests);
            }
        };
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

/*
// TODO: Need to see if this is needed
module.exports = {
    getAllFor: function(sessionId) {
        console.log(sessionId);
        return _requests;
    }
};
*/
