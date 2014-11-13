'use strict';

var React = require('react');
var PanelGeneric = require('./request-detail-panel-generic');

module.exports = React.createClass({
    render: function () {
        return (
            <table>
                <thead>
                    <th>Category</th>
                    <th>Message</th>
                    <th>Template</th>
                    <th>Values</th>
                </thead>
                {this.props.data.payload.map(function (item) {
                    var template = {};
                    if (item.template && item.template.values) {
                        template.values = <PanelGeneric payload={item.template.values} />;
                        template.mask = item.template.mask;
                    }

                    return (
                        <tr>
                            <td>{item.category}</td>
                            <td>{item.message}</td>
                            <td>{template.mask}</td>
                            <td>{template.talues}</td>
                        </tr>
                    );
                })}
            </table>
        );
    }
});


// TODO: Need to come up with a better self registration process
(function () {
    var requestTabController = require('../request-tab');

    requestTabController.registerTab({
        key: 'core_trace',
        component: module.exports
    });
})()
