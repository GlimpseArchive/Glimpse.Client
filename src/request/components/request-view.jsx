var React = require('react'),
    User = require('./request-user-view.jsx'),
    Filter = require('./request-filter-view.jsx'),
    Entry = require('./request-entry-view.jsx');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="row">
            <div className="col-md-2 request-user-holder-outer">
                <User />
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
