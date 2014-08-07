var React = require('react'),
    EntryItem = require('./request-entry-item-view.jsx');

module.exports = React.createClass({
    render: function() {
        var entries = this.props.allEntries.map(function(entry, i) {
                return <EntryItem key={entry.id} entry={entry} />;
            });
        if (entries.length == 0) {
            entries = <em>No found entries.</em>;
        }

        return (
            <div className="request-entry-list-holder">
                {entries}
            </div>
        );
    }
});
