var glimpse = require('glimpse'),
    React = require('react'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    UserItem = require('./request-user-list-item-view.jsx');

module.exports = React.createClass({
    render: function() {
        var allUsers = this.props.allUsers;

        return (
            <div className="request-user-list-holder">
                <ReactCSSTransitionGroup component={React.DOM.div} transitionName="request-user-item-holder" transitionLeave={false}>
                    {glimpse.util.eachMap(allUsers, function(key, user) {
                        return <UserItem key={user.details.id} user={user} />;
                    })}
                </ReactCSSTransitionGroup>
                {glimpse.util.isEmpty(allUsers) ?
                    <em>No found users.</em> :
                    null
                }
            </div>
        );
    }
});
