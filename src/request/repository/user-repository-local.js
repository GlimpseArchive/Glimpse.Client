var glimpse = require('glimpse');

// TODO: Do we even need this... going to try and just read from the request stream
//       rather than trying to process again
// TODO: Subscribe to resource updates and save, subscribe to stram and update
// TODO: get data from local and publish notifications

// store Found Entry
(function() {
    function storeFoundEntry(data) {
        // TODO: Need to complete - Might be better off in local repository
        //       Push into local storage
    }

    glimpse.on('data.user.entry.found.internal', storeFoundEntry);
})();

module.exports = {
    triggerGetLastestUsers: function() {
        // TODO: Need to complete
        //       Pull from local storage and republish

        glimpse.emit('data.user.entry.found.local', []);
    }
};
