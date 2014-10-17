var glimpse = require('glimpse'),
    React = require('react'),
    Shell = require('./components/shell-view.jsx'),
    applications = [];

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
