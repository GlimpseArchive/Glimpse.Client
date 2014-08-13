var glimpse = require('glimpse'),
    // TODO: Not sure if the data will ultimately live here or not
    userData = [],
    userDataIndex = {};

// republish Found Entry
(function() {
    function republishFoundEntry(requests) {
        // TODO: Need to support if the user is missing
        // TODO: This is very naive atm, no sorting or indexing, etc present
        var newUsers = [];
        for (var i = 0; i < requests.length; i++) {
            var user = requests[i].user,
                currentIndex = userDataIndex[user.id];
            if (currentIndex === undefined) {
                currentIndex = userData.length;
                userDataIndex[user.id] = currentIndex;
                newUsers.push(user);
            }

            userData[currentIndex] = user;
        }

        var payload = {
                allUsers: userData,
                newUsers: newUsers,
                newRequests: requests
            };

        glimpse.emit('data.user.detail.found', payload);
    }

    glimpse.on('data.user.detail.found.local', republishFoundEntry);
    glimpse.on('data.user.detail.found.internal', republishFoundEntry);
})();

// TODO: NOT SURE THIS IS THE BEST PLACE FOR THIS
// process Request Update
(function() {
    function mergeUpdateSummary(data) {

        // TODO: Need to complete
        //       Pull from store, publish result

        glimpse.emit('data.user.detail.update', []);
    }

    glimpse.on('data.request.summary.update', mergeUpdateSummary);
})();
