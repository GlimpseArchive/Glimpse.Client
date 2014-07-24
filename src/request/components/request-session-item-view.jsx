var React = require('react');

module.exports = React.createClass({
    render: function() {
        var session = this.props.session;
        return (
            <div className="request-session-item-holder" onClick={this._onClick}>
                <table className="table table-bordered">
                    <tr>
                        <td rowSpan="2">
                            <img src={session.url} width="40" />
                        </td>
                        <td>{session.title} ({session.count})</td>
                    </tr>
                    <tr>
                        <td>{session.last}</td>
                    </tr>
                </table>
            </div>
        );
    },
    _onClick: function() {
        console.log(' - ', this.props.session.id);
    }
});
