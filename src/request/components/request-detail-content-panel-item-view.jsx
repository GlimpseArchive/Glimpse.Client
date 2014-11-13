'use strict';

var React = require('react');
var cx = React.addons.classSet;
var requestTabController = require('../request-tab');

module.exports = React.createClass({
    render: function () {
        var data = this.props.data;
        var key = this.props.key;
        var containerClass = cx({
            'tab-pane': true,
            'active': this.props.isActive
        });
        var component = requestTabController.resolveTab(key);
        var componentResult = component({ key: key, data: data });

        return <div className={containerClass}>{componentResult}</div>;
    }
});
