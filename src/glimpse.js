var pubsub = require('./lib/pubsub.js');

module.exports = {
    on: pubsub.on,
    off: pubsub.off,
    emit: pubsub.emit
};
