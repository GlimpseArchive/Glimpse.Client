var glimpse = require('glimpse');
var store = require('store.js');

var _storeSummaryKey = 'glimpse.data.summary.local',
    _storeDetailKey = 'glimpse.data.request.local';
// store Found Summary
(function() {
    //TODO: Need to complete
    //Push into local storage
    //address error handling, flushing out old data
    var storeSummary = store.get(_storeSummaryKey) || [];
    var storeDetail = store.get(_storeDetailKey) || {};
    function storeFoundSummary(data) {
        for (var i = 0; i < data.length; i++) {
            var request = data[i];
            storeSummary.unshift(request);
        }
        flush(storeSummary);
        store.set(_storeSummaryKey, storeSummary);
    }

    function flush(storeArray){
      while(storeArray.length > 100){
        var summary = storeArray.pop();
        if(storeDetail[summary.id])
          storeDetail[summary.id] = undefined;
      }
      //update detail store
      store.set(_storeDetailKey, storeDetail);
    }

    glimpse.on('data.request.summary.found.remote', storeFoundSummary);
    glimpse.on('data.request.summary.found.stream', storeFoundSummary);
})();

(function() {

    function storeFoundDetail(data) {
      var storeDetail = store.get(_storeDetailKey) || {};
      storeDetail[data.id] = data;
      store.set(_storeDetailKey, storeDetail);
    }

    glimpse.on('data.request.detail.found.remote', storeFoundDetail);
})();

module.exports = {
    triggerGetLastestSummaries: function() {
        var data = store.get(_storeSummaryKey);
        if(data){
          glimpse.emit('data.request.summary.found.local', data);
        }
    },
    triggerGetDetailsFor: function(requestId) {
        var data = store.get(_storeDetailKey);
        if(data){
          var requestDetail = data[requestId];
          if(requestDetail){
            glimpse.emit('data.request.detail.found.local', requestDetail);
          }
        }
    }

};
