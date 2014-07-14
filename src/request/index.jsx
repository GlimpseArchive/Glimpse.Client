require('./style/index.css');

var React = require('react'),
    RequestShell = require('./components/shell');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="request-holder">
            <RequestShell />
        </div>
    );
  }
});
