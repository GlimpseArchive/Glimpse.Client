var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="row">
            <div className="col-md-2 temp1"></div>
            <div className="col-md-3 temp2"></div>
            <div className="col-md-7 temp3"></div>
        </div>
    );
  }
});
