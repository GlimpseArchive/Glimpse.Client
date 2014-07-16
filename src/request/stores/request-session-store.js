var glimpse = require('glimpse'),
    _sessions = {};

function dataUpdate(session) {
    _sessions[session.id] = session;

    glimpse.emit('shell.request.session.changed', session);
}

// External data coming in
glimpse.on('data.request.session.update', dataUpdate);

module.exports = {
    getAll: function() {
        return _sessions;
    }
};
