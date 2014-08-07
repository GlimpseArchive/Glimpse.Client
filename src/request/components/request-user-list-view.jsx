var React = require('react'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    UserItem = require('./request-user-item-view.jsx');

module.exports = React.createClass({
    render: function() {
        var users = this.props.allUsers.map(function(user, i) {
                return <UserItem key={user.id} user={user} />;
            }),
            message = (users.length === 0) ? <em>No found users.</em> : '';

        return (
            <div className="request-user-list-holder">
                <ReactCSSTransitionGroup component={React.DOM.div} transitionName="request-user-item-holder" transitionLeave={false}>
                    {users}
                </ReactCSSTransitionGroup>
                {message}
            </div>
        );
    }
});
