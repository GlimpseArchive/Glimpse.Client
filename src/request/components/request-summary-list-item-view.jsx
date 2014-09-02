var glimpse = require('glimpse'),
    React = require('react'),
    SummaryDisplay = require('./request-summary-display-view.jsx'),
    cx = React.addons.classSet;

module.exports = React.createClass({
    render: function() {
        var summary = this.props.summary,
            containerClass = cx({
                'request-summary-item-holder': true,
                'request-summary-shell-selected': summary._selected
            });

        return (
            <div className={containerClass} onClick={this.onSelect}>
                <SummaryDisplay summary={summary} />
            </div>
        );
    },
    onSelect: function() {
        glimpse.emit('shell.request.summary.selected', { requestId: this.props.summary.id });
    }
});
