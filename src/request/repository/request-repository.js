require('./request-store-manage');

var glimpse = require('glimpse'),
    resourceRepository = require('./request-repository-remote'),
    localRepository = require('./request-repository-local'),
    streamRepository = require('./request-repository-stream');

module.exports = {
    triggerGetLatestSummaryForSession: function(sessionId) {
        // TODO: Not sure how this is going to work yet
        //       i.e. triggering a request for given sessions request
    triggerGetLastestSummaries: function() {
        resourceRepository.triggerGetLastestSummaries();
        localRepository.triggerGetLastestSummaries();
    },
    triggerGetDetailFor: function(requestId) {
        resourceRepository.triggerGetDetailFor(requestId);
        localRepository.triggerGetDetailFor(requestId);
    },
    // TODO: Need to look and see if this is the best place for these
    subscribeToLatestSummaries: function() {
        streamRepository.subscribeToLatestSummaries();
    },
    subscribeToLatestSummariesPatches: function() {
        streamRepository.subscribeToLatestSummariesPatches();
    },
    subscribeToDetailPatchesFor: function(requestId) {
        streamRepository.subscribeToDetailPatchesFor(requestId);
    }
};
