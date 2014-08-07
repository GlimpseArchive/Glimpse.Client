'use strict';

var requestRepository = require('./request/repository/request-repository.js'),
    sessionRepository = require('./request/repository/user-repository.js');

// TODO: Don't want to always include these
require('diagnostics');
require('fake');

var shell = require('shell/shell.js');

require('request/request.js');

shell.initialize();
