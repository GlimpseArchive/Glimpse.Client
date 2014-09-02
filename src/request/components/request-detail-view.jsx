require('../stores/request-detail-store.js');

var glimpse = require('glimpse'),
    React = require('react'),
    SummaryDisplay = require('./request-summary-display-view.jsx'),
    cx = React.addons.classSet,
    EmitterMixin = require('../../lib/components/emitter-mixin.jsx');

function getState(state) {
    return {
            request: state ? state.request : null
        };
}

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    componentDidMount: function() {
        this.addListener('shell.request.detail.changed', this._requestDetailChanged);
    },
    getInitialState: function() {
        return getState();
    },
    render: function() {
        var request = this.state.request;

        if (request) {
            return (
                <div className="col-md-10 col-md-offset-2 request-detail-holder-outer">
                    <div className="request-detail-holder">
                        <h2>Detail <input type="button" value="Close" onClick={this.onClose} /></h2>
                        <SummaryDisplay summary={request} />
                    </div>
                </div>
            );
        }

        // TODO: Need to work on doing this better
        return <div></div>;
    },
    onClose: function() {
        // TODO: Should pass through the id of the request that is being closed
        glimpse.emit('shell.request.detail.closed', {});
    },
    _requestDetailChanged: function(state) {
        this.setState(getState({ request: state }));
    }
});
