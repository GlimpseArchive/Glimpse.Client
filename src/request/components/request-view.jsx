var React = require('react'),
    Session = require('./request-session-view.js'),
    Filter = require('./request-filter-view.js');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="row">
            <div className="col-md-2 request-session-holder-outter">
                <Session />
            </div>
            <div className="col-md-7 temp2"></div>
            <div className="col-md-3 request-filter-holder-outter">
                <Filter />
            </div>
        </div>
    );
  }
});
