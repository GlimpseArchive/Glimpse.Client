'use strict';

var glimpse = require('glimpse');

// TODO: get data from server and publish notifications

module.exports = {
    triggerGetLastestSummaries: function() {
        // TODO: Need to complete
        //       Ajax call to REST endpoint

        // simulate success callback
        setTimeout(function() {
            glimpse.emit('data.request.summary.found.remote', []);
        }, 0);
    },
    triggerGetDetailsFor: function(requestId) {
        // TODO: Need to complete
        //       Ajax call to REST endpoint

        // simulate success callback
        setTimeout(function() {
            glimpse.emit('data.request.detail.found.remote', []);
        }, 0);
    }
};
