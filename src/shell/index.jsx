require('./style/index.css');

var React = require('react'),
    Application = require('./components/application.js');

React.renderComponent(<Application />, document.getElementById('application-holder'));
