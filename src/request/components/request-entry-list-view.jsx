var React = require('react'),
    EntryItem = require('./request-entry-item-view.js');

module.exports = React.createClass({
    render: function() {
        var allEntries = this.props.allEntries;
        var entries = [];
        for (var key in allEntries) {
          entries.push(<EntryItem key={key} entry={allEntries[key]} />);
        }
        if (entries.length == 0) {
            entries = <em>No found entries.</em>;
        }

        return (
            <ul className="request-entry-list-holder">
                {entries}
            </ul>
        );
    }
});
