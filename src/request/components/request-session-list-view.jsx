var React = require('react'),
    SessionItem = require('./request-session-item-view.js');

function getSessionState() {
    return {
        allSessions: sessionStore.getAll()
    };
};

module.exports = React.createClass({
    render: function() {
        var allSessions = this.props.allSessions;
        var sessions = [];
        for (var key in allSessions) {
          sessions.push(<SessionItem key={key} session={allSessions[key]} />);
        }

        return (
            <ul className="request-session-list-holder">
                {sessions}
            </ul>
        );
    }
});
