var React = require('react'),
    EmitterMixin = require('lib/components/emitter-mixin.jsx'),
    NavigationItem = require('./request-detail-content-navigation-item-view.jsx'),
    PanelItem = require('./request-detail-content-panel-item-view.jsx');

module.exports = React.createClass({
    mixins: [ EmitterMixin ],
    componentDidMount: function() {
        this.addListener('shell.request.detail.focus.changed', this._detailTabChanged);
    },
    getInitialState: function() {
        return {
                active: null
            };
    },
    render: function() {
        var data = this.props.details.data,
            active = this.state.active,
            navigation = [],
            panel = null;

        for (var key in data) {
            var item = data[key],
                isActive = active == key || (!active && navigation.length == 0);

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
    _detailTabChanged: function(payload) {
        this.setState({ active: payload.tab });
    }
});
