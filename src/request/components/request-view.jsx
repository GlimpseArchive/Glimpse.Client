var React = require('react'),
    User = require('./request-user-view.jsx'),
    Filter = require('./request-filter-view.jsx'),
    Summary = require('./request-summary-view.jsx'),
    Detail = require('./request-detail-view.jsx'),
    EmitterMixin = require('../../lib/components/emitter-mixin.jsx');

function getState(state) {
    return {
            selectedRequest: state ? state.selectedRequest : null
        };
}

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    componentDidMount: function() {
        // TODO: Need to finish this
        this.addListener('shell.request.detail.changed', this._requestDetailChanged);
    },
    getInitialState: function() {
        return getState();
    },
    render: function() {
        var detail = '';
        // TODO: Not sure where this should go yet... Seems too high to place this
        if (this.state.selectedRequest) {
            detail = (
                <div className="col-md-10 col-md-offset-2 request-detail-holder-outer">
                    <Detail />
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row request-holder-outer">
                    <div className="col-md-2 request-user-holder-outer">
                        <User />
                    </div>
                    <div className="col-md-8 request-summary-holder-outer">
                        <Summary />
                    </div>
                    <div className="col-md-2 request-filter-holder-outer">
                        <Filter />
                    </div>
                    {detail}
                </div>
            </div>
        );
    },
    _requestDetailChanged: function(state) {
        this.setState(getState({ selectedRequest: state }));
    }
});
