var glimpse = require('glimpse'),
    _requests = [];

(function() {
    function dataFound(payload) {
        // TODO: Really bad hack to get things going atm
        _requests = payload.allRequests.concat([]).reverse();

        glimpse.emit('shell.request.summary.changed', _requests);
    }

    // External data coming in
    glimpse.on('data.request.summary.found', dataFound);
})();

/*
// TODO: Need to see if this is needed
module.exports = {
    getAllFor: function(sessionId) {
        console.log(sessionId);
        return _requests;
    }
};
*/
