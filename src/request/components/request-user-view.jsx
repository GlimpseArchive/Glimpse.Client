require('../stores/request-user-store.js');

var glimpse = require('glimpse'),
    React = require('react'),
    UserList = require('./request-user-list-view.jsx');

function getState(payload) {
    return {
        allUsers: (payload && payload.allUsers) ? payload.allUsers : {},
        selectedUserId: (payload && payload.selectedUserId) ? payload.selectedUserId : null
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
        var clear = this.state.selectedUserId ? <input type="button" value="Clear Selection" onClick={this._onClearSelection} /> : null;

        return (
            <div className="request-user-holder">
                <h2>Users</h2>
                {clear}
                <UserList allUsers={this.state.allUsers} />
            </div>
        );
    },
    _userChanged: function(allUsers) {
        this.setState(getState(allUsers));
    },
    _onClearSelection: function() {
        glimpse.emit('shell.request.user.clear.selected', {});
    }
});
