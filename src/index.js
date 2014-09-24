'use strict';

if (DIAGNOSTICS) {
    require('diagnostics');
}
if (FAKE_SERVER) {
    require('fake');
}

var shell = require('shell/shell.js');

// TODO: Need to come up with a better self registration process
require('request/request.js');

shell.initialize();
