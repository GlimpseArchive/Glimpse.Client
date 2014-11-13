'use strict';

var React = require('react');

var subItem = function (data, title, level) {
    var results = {};
    for (var key in data) {
        var value = data[key] || '--';
        if (key == 'type' && level == 0) {
            title = value;
        }
        else if (typeof value === 'object') {
            results[key] = subItem(value, key, level + 1);
        }
        else {
            results[key] = <span><strong>{key}:</strong> {value} &nbsp; </span>;
        }
    }

    return (
        <table>
            <tr>
                <th>{title}</th>
                <td> &nbsp;  &nbsp;  &nbsp; </td>
                <td>{results}</td>
            </tr>
        </table>
    );
};

module.exports = React.createClass({
    render: function () {
        var output = this.props.data.payload.map(function (item) {
            var result = subItem(item, 'Row', 0);

            return <div>{result}<br /><br /></div>;
        });

        return <div>{output}</div>;
    }
});


// TODO: Need to come up with a better self registration process
(function () {
    var requestTabController = require('../request-tab');

    requestTabController.registerTab({
        key: 'core_execution',
        component: module.exports
    });
})();
