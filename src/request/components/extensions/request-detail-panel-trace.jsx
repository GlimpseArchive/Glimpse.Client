var React = require('react'),
    PanelGeneric = require('./request-detail-panel-generic.jsx');

module.exports = React.createClass({
    render: function() {
        return (
            <table>
                <thead>
                    <th>Category</th>
                    <th>Message</th>
                    <th>Template</th>
                    <th>Values</th>
                </thead>
                {this.props.data.payload.map(function(item) {
                    var templateValues = null,
                        templateMask = null;
                    if (item.template && item.template.values) {
                        templateValues = <PanelGeneric payload={item.template.values} />;
                        templateMask = item.template.mask;
                    }

                    return (<tr>
                            <td>{item.category}</td>
                            <td>{item.message}</td>
                            <td>{templateMask}</td>
                            <td>{templateValues}</td>
                        </tr>);
                })}
            </table>
        );
    }
});


// TODO: Need to come up with a better self registration process
(function() {
    var requestTabController = require('../../request-tab.js');

    requestTabController.registerTab({
        key: 'core_trace',
        component: module.exports
    });
})()
