'use strict';

var postal = require('postal');

module.exports = {
    on: function (topic, callback) {
        if (typeof topic !== 'string') {
            throw new TypeError('Expected topic to be a string.');
        }
        if (typeof callback !== 'function') {
            throw new TypeError('Expected callback to be a function.');
        }
        return postal.subscribe({
            topic: topic,
            callback: callback
        });
    },
    emit: function (topic, data) {
        if (typeof topic !== 'string') {
            throw new TypeError('Expected topic to be a string.');
        }
        return postal.publish({
            topic: topic,
            data: data
        });
    },
    off: function (topic) {
        if (typeof topic !== 'string') {
            throw new TypeError('Expected topic to be a string.');
        }
        return postal.unsubscribe({topic: topic});
    }
};
