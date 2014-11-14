'use strict';

if (DIAGNOSTICS) {
    require('diagnostics').enable();
}
if (FAKE_SERVER) {
    require('fake');
}

var shell = require('shell/shell');

// TODO: Need to come up with a better self registration process
require('request/request');

shell.initialize();
