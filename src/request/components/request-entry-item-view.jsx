var React = require('react');

module.exports = React.createClass({
    render: function() {
        var entry = this.props.entry;
        return (
            <li className="request-entry-item-holder">
                {entry.id} ({entry.url})
            </li>
        );
    }
});
