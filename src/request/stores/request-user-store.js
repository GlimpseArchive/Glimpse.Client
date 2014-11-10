'use strict';

var glimpse = require('glimpse');
var _users = {};
var _userSelected = null;

function notifyUsersChanged() {
    glimpse.emit('shell.request.user.detail.changed', {
            allUsers: _users,
            selectedUserId: _userSelected
        });
}

// Clear User
(function () {
    function clearUser() {
        _users[_userSelected].selected = false;
        _userSelected = null;

        notifyUsersChanged();
    }

    glimpse.on('shell.request.user.clear.selected', clearUser);
})();

// Select User
(function () {
    function clear(oldUserId, users) {
            if (oldUserId) {
                var oldUser = users[oldUserId];
                if (oldUser) {
                    oldUser.selected = false;
                }
            }
        }
    function select(userId, users) {
        var user = users[userId];
        if (user) {
            user.selected = true;
        }
    }

    function selectUser(payload) {
        var userId = payload.userId;
        var oldUserId = _userSelected;
        var users = _users;

        clear(oldUserId, users);
        select(userId, users);

        _userSelected = userId;

        notifyUsersChanged();
    }

    glimpse.on('shell.request.user.selected', selectUser);
})();

// Found User
(function () {
    // TODO: Need to update to make sure it can work with out of order/old
    //       requests coming in.
    // TODO: Timeouts should probably come from config
    // TODO: Should probably be abstracted out into its own module
    var manageRequest = (function () {
        function removeRequest(user, request) {
            var index = user.latestRequests.indexOf(request);
            if (index > -1) {
                user.latestRequests.splice(index, 1);
            }

            notifyUsersChanged();
        }

        return function (user, rawRequest) {
            if (rawRequest) {
                var request = {
                        id: rawRequest.id,
                        uri: rawRequest.uri
                    };

                user.latestRequests.unshift(request);

                setTimeout(function () { removeRequest(user, request); }, 5000);
            }
        };
    })();
    var manageOnline = (function () {
        function setOffline(user) {
            user.online = false;

            notifyUsersChanged();
        }

        return function (user, rawRequest) {
            user.lastActive = rawRequest.dateTime;
            user.online = true;

            if (user.onlineCallback) {
                clearTimeout(user.onlineCallback);
            }

            user.onlineCallback = setTimeout(function () { setOffline(user); }, 12000);
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

    function foundUser(payload) {
        // TODO: This needs to be cleaned up bit messy atm but will do
        var rawRequests = payload.newRequests;
        for (var i = rawRequests.length - 1; i >= 0; i--) {
            var rawRequest = rawRequests[i];
            var rawUser = rawRequest.user;
            var user = _users[rawUser.id];

            if (user === undefined) {
                user = createUser(rawUser);
                _users[rawUser.id] = user;
            }

            manageRequest(user, rawRequest);
            manageOnline(user, rawRequest);
        }

        notifyUsersChanged();
    }

    // External data coming in
    glimpse.on('data.user.detail.found', foundUser);
})();
