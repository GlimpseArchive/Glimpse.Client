'use strict';

if (DIAGNOSTICS) {
    require('diagnostics');
}
if (FAKE_SERVER) {
    require('fake');
}

var shell = require('shell/shell.js');

require('request/request.js');

shell.initialize();
