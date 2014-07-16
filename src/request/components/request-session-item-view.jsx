var React = require('react');

module.exports = React.createClass({
    render: function() {
        var session = this.props.session;
        return (
            <li className="request-session-item-holder">
                {session.id} ({session.count}) - {session.last}
            </li>
        );
    }
});
