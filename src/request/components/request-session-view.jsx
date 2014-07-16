var glimpse = require('glimpse'),
    React = require('react'),
    SessionList = require('./request-session-list-view.js'),
    sessionStore = require('../stores/request-session-store.js');

function getSessionState() {
    return {
        allSessions: sessionStore.getAll()
    };
}

module.exports = React.createClass({
    getInitialState: function() {
        return getSessionState();
    },
    componentDidMount: function() {
        this._sessionChangedOn = glimpse.on('shell.request.session.changed', this._sessionChanged);
    },
    componentWillUnmount: function() {
        glimpse.off(this._sessionChangedOn);
    },
    render: function() {
        return (
            <div className="request-session-holder">
                <h2>Sessions</h2>
                <SessionList allSessions={this.state.allSessions} />
            </div>
        );
    },
    _sessionChanged: function() {
        this.setState(getSessionState());
    }
});
