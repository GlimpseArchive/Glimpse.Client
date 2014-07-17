var glimpse = require('glimpse'),
    _requests = [];

function dataUpdate(request) {
    _requests.unshift(request);

    glimpse.emit('shell.request.entry.changed', request);
}

// External data coming in
glimpse.on('data.request.entry.updated', dataUpdate);

module.exports = {
    getAllFor: function(sessionId) {
        console.log(sessionId);
        return _requests;
    }
};
