'use strict';

var glimpse = require('glimpse');
    // TODO: Not sure if the data will ultimately live here or not
var summaryData = [];
var detailData = [];

// republish Found Summary
(function () {
    function republishFoundSummary(requests) {
        // TODO: This is very naive atm, no sorting or indexing, etc present
        for (var i = requests.length - 1; i >= 0; i--) {
            summaryData.unshift(requests[i]);
        }

        var payload = {
            allRequests: summaryData,
            newRequests: requests
        };

        glimpse.emit('data.request.summary.found', payload);
    }

    // NOTE: the fact that we are listening to both local and remote,
    //       means that we will get notifications from first and then
    //       from remote. This means that the same record could get
    //       multiple notifications for the one record. This is by design
    //       and shouldn't cause any side effects.

    glimpse.on('data.request.summary.found.local', republishFoundSummary);
    glimpse.on('data.request.summary.found.remote', republishFoundSummary);
    glimpse.on('data.request.summary.found.stream', republishFoundSummary);
})();

// republish Found Details
(function () {
    function republishFoundDetail(request) {
        detailData.push(request);

        glimpse.emit('data.request.detail.found', { allRequests: detailData, newRequest: request });
    }

    // NOTE: the fact that we are listening to both local and remote,
    //       means that we will get notifications from first and then
    //       from remote. This means that the same record could get
    //       multiple notifications for the one record. This is by design
    //       and shouldn't cause any side effects.

    glimpse.on('data.request.detail.found.local', republishFoundDetail);
    glimpse.on('data.request.detail.found.remote', republishFoundDetail);
})();

// TODO: NOT SURE THIS IS THE BEST PLACE FOR THIS
// merge Patch Summary
(function () {
    function mergePatchSummary(data) {

        // TODO: Need to complete
        //       Pull from store, publish result

        glimpse.emit('data.request.summary.update', []);
    }

    glimpse.on('data.request.summary.patch.found.stream', mergePatchSummary);
})();

// merge Patch Details
(function () {
    function mergePatchDetail(data) {

        // TODO: Need to complete
        //       Pull from store, publish result

        glimpse.emit('data.request.detail.update', []);
    }

    glimpse.on('data.request.detail.patch.found.stream', mergePatchDetail);
})();
