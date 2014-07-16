'use strict';

var glimpse = require('glimpse'),
    shell = require('shell/shell.js'),
    request = require('request/request.js');

shell.initialize();

console.log(request);

// TODO: Remove, just testing currently
setTimeout(function() {
    glimpse.emit('data.request.session.update', { id: 'Anthony', count: 12, last: '23 sec ago ' });
}, 1000);

setTimeout(function() {
    glimpse.emit('data.request.session.update', { id: 'Anthony', count: 23, last: '1 sec ago ' });
}, 3000);

setTimeout(function() {
    glimpse.emit('data.request.session.update', { id: 'Nik', count: 13, last: '3 sec ago ' });
}, 6000);
