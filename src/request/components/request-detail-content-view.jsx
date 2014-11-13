'use strict';

var React = require('react');
var EmitterMixin = require('lib/components/emitter-mixin');
var NavigationItem = require('./request-detail-content-navigation-item-view');
var PanelItem = require('./request-detail-content-panel-item-view');

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    componentDidMount: function () {
        this.addListener('shell.request.detail.focus.changed', this._detailTabChanged);
    },
    getInitialState: function () {
        return {
            active: null
        };
    },
    render: function () {
        var data = this.props.details.data;
        var active = this.state.active;
        var navigation = [];
        var panel = null;

        for (var key in data) {
            var item = data[key];
            var isActive = active == key || (!active && navigation.length == 0);

            navigation.push(<NavigationItem key={key} data={item} isActive={isActive} />);
            if (isActive) {
                panel = <PanelItem key={key} data={item} isActive={isActive} />;
            }
        }

        return (
            <div>
                <ul className="nav nav-tabs">
                    {navigation}
                </ul>
                <div className="tab-content">
                    {panel}
                </div>
            </div>
        );
    },
    _detailTabChanged: function (payload) {
        this.setState({ active: payload.tab });
    }
});
