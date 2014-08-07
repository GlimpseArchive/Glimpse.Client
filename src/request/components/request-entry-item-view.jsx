var React = require('react');

module.exports = React.createClass({
    render: function() {
        var entry = this.props.entry;
        return (
            <div className="request-entry-item-holder">
                <table className="table table-bordered">
                    <tr>
                        <td rowSpan="2">{entry.duration}ms</td>
                        <td colSpan="7">
                            {entry.uri} &nbsp; {entry.method} &nbsp; {entry.statusCode} ({entry.statusText}) - {entry.contentType}
                        </td>
                    </tr>
                    <tr>
                        <td>{entry.summary.networkTime}ms</td>
                        <td>{entry.summary.serverTime}ms</td>
                        <td>{entry.summary.clientTime}ms</td>
                        <td>{entry.summary.controller}.{entry.action}(...)</td>
                        <td>{entry.summary.actionTime}ms</td>
                        <td>{entry.summary.viewTime}ms</td>
                        <td>{entry.summary.queryTime}ms / {entry.summary.queryCount}</td>
                    </tr>
                </table>
            </div>
        );
    }
});
