'use strict';

require('../stores/request-summary-store');

var glimpse = require('glimpse');
var React = require('react');
var SummaryList = require('./request-summary-list-view');
var EmitterMixin = require('lib/components/emitter-mixin');

function getState(allSummaries) {
    return {
        allSummaries: allSummaries || []
    };
}

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    getInitialState: function () {
        return getState();
    },
    componentDidMount: function () {
        this.addListener('shell.request.summary.changed', this._summaryChanged);
    },
    render: function () {
        return (
            <div className="request-summary-holder">
                <h2>Request</h2>
                <SummaryList allSummaries={this.state.allSummaries} />
            </div>
        );
    },
    _summaryChanged: function (allSummaries) {
        this.setState(getState(allSummaries));
    }
});
