var glimpse = require('glimpse'),
    Request = require('./components/request-view.jsx');

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


// TODO: Need to come up with a better self registration process
require('./components/request-detail-panel-execution.jsx');
require('./components/request-detail-panel-trace.jsx');

// TODO: Need to come up with a better self registration process
(function() {
    var shellController = require('shell/shell.js');

    shellController.registerApplication(Request());
})();
