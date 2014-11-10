'use strict';

var glimpse = require('glimpse');

// store Found Summary
(function () {
    function processFoundSummary(requests) {
        glimpse.emit('data.user.detail.found.internal', requests);
    }

    glimpse.on('data.request.summary.found.remote', processFoundSummary);
    glimpse.on('data.request.summary.found.stream', processFoundSummary);
    // TODO: If we switch to storing session in local storage this needs to be removed
    glimpse.on('data.request.summary.found.local', processFoundSummary);
})();

// merge Patch Summary
(function () {
    function processUpdateSummary(requests) {

        // TODO: Need to complete
        //       Transform request object to user object

        glimpse.emit('data.user.detail.update', []);
    }

    glimpse.on('data.request.summary.update', processUpdateSummary);
})();
