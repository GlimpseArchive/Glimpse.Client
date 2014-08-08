var glimpse = require('glimpse'),
    _users = {};

(function() {
    // TODO: Need to update to make sure it can work with out of order/old
    //       requests coming in.
    // TODO: Timeouts should probably come from config
    // TODO: Should probably be abstracted out into its own module
    var manageRequest = (function() {
            function removeRequest(user, request) {
                var index = user.latestRequests.indexOf(request);
                if (index > -1) {
                    user.latestRequests.splice(index, 1);
                }

                glimpse.emit('shell.request.user.entry.changed', _users);
            }

            return function(user, rawRequest) {
                if (rawRequest) {
                    var request = {
                            id: rawRequest.id,
                            uri: rawRequest.uri
                        };

                    user.latestRequests.unshift(request);

                    setTimeout(function() { removeRequest(user, request); }, 5000);
                }
            };
        })(),
        manageOnline = (function() {
            function setOffline(user) {
                user.online = false;

                glimpse.emit('shell.request.user.entry.changed', _users);
            }

            return function(user, rawRequest) {
                user.lastActive = rawRequest.dateTime;
                user.online = true;

                if (user.onlineCallback) {
                    clearTimeout(user.onlineCallback);
                }

                user.onlineCallback = setTimeout(function() { setOffline(user); }, 12000);
            };
        })();

    function dataFound(payload) {
        // TODO: This needs to be cleaned up bit messy atm but will do
        var rawRequests = payload.newRequests;
        for (var i = rawRequests.length - 1; i >= 0; i--) {
            var rawRequest = rawRequests[i],
                rawUser = rawRequest.user,
                user = _users[rawUser.id];

            if (user === undefined) {
                user = {
                        details: rawUser,
                        latestRequests: []
                    };

                _users[rawUser.id] = user;
            }

            manageRequest(user, rawRequest);
            manageOnline(user, rawRequest);
        }

        glimpse.emit('shell.request.user.entry.changed', _users);
    }

    // External data coming in
    glimpse.on('data.user.entry.found', dataFound);
})();

/*
// TODO: Need to see if this is needed
module.exports = {
    getAll: function() {
        return _users;
    }
};
*/
