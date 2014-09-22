require('../stores/request-detail-store.js');

var glimpse = require('glimpse'),
    requestTabController = require('../request-tab.js'),
    React = require('react'),
    cx = React.addons.classSet,
    EmitterMixin = require('lib/components/emitter-mixin.jsx'),
    Summary = require('./request-detail-summary-view.jsx'),
    Content = require('./request-detail-content-view.jsx'),
    Loading = require('lib/components/loading.jsx');

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    componentDidMount: function() {
        this.addListener('shell.request.detail.changed', this._requestDetailChanged);
    },
    render: function() {
        var model = this.state;
        if (model && model.selectedId) {
            var detailView = '';
            if (model.request)
                detailView = (
                        <div>
                            <Summary summary={model.request} />
                            <Content summary={model.request} />
                        </div>
                    );
            else {
                detailView = <Loading />;
            }

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
