var React = require('react'),
    UserItem = require('./request-user-item-view.jsx');

module.exports = React.createClass({
    render: function() {
        var users = this.props.allUsers.map(function(user, i) {
                return <UserItem key={user.id} user={user} />;
            });
        if (users.length == 0) {
            users = <em>No found users.</em>;
        }

        return (
            <div className="request-user-list-holder">
                {users}
            </div>
        );
    }
});
