var React = require('react'),
    glimpse = require('glimpse');

module.exports = React.createClass({
    _applicationAdded: function() {
        this.forceUpdate();
    },
    componentDidMount: function() {
        this._applicationAddedOn = glimpse.on('shell.application.added', this._applicationAdded);
    },
    componentWillUnmount: function() {
        glimpse.off(this._applicationAddedOn);
    },
    render: function() {
        return (
            <div className="application-holder">
                {this.props.applications}
            </div>
        );
    }
});
