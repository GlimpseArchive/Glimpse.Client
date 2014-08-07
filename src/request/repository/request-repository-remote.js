var glimpse = require('glimpse');

// TODO: get data from server and publish notifications

module.exports = {
    triggerGetLastestSummary: function() {
        // TODO: Need to complete
        //       Ajax call to REST endpoint

        // simulate success callback
        setTimeout(function() {
            glimpse.emit('data.request.summary.found.remote', []);
        }, 0);
    },
    triggerGetDetailFor: function(requestId) {
        // TODO: Need to complete
        //       Ajax call to REST endpoint

        // simulate success callback
        setTimeout(function() {
            glimpse.emit('data.request.detail.found.remote', []);
        }, 0);
    }
};
