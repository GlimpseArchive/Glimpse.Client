'use strict';

var glimpse = require('glimpse');
var requestRepository = require('../repository/request-repository');

// TODO: Not sure I need to store the requests
var _requests = {};
var _viewModel = {
    selectedId: null,
    request: null
};

function requestChanged(targetRequests) {
    glimpse.emit('shell.request.detail.changed', targetRequests);
}

// Clear Request
(function () {
    function clearRequest() {
        _viewModel.selectedId = null;
        _viewModel.request = null;

        requestChanged(_viewModel);
    }

    glimpse.on('shell.request.detail.closed', clearRequest);
})();

// Found Data
(function () {
    function dataFound(payload) {
        var newRequest = payload.newRequest;

        _requests[newRequest.id] = newRequest;

        if (_viewModel.selectedId === newRequest.id) {
            _viewModel.request = newRequest;

            requestChanged(_viewModel);
        }
    }

    // External data coming in
    glimpse.on('data.request.detail.found', dataFound);
})();

// Trigger Requests
(function () {
    function triggerRequest(payload) {
        var requestId = payload.requestId;

        _viewModel.selectedId = requestId;
        _viewModel.request = null;

        requestChanged(_viewModel);

        requestRepository.triggerGetDetailsFor(requestId);
    }

    glimpse.on('data.request.detail.requested', triggerRequest);
})();
