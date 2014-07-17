var React = require('react');

module.exports = React.createClass({
    render: function() {
        var session = this.props.session;
        return (
            <div className="request-session-item-holder">
                <table className="table table-bordered">
                    <tr>
                        <td rowSpan="2">
                            <img src={session.url} width="40" />
                        </td>
                        <td>{session.id} ({session.count})</td>
                    </tr>
                    <tr>
                        <td>{session.last}</td>
                    </tr>
                </table>
            </div>
        );
    }
});
