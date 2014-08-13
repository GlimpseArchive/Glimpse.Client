require('./user-store-manage');
require('./user-repository-internal');

var glimpse = require('glimpse'),
    localRepository = require('./user-repository-local');

module.exports = {
    triggerGetLastestUsers: function() {
        localRepository.triggerGetLastestUsers();
    }
};
