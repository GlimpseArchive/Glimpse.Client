require('./request-view.scss');

var React = require('react');
var User = require('./request-user-view');
var Filter = require('./request-filter-view');
var Summary = require('./request-summary-view');
var Detail = require('./request-detail-view');

module.exports = React.createClass({
    render: function () {
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
(function () {
    var shellController = require('shell/shell');

    shellController.registerApplication({
        key: 'core_request',
        component: module.exports
    });
})();
