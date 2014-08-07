require('../stores/request-user-store.js');

var glimpse = require('glimpse'),
    React = require('react'),
    UserList = require('./request-user-list-view.jsx');

function getState(allUsers) {
    return {
        allUsers: allUsers || []
    };
}

module.exports = React.createClass({
    getInitialState: function() {
        return getState();
    },
    // TODO: Get rid of this boiler plate code via a mixin
    componentDidMount: function() {
        this._userChangedOn = glimpse.on('shell.request.user.entry.changed', this._userChanged);
    },
    componentWillUnmount: function() {
        glimpse.off(this._userChangedOn);
    },
    render: function() {
        return (
            <div className="request-user-holder">
                <h2>Users</h2>
                <UserList allUsers={this.state.allUsers} />
            </div>
        );
    },
    _userChanged: function(allUsers) {
        this.setState(getState(allUsers));
    }
});
