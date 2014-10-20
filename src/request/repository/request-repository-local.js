var glimpse = require('glimpse');
var store = require('store.js');

var _storeSummaryKey = 'glimpse.data.summary',
    _storeDetailKey = 'glimpse.data.request',
    _mapRequestsSummary = 'glimpse.data.summary.maps';
// store Found Summary
(function() {
    //TODO: Need to complete
    //Push into local storage
    //address error handling, flushing out old data
    function storeFoundSummary(data) {
        var storeSummary = store.get(_storeSummaryKey) || [];
        var mapping = store.get(_mapRequestsSummary) || {};
        for (var i = 0; i < data.length; i++) {
            var request = data[i];
            storeSummary.push(request);
            mapping[storeSummary.length - 1] = request.id;
            mapping[request.id] = storeSummary.length - 1;
        }
        store.set(_storeSummaryKey, storeSummary);
        store.set(_mapRequestsSummary, mapping);
    }

    glimpse.on('data.request.summary.found.remote', storeFoundSummary);
    glimpse.on('data.request.summary.found.stream', storeFoundSummary);
})();

// store Found Detail
(function() {
    //TODO: Need to complete
    //Push into local storage
    //address error handling, flushing out old data
    function storeFoundDetail(data) {
      //needs to be redone like above to enable flushing
    }

    glimpse.on('data.request.detail.found.remote', storeFoundDetail);
})();

module.exports = {
    triggerGetLastestSummaries: function() {
      //TODO: Need to complete
      //Pull from local storage
      //address error handling
        var data = store.get(_storeSummaryKey);
        if(data){
          glimpse.emit('data.request.summary.found.local', data);
        }
    },
    triggerGetDetailsFor: function(requestId) {
      //TODO: Need to complete
      //Pull from local storage
      //address error handling
      //needs to be redone like above, and then use mappings
    }

};
