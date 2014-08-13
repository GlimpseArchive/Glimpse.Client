var glimpse = require('glimpse');

// store Found Summary
(function() {
    function storeFoundSummary(data) {
        // TODO: Need to complete
        //       Push into local storage
    }

    glimpse.on('data.request.summary.found.remote', storeFoundSummary);
    glimpse.on('data.request.summary.found.stream', storeFoundSummary);
})();

// store Found Detail
(function() {
    function storeFoundDetail(data) {
        // TODO: Need to complete
        //       Push into local storage
    }

    glimpse.on('data.request.detail.found.remote', storeFoundDetail);
})();

module.exports = {
    triggerGetLastestSummaries: function() {
        // TODO: Need to complete
        //       Pull from local storage

        glimpse.emit('data.request.summary.found.local', []);
    },
    triggerGetDetailFor: function(requestId) {
        // TODO: Need to complete
        //       Pull from local storage

        glimpse.emit('data.request.detail.found.local', []);
    }
};
