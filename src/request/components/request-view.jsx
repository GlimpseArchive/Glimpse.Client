require('./request-view.scss');

var React = require('react'),
    User = require('./request-user-view.jsx'),
    Filter = require('./request-filter-view.jsx'),
    Summary = require('./request-summary-view.jsx'),
    Detail = require('./request-detail-view.jsx');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="container-fluid">
                <div className="row request-holder-outer">
                    <div className="col-md-2 request-user-holder-outer">
                        <User />
                    </div>
                    <div className="col-md-8 request-summary-holder-outer">
                        <Summary />
                    </div>
                    <div className="col-md-2 request-filter-holder-outer">
                        <Filter />
                    </div>
                    <Detail />
                </div>
            </div>
        );
    }
});


// TODO: Need to come up with a better self registration process
(function() {
    var shellController = require('shell/shell.js');

    shellController.registerApplication({
        key: 'core_request',
        component: module.exports
    });
})();
