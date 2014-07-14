var React = require('react'),
    RequestShell = require('../../request');  // TODO: should be dynamic

module.exports = React.createClass({
  render: function() {
    return (
        <div className="application-holder">
            <RequestShell />
        </div>
    );
  }
});
