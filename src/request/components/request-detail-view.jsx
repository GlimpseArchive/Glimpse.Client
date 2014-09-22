require('../stores/request-detail-store.js');

var glimpse = require('glimpse'),
    requestTabController = require('../request-tab.js'),
    React = require('react'),
    Summary = require('./request-detail-summary-view.jsx'),
    cx = React.addons.classSet,
    EmitterMixin = require('lib/components/emitter-mixin.jsx'),
    Loading = require('lib/components/loading.jsx');

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    componentDidMount: function() {
        this.addListener('shell.request.detail.changed', this._requestDetailChanged);
    },
    render: function() {
        var model = this.state;
        if (model && model.selectedId) {
            var detailView = model.request ? <Summary summary={model.request} /> : <Loading />;

            return (
                <div className="col-md-10 col-md-offset-2 request-detail-holder-outer">
                    <div className="request-detail-holder">
                        <h2>Detail <input type="button" value="Close" onClick={this.onClose} /></h2>
                        {detailView}
                    </div>
                </div>
            );
        }

        return <div></div>;
    },
    onClose: function() {
        // TODO: Should pass through the id of the request that is being closed
        glimpse.emit('shell.request.detail.closed', {});
    },
    _requestDetailChanged: function(state) {
        this.setState(state);
    }
});
