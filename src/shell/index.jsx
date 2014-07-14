require('./style/index.css');

var React = require('react'),
    Shell = require('./components/shell');

React.renderComponent(<Shell />, document.getElementById('shell-holder'));
