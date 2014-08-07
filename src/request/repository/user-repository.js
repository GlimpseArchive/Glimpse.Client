require('./user-store-manage');
require('./user-repository-internal');

var glimpse = require('glimpse'),
    localRepository = require('./user-repository-local');

module.exports = {
    triggerGetLastestEntry: function() {
        localRepository.triggerGetLastestEntry();
    }
};
