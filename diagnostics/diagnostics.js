'use strict';

var wiretap = require('./diagnostics-pubsub');

exports.enable = function () {
  wiretap.enable();
};
exports.disable = function () {
  wiretap.disable();
};
