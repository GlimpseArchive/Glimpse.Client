'use strict';

var glimpse = require('glimpse');
var React = require('react');
var cx = React.addons.classSet;

module.exports = React.createClass({
    render: function() {
        var data = this.props.data;
        var containerClass = cx({
            'active': this.props.isActive
        });

        return <li className={containerClass} onClick={this._onClick}><a href="#">{data.title}</a></li>;
    },
    _onClick: function(payload) {
        glimpse.emit('shell.request.detail.focus.changed', { tab: this.props.key });
    }
});
