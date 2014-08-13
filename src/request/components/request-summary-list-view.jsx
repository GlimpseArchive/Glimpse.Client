var React = require('react'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    SummaryItem = require('./request-summary-list-item-view.jsx');

module.exports = React.createClass({
    render: function() {
        var entries = this.props.allSummaries.map(function(summary, i) {
                return <SummaryItem key={summary.id} summary={summary} />;
            }),
            message = (entries.length === 0) ? <em>No found entries.</em> : '';

        return (
            <div className="request-summary-list-holder">
                <ReactCSSTransitionGroup component={React.DOM.div} transitionName="request-summary-item-holder">
                    {entries}
                </ReactCSSTransitionGroup>
                {message}
            </div>
        );
    }
});
