var glimpse = require('glimpse');

(function() {
    var requestRepository = require('./repository/request-repository.js'),
        userRepository = require('./repository/user-repository.js');

    function initialize() {
        if (!FAKE_SERVER) {
            requestRepository.triggerGetLastestSummaries();
            userRepository.triggerGetLastestUsers();
        }

        glimpse.emit('shell.request.ready', {});
    }

    glimpse.on('shell.ready', initialize);
})();
