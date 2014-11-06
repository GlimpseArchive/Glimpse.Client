'use strict';

var glimpse = require('glimpse');

module.exports = {
    subscribeToLatestSummaries: function() {
        // TODO: Need to complete
        //       Subscribe via socket

        // simulate success callback
        setTimeout(function() {
            glimpse.emit('data.request.summary.found.stream', []);
        }, 0);
    },
    subscribeToLatestSummariesPatches: function() {
        // TODO: Need to complete
        //       Subscribe via socket

        // simulate success callback
        setTimeout(function() {
            glimpse.emit('data.request.summary.patch.found.stream', []);
        }, 0);
    },
    subscribeToDetailsPatchesFor: function(requestId) {
        // TODO: Need to complete
        //       Subscribe via socket

        // simulate success callback
        setTimeout(function() {
            glimpse.emit('data.request.detail.patch.found.stream', []);
        }, 0);
    }
};
