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
                            {entry.url} &nbsp; {entry.method} &nbsp; {entry.status}
                        </td>
                    </tr>
                    <tr>
                        <td>{entry.networkTime}ms</td>
                        <td>{entry.serverTime}ms</td>
                        <td>{entry.clientTime}ms</td>
                        <td>{entry.controller}.{entry.action}(...)</td>
                        <td>{entry.actionTime}ms</td>
                        <td>{entry.viewTime}ms</td>
                        <td>{entry.queryTime}ms / {entry.queryCount}</td>
                    </tr>
                </table>
            </div>
        );
    }
});
