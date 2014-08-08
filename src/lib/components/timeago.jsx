var React = require('react'),
    SetIntervalMixin = require('./set-interval-mixin.jsx'),
    moment = require('moment');

module.exports = React.createClass({
    mixins: [ SetIntervalMixin ],
    render: function() {
        return <span>{moment(this.props.time).fromNow()}</span>;
    },
    componentDidMount: function() {
        var interval = this.props.time || 60000;
        
        this.setInterval(this.forceUpdate.bind(this), interval);
    }
});
