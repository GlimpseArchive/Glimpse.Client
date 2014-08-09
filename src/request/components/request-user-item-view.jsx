var glimpse = require('glimpse'),
    React = require('react'),
    Timeago = require('../../lib/components/timeago.jsx'),
    cx = React.addons.classSet;

module.exports = React.createClass({
    render: function() {
        var user = this.props.user,
            containerClass = cx({
                'table table-bordered user-status': true,
                'user-status-online': user.online,
                'user-shell-selected': user.selected
            }),
            requests = user.latestRequests.map(function(request, i) {
                return <div key={request.id}>{request.uri}</div>;
            });

        return (
            <div className="request-user-item-holder" onClick={this._onClick}>
                <table className={containerClass}>
                    <tr>
                        <td width="50" rowSpan="2">
                            <img src={user.details.avatarUrl} width="40" />
                        </td>
                        <td>{user.details.name}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"><Timeago time={user.lastActive} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2">{requests}</td>
                    </tr>
                </table>
            </div>
        );
    },
    _onClick: function() {
        glimpse.emit('shell.request.user.selected', { userId: this.props.user.details.id });
    }
});




// TODO: temp code only being used to debug atm
/*



className={containerClass}

    containerClass = 'table table-bordered' + (user.online ? ' user-online' : ' user-offline')



<tr>
    <td colSpan="2">{requests}</td>
</tr>
*/
// TODO: temp code only being used to debug atm
