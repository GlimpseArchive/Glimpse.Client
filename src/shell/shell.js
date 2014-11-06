'use strict';

var glimpse = require('glimpse');
var React = require('react');
var Shell = require('./components/shell-view.jsx');
var applications = [];

module.exports = {
    registerApplication: function(application) {
        applications.push(application);

        glimpse.emit('shell.application.added', { application: application });
    },
    initialize: function() {
        React.renderComponent(Shell({ applications: applications }),
            document.getElementById('application-holder'));

        glimpse.emit('shell.ready', {});
    }
};


// TODO: Need to come up with a better self registration process
require('request/components/request-view.jsx');
