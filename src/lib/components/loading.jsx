'use strict';

var React = require('react');

var messages = [
    'Loading...',
    'Sorry won\'t be much longer...',
    'Wow... we are taking a bit longer than usual...',
    'Oops, looks like an error occured :|'
];

module.exports = React.createClass({
    getInitialState: function () {
        return { next: 0 };
    },
    render: function () {
        var text = messages[this.state.next];

        return <span>{text}</span>;
    },
    componentDidMount: function () {
        this._update();
    },
    _update: function () {
        var that = this,
            next = that.state.next;
        setTimeout(function () {
            if (that.isMounted() && ++next < messages.length) {
                that.setState({ next: next });
                that._update();
            }
        }, 1000 /*3000*/);
    }
});
