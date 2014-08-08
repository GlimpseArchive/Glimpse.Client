var glimpse = require('glimpse'),
    _users = {};

(function() {
    function addRequest(user, rawRequest) {
        if (rawRequest) {
            var request = {
                    id: rawRequest.id,
                    uri: rawRequest.uri
                };

            user.latestRequests.unshift(request);

            setTimeout(function() { removeRequest(user, request); }, 5000);
        }
    }

    function removeRequest(user, request) {
        var index = user.latestRequests.indexOf(request);
        if (index > -1) {
            user.latestRequests.splice(index, 1);
        }

        glimpse.emit('shell.request.user.entry.changed', _users);
    }

    function dataFound(payload) {
        // TODO: This needs to be cleaned up bit messy atm but will do
        var rawRequests = payload.newRequests;
        for (var i = 0; i < rawRequests.length; i++) {
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

            addRequest(user, rawRequest);
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













/*
var glimpse = require('glimpse'),
    _users = {};

function addSession(rawSession) {
    var user = _users[rawSession.id];
    if (!user) {
        user = {};
        user.id = rawSession.id;
        user.latestRequests = [];

        _users[user.id] = user;
    }

    user.title = rawSession.title;
    user.url = rawSession.url;
    user.online = rawSession.online;
    user.last = rawSession.last;

    addSessionRequest(rawSession, user);

    return user;
}

function addSessionRequest(rawSession, user) {
    var rawRequest = rawSession.request;
    if (rawRequest) {
        var request = {};
        request.id = rawRequest.id;
        request.url = rawRequest.url;

        user.latestRequests.unshift(request);

        setTimeout(function() { removeSessionRequest(user, request); }, 5000);
    }
}

function removeSessionRequest(user, request) {
    var index = user.latestRequests.indexOf(request);
    if (index > -1) {
        user.latestRequests.splice(index, 1);
    }

    notifyDataUpdate(user);
}

function handleDataUpdate(rawSession) {
    var user = addSession(rawSession);

    notifyDataUpdate(user);
}

function notifyDataUpdate(user) {
    glimpse.emit('shell.request.user.changed', user);
}

glimpse.on('data.request.user.update', handleDataUpdate);

module.exports = {
    getAll: function() {
        return _users;
    }
};
*/
