require('./request-store-manage');

var glimpse = require('glimpse'),
    resourceRepository = require('./request-repository-remote'),
    localRepository = require('./request-repository-local'),
    streamRepository = require('./request-repository-stream');

module.exports = {
    triggerGetLastestSummaries: function() {
        resourceRepository.triggerGetLastestSummaries();
        localRepository.triggerGetLastestSummaries();
    },
    triggerGetDetailsFor: function(requestId) {
        resourceRepository.triggerGetDetailsFor(requestId);
        localRepository.triggerGetDetailsFor(requestId);
    },
    // TODO: Need to look and see if this is the best place for these
    subscribeToLatestSummaries: function() {
        streamRepository.subscribeToLatestSummaries();
    },
    subscribeToLatestSummariesPatches: function() {
        streamRepository.subscribeToLatestSummariesPatches();
    },
    subscribeToDetailsPatchesFor: function(requestId) {
        streamRepository.subscribeToDetailsPatchesFor(requestId);
    }
};
