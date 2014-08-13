var glimpse = require('glimpse'),
    React = require('react'),
    Timeago = require('../../lib/components/timeago.jsx');

module.exports = React.createClass({
    render: function() {
        var entry = this.props.entry;
        return (
            <div className="request-entry-item-holder" onClick={this.onSelect}>
                <table className="table table-bordered">
                    <tr>
                        <td width="90">{entry.duration}ms</td>
                        <td colSpan="6">
                            {entry.uri} &nbsp; {entry.method} &nbsp; {entry.statusCode} ({entry.statusText}) - {entry.contentType}
                        </td>
                        <td><Timeago time={entry.dateTime} /></td>
                    </tr>
                    <tr>
                        <td>{entry.user.name}</td>
                        <td>{entry.summary.networkTime}ms</td>
                        <td>{entry.summary.serverTime}ms</td>
                        <td>{entry.summary.clientTime}ms</td>
                        <td>{entry.summary.controller}.{entry.summary.action}(...)</td>
                        <td>{entry.summary.actionTime}ms</td>
                        <td>{entry.summary.viewTime}ms</td>
                        <td>{entry.summary.queryTime}ms / {entry.summary.queryCount}</td>
                    </tr>
                </table>
            </div>
        );
    },
    onSelect: function() {
        glimpse.emit('shell.request.detail.requested', { id: this.props.entry.id });
    }
});
