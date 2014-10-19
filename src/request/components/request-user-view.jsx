require('../stores/request-user-store.js');

var glimpse = require('glimpse'),
    React = require('react'),
    UserList = require('./request-user-list-view.jsx'),
    EmitterMixin = require('lib/components/emitter-mixin.jsx');

function getState(payload) {
    return {
        allUsers: (payload && payload.allUsers) ? payload.allUsers : {},
        selectedUserId: (payload && payload.selectedUserId) ? payload.selectedUserId : null
    };
}

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    getInitialState: function() {
        return getState();
    },
    componentDidMount: function() {
        this.addListener('shell.request.user.detail.changed', this._userChanged);
    },
    render: function() {
        return (
            <div className="request-user-holder">
                <h2>Users</h2>
                {this.state.selectedUserId ?
                    <input type="button" value="Clear Selection" onClick={this._onClearSelection} /> :
                    null
                }
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
