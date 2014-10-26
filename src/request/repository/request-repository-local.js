var glimpse = require('glimpse');
var store = require('store.js');

var _storeSummaryKey = 'glimpse.data.summary.local',
    _storeDetailKey = 'glimpse.data.request.local',
    _storeDetailIndex = 'glimpse.data.request.local.index';

(function() {
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
      }
    }

    glimpse.on('data.request.summary.found.remote', storeFoundSummary);
    glimpse.on('data.request.summary.found.stream', storeFoundSummary);
})();

(function() {

    function storeFoundDetail(data) {
      var storeDetail = store.get(_storeDetailKey) || {};
      var storeDetailIndex = store.get(_storeDetailIndex) || [];
      storeDetail[data.id] = data;
      storeDetailIndex.unshift(data.id);

      if(storeDetailIndex.length > 10){
        var id = storeDetailsIndex.pop();
        delete storeDetail[id];
      }

      store.set(_storeDetailKey, storeDetail);
      store.set(_storeDetailIndex, storeDetailIndex)
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
