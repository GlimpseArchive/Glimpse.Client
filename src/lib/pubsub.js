var postal = require('postal.js');

module.exports = {
    on: function() {
        var options = {};
        if (arguments.length > 0) {
            if (arguments.length > 1) {
                options.topic = arguments[0];
                options.callback = arguments[1];
            } else {
                options = arguments[0];
            }
        }
        return postal.subscribe(options);
    },
    emit: function() {
        var envelope = {};
        if (arguments.length > 0) {
            if (arguments.length > 1) {
                envelope.topic = arguments[0];
                envelope.data = arguments[1];
            } else {
                envelope = arguments[0];
            }
        }
        return postal.publish(envelope);
    },
    off: function() {
        var envelope = {};
        if (arguments.length > 0) {
            if (typeof arguments[0] === 'string') {
                envelope.topic = arguments[0];
            } else {
                envelope = arguments[0];
            }
        }
        return postal.unsubscribe(envelope);
    }
};
