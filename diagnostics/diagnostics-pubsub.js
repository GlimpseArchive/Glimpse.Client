'use strict';

var postal = require('postal');
var DiagnosticsWireTap = require('postal.diagnostics');

var wiretap = new DiagnosticsWireTap({
    active: false,
    serialize: function (x) {
        return x;
    },
    writer: function (x, position) {
        var space = '';
        for (var i = 0; i < position - 1; i++) {
            space += '    ';
        }

        // console.log(space + x.topic, x.data);
        console.log('[pubsub] ' + space + x.topic);
    }
});

exports.enable = function () {
  wiretap.active = true;
};
exports.disable = function () {
  wiretap.active = false;
};
