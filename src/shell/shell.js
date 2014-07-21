require('./style/shell.scss');

var React = require('react'),
    Shell = require('./components/shell-view.jsx'),
    glimpse = require('glimpse'),

    applications = [];

module.exports = {
    registerApplication: function(application) {
        applications.push(application);

        glimpse.emit('shell.application.added', { application: application });
    },
    initialize: function() {
        React.renderComponent(Shell({ applications: applications }),
            document.getElementById('application-holder'));
    }
};
