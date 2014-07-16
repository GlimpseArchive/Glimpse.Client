var React = require('react'),
    SessionList = require('./request-session-view.js');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="row">
            <div className="col-md-2 request-session-holder-outter">
                <SessionList />
            </div>
            <div className="col-md-3 temp2"></div>
            <div className="col-md-7 temp3"></div>
        </div>
    );
  }
});
