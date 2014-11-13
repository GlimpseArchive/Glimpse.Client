'use strict';

var glimpse = require('glimpse');
var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var SummaryItem = require('./request-summary-list-item-view');

module.exports = React.createClass({
    render: function () {
        var allSummaries = this.props.allSummaries;

        return (
            <div className="request-summary-list-holder">
                <ReactCSSTransitionGroup component={React.DOM.div} transitionName="request-summary-item-holder">
                    {allSummaries.map(function (summary) {
                        return <SummaryItem key={summary.id} summary={summary} />;
                    })}
                </ReactCSSTransitionGroup>
                {glimpse.util.isEmpty(allSummaries) ?
                    <em>No found entries.</em> :
                    null
                }
            </div>
        );
    }
});
