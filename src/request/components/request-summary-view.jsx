require('../stores/request-summary-store.js');

var glimpse = require('glimpse'),
    React = require('react'),
    SummaryList = require('./request-summary-list-view.jsx');

function getState(allSummaries) {
    return {
        allSummaries: allSummaries || []
    };
}

module.exports = React.createClass({
    getInitialState: function() {
        return getState();
    },
    // TODO: Get rid of this boiler plate code via a mixin
    componentDidMount: function() {
        this._summaryChangedOn = glimpse.on('shell.request.summary.changed', this._summaryChanged);
    },
    componentWillUnmount: function() {
        glimpse.off(this._summaryChangedOn);
    },
    render: function() {
        return (
            <div className="request-summary-holder">
                <h2>Request</h2>
                <SummaryList allSummaries={this.state.allSummaries} />
            </div>
        );
    },
    _summaryChanged: function(allSummaries) {
        this.setState(getState(allSummaries));
    }
});
