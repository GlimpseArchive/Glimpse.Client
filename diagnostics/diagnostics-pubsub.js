var postal = require('postal.js');
var DiagnosticsWireTap = require('postal.diagnostics');

new DiagnosticsWireTap({
    serialize: function(x) {
        return x;
    },
    writer: function(x, position) {
        var space = '';
        for (var i = 0; i < position - 1; i++) {
            space += '    ';
        }

        //console.log(space + x.topic, x.data);
        console.log('[pubsub] ' + space + x.topic);
    }
});
