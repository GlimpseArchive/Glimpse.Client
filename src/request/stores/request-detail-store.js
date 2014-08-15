var glimpse = require('glimpse'),
    requestRepository = require('../repository/request-repository.js'),
    _requests = {};

function requestsChanged(targetRequests) {
    glimpse.emit('shell.request.summary.changed', targetRequests);
}

(function() {
    function dataFound(payload) {
        // TODO: Really bad hack to get things going atm
        _requests[payload.newRequest.id] = payload.newRequest;

        filterRequests(_requests, payload.newRequests, false);
    }

    // External data coming in
    glimpse.on('data.request.detail.found', dataFound);
})();

(function() {
    function triggerRequest(payload) {
        if (!FAKE_SERVER) {
            requestRepository.triggerGetDetailsFor(payload.id);
        }
    }

    glimpse.on('data.request.detail.requested', dataFound);
})();
