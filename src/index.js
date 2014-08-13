'use strict';

var requestRepository = require('./request/repository/request-repository.js'),
    sessionRepository = require('./request/repository/user-repository.js');

if (DIAGNOSTICS) {
    require('diagnostics');
}
if (FAKE_SERVER) {
    require('fake');
}

var shell = require('shell/shell.js');

require('request/request.js');

shell.initialize();
