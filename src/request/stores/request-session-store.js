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
}

function dataUpdate(rawSession) {
    var session = addSession(rawSession);

    glimpse.emit('shell.request.session.changed', session);
}

glimpse.on('data.request.session.update', dataUpdate);

module.exports = {
    getAll: function() {
        return _sessions;
    }
};
