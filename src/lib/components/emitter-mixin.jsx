'use strict';

var glimpse = require('glimpse');

module.exports = {
    addListener: function (event, listener) {
        if (!this.events) {
            this.events = {};
        }

        this.events[event] = glimpse.on(event, listener);
    },
    componentWillUnmount: function () {
        if (this.events) {
            for (var key in this.events) {
                glimpse.off(this.events[key]);
            }

            this.events = null;
        }
    }
};
