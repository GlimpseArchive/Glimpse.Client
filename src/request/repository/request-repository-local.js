var glimpse = require('glimpse');
var store = require('store');

var _storeSummaryKey = 'glimpse.data.summary.local',
   _storeDetailKey = 'glimpse.data.request.local',
   _storeDetailIndex = 'glimpse.data.request.local.index';

(function() {
   var storeSummary;

   function storeFoundSummary(data) {
      storeSummary = store.get(_storeSummaryKey) || [];
      for (var i = 0; i < data.length; i++) {
         var request = data[i];
         storeSummary.unshift(request);
      }
      flush();
      store.set(_storeSummaryKey, storeSummary);
   }

   function flush(){
      while(storeSummary.length > 100){
         storeSummary.pop();
      }
   }

   glimpse.on('data.request.summary.found.remote', storeFoundSummary);
   glimpse.on('data.request.summary.found.stream', storeFoundSummary);
})();

(function() {
   var storeDetail, storeDetailIndex;

   function storeFoundDetail(data) {
      storeDetail = store.get(_storeDetailKey) || {};
      storeDetailIndex = store.get(_storeDetailIndex) || [];
      storeDetail[data.id] = data;
      storeDetailIndex.unshift(data.id);
      flush();
      store.set(_storeDetailKey, storeDetail);
      store.set(_storeDetailIndex, storeDetailIndex)
   }

   function flush(){
      while(storeDetailIndex.length > 10){
         var id = storeDetailsIndex.pop();
         delete storeDetail[id];
      }
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
