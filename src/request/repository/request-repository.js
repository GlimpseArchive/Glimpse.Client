'use strict';

require('./request-store-manage');

var glimpse = require('glimpse');
var resourceRepository = require('./request-repository-remote');
var localRepository = require('./request-repository-local');
var streamRepository = require('./request-repository-stream');

module.exports = {
    triggerGetLastestSummaries: function () {
        if (!FAKE_SERVER) {
            resourceRepository.triggerGetLastestSummaries();
            localRepository.triggerGetLastestSummaries();
        }
    },
    triggerGetDetailsFor: function (requestId) {
        if (!FAKE_SERVER) {
            resourceRepository.triggerGetDetailsFor(requestId);
            localRepository.triggerGetDetailsFor(requestId);
        }
    },
    // TODO: Need to look and see if this is the best place for these
    subscribeToLatestSummaries: function () {
        streamRepository.subscribeToLatestSummaries();
    },
    subscribeToLatestSummariesPatches: function () {
        streamRepository.subscribeToLatestSummariesPatches();
    },
    subscribeToDetailsPatchesFor: function (requestId) {
        streamRepository.subscribeToDetailsPatchesFor(requestId);
    }
};
