var React = require('react'),
    EntryItem = require('./request-entry-item-view.jsx');

module.exports = React.createClass({
    render: function() {
        var allEntries = this.props.allEntries;
        var entries = [];
        for (var key in allEntries) {
            var entry = allEntries[key];
            entries.push(<EntryItem key={entry.id} entry={entry} />);
        }
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
