'use strict';

require('fake'); // TODO: Don't want to always include this one

var shell = require('shell/shell.js'),
    request = require('request/request.js');

shell.initialize();

console.log(request);
