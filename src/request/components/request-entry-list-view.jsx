var React = require('react'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    EntryItem = require('./request-entry-item-view.jsx');

module.exports = React.createClass({
    render: function() {
        var entries = this.props.allEntries.map(function(entry, i) {
                return <EntryItem key={entry.id} entry={entry} />;
            }),
            message = (entries.length === 0) ? <em>No found entries.</em> : '';

        return (
            <div className="request-entry-list-holder">
                <ReactCSSTransitionGroup component={React.DOM.div} transitionName="request-entry-item-holder">
                    {entries}
                </ReactCSSTransitionGroup>
                {message}
            </div>
        );
    }
});
