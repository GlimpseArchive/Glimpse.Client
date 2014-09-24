var React = require('react');

module.exports = React.createClass({
    render: function() {
        var data = this.props.data;

        return <div>{this.props.key}... WE ARE Trace!!!</div>;
    }
});


// TODO: Need to come up with a better self registration process
(function() {
    var requestTabController = require('../request-tab.js');

    requestTabController.registerTab({
        key: 'core_trace',
        component: module.exports
    });
})()
