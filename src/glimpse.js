'use strict';

var pubsub = require('./lib/pubsub.js'),
var util = require('./lib/util.js');

module.exports = {
    on: pubsub.on,
    off: pubsub.off,
    emit: pubsub.emit,
    util: util
};
