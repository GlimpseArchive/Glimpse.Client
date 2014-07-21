var React = require('react'),
    SessionItem = require('./request-session-item-view.jsx');

module.exports = React.createClass({
    render: function() {
        var allSessions = this.props.allSessions;
        var sessions = [];
        for (var key in allSessions) {
          sessions.push(<SessionItem key={key} session={allSessions[key]} />);
        }
        if (sessions.length == 0) {
            sessions = <em>No found sessions.</em>;
        }

        return (
            <div className="request-session-list-holder">
                {sessions}
            </div>
        );
    }
});
