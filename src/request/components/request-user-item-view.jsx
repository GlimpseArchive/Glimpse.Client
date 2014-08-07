var React = require('react');

module.exports = React.createClass({
    render: function() {
        var user = this.props.user;

        return (
            <div className="request-user-item-holder" onClick={this._onClick}>
                <table className="table table-bordered">
                    <tr>
                        <td width="50">
                            <img src={user.avatarUrl} width="40" />
                        </td>
                        <td>{user.name}</td>
                    </tr>
                </table>
            </div>
        );
    },
    _onClick: function() {
        console.log(' - ', this.props.user.id);
    }
});




// TODO: temp code only being used to debug atm
/*

<tr>
    <td>{user.last}</td>
</tr>

className={containerClass}

    containerClass = 'table table-bordered' + (user.online ? ' user-online' : ' user-offline')

var requests = user.latestRequests.map(function(request, i) {
    return <div key={request.id}>{request.url}</div>;
});

<tr>
    <td colSpan="2">{requests}</td>
</tr>
*/
// TODO: temp code only being used to debug atm
