'use strict';

require('./shell-view.scss');

var React = require('react');
var glimpse = require('glimpse');
var EmitterMixin = require('lib/components/emitter-mixin');

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    componentDidMount: function () {
        this.addListener('shell.application.added', this._applicationAdded);
    },
    render: function () {
        return (
            <div className="application-holder">
                {this.props.applications.map(function (application) {
                    return <div key={application.key}>{application.component()}</div>;
                })}
            </div>
        );
    },
    _applicationAdded: function () {
        this.forceUpdate();
    }
});
