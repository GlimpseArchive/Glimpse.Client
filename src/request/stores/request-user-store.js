var glimpse = require('glimpse'),
    _users = [];

(function() {
    function dataFound(payload) {
        _users = payload.allUsers;

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
    _sessions = {};

function addSession(rawSession) {
    var session = _sessions[rawSession.id];
    if (!session) {
        session = {};
        session.id = rawSession.id;
        session.latestRequests = [];

        _sessions[session.id] = session;
    }

    session.title = rawSession.title;
    session.url = rawSession.url;
    session.online = rawSession.online;
    session.last = rawSession.last;

    addSessionRequest(rawSession, session);

    return session;
}

function addSessionRequest(rawSession, session) {
    var rawRequest = rawSession.request;
    if (rawRequest) {
        var request = {};
        request.id = rawRequest.id;
        request.url = rawRequest.url;

        session.latestRequests.unshift(request);

        setTimeout(function() { removeSessionRequest(session, request); }, 5000);
    }
}

function removeSessionRequest(session, request) {
    var index = session.latestRequests.indexOf(request);
    if (index > -1) {
        session.latestRequests.splice(index, 1);
    }

    notifyDataUpdate(session);
}

function handleDataUpdate(rawSession) {
    var session = addSession(rawSession);

    notifyDataUpdate(session);
}

function notifyDataUpdate(session) {
    glimpse.emit('shell.request.session.changed', session);
}

glimpse.on('data.request.session.update', handleDataUpdate);

module.exports = {
    getAll: function() {
        return _sessions;
    }
};
*/
