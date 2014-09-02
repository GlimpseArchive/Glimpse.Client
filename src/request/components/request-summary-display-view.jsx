var React = require('react'),
    Timeago = require('../../lib/components/timeago.jsx');

module.exports = React.createClass({
    render: function() {
        var summary = this.props.summary;

        return (
            <table className="table table-bordered">
                <tr>
                    <td width="90">{summary.duration}ms</td>
                    <td colSpan="6">
                        {summary.uri} &nbsp; {summary.method} &nbsp; {summary.statusCode} ({summary.statusText}) - {summary.contentType}
                    </td>
                    <td><Timeago time={summary.dateTime} /></td>
                </tr>
                <tr>
                    <td>{summary.user.name}</td>
                    <td>{summary.abstract.networkTime}ms</td>
                    <td>{summary.abstract.serverTime}ms</td>
                    <td>{summary.abstract.clientTime}ms</td>
                    <td>{summary.abstract.controller}.{summary.abstract.action}(...)</td>
                    <td>{summary.abstract.actionTime}ms</td>
                    <td>{summary.abstract.viewTime}ms</td>
                    <td>{summary.abstract.queryTime}ms / {summary.abstract.queryCount}</td>
                </tr>
            </table>
        );
    }
});
