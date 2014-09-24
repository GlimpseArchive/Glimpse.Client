var React = require('react'),
    cx = React.addons.classSet,
    requestTabController = require('../request-tab.js');

module.exports = React.createClass({
    render: function() {
        var data = this.props.data,
            key = this.props.key,
            containerClass = cx({
                'tab-pane': true,
                'active': this.props.isActive
            }),
            component = requestTabController.resolveTab(key, data),
            componentResult = component({ key: key, data: data });

        return <div className={containerClass}>{componentResult}</div>;
    }
});
