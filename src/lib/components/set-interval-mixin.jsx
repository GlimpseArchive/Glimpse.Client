'use strict';

module.exports = {
    componentWillMount: function () {
        this.intervals = [];
    },
    setInterval: function (fn, ms) {
        this.intervals.push(setInterval(fn, ms));
    },
    componentWillUnmount: function () {
        this.intervals.forEach(clearInterval);
    }
};
