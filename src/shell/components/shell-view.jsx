var React = require('react'),
    glimpse = require('glimpse'),
    EmitterMixin = require('../../lib/components/emitter-mixin.jsx');

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    componentDidMount: function() {
        this.addListener('shell.application.added', this._applicationAdded);
    },
    render: function() {
        return (
            <div className="application-holder">
                {this.props.applications}
            </div>
        );
    },
    _applicationAdded: function() {
        this.forceUpdate();
    }
});
