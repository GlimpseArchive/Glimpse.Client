'use strict';

var React = require('react');
var SetIntervalMixin = require('./set-interval-mixin');
var moment = require('moment');

module.exports = React.createClass({
    mixins: [ SetIntervalMixin ],
    render: function () {
        return <span title={moment(this.props.time).format('MMM Do YYYY, h:mm:ss a')}>{moment(this.props.time).fromNow()}</span>;
    },
    componentDidMount: function () {
        var interval = this.props.time || 60000;

        this.setInterval(this.forceUpdate.bind(this), interval);
    }
});
