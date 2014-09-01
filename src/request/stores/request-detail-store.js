var glimpse = require('glimpse'),
    requestRepository = require('../repository/request-repository.js'),
    // TODO: Not sure I need to store the requests
    _requests = {};

function requestsChanged(targetRequests) {
    glimpse.emit('shell.request.summary.changed', targetRequests);
}

// Clear Request
(function() {
    function clearRequest() {
        glimpse.emit('shell.request.detail.changed', null);
    }

    glimpse.on('shell.request.detail.closed', clearRequest);
})();

// Found Data
(function() {
    function dataFound(payload) {
        // TODO: Really bad hack to get things going atm
        _requests[payload.newRequest.id] = payload.newRequest;

        glimpse.emit('shell.request.detail.changed', payload.newRequest);
    }

    // External data coming in
    glimpse.on('data.request.detail.found', dataFound);
})();

// Trigger Requests
(function() {
    function triggerRequest(payload) {
        if (!FAKE_SERVER) {
            requestRepository.triggerGetDetailsFor(payload.id);
        }
    }

    glimpse.on('data.request.detail.requested', triggerRequest);
})();
