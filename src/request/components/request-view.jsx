var React = require('react'),
    Session = require('./request-session-view.js'),
    Filter = require('./request-filter-view.js'),
    Entry = require('./request-entry-view.js');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="row">
            <div className="col-md-2 request-session-holder-outer">
                <Session />
            </div>
            <div className="col-md-7 request-entry-holder-outer">
                <Entry />
            </div>
            <div className="col-md-3 request-filter-holder-outer">
                <Filter />
            </div>
        </div>
    );
  }
});
