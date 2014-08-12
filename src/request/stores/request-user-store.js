var glimpse = require('glimpse'),
    _users = {},
    _userSelected = null;

function usersChanged() {
    glimpse.emit('shell.request.user.entry.changed', {
            allUsers: _users,
            selectedUserId: _userSelected
        });
}

(function() {
    function userClear() {
        _users[_userSelected].selected = false;
        _userSelected = null;

        usersChanged();
    }

    glimpse.on('shell.request.user.clear.selected', userClear);
})();

(function() {
    function userSwitch(payload) {
        var userId = payload.userId,
            oldUserId = _userSelected,
            user = _users[userId];

        if (oldUserId) {
            var oldUser = _users[oldUserId];
            if (oldUser) {
                oldUser.selected = false;
            }
        }
        if (user) {
            user.selected = true;
        }

        _userSelected = userId;

        usersChanged();
    }

    glimpse.on('shell.request.user.selected', userSwitch);
})();

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

                usersChanged();
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

                usersChanged();
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

    function createUser(rawUser) {
        return {
                details: rawUser,
                latestRequests: [],
                lastActive: null,
                online: true,
                selected: false
            };
    }

    function dataFound(payload) {
        // TODO: This needs to be cleaned up bit messy atm but will do
        var rawRequests = payload.newRequests;
        for (var i = rawRequests.length - 1; i >= 0; i--) {
            var rawRequest = rawRequests[i],
                rawUser = rawRequest.user,
                user = _users[rawUser.id];

            if (user === undefined) {
                user = createUser(rawUser);
                _users[rawUser.id] = user;
            }

            manageRequest(user, rawRequest);
            manageOnline(user, rawRequest);
        }

        usersChanged();
    }

    // External data coming in
    glimpse.on('data.user.entry.found', dataFound);
})();
