var glimpse = require('glimpse'),
    PanelGeneric = require('./components/extensions/request-detail-panel-generic.jsx'),
    tabs = {};

module.exports = {
    resolveTab: function(key, data) {
        // TODO: strategy needs to be improved
        if (tabs[key]) {
            return tabs[key].component;
        }

        return PanelGeneric;
    },
    registerTab: function(tab) {
        // TODO: validate key being in place
        tabs[tab.key] = tab;

        glimpse.emit('shell.request.tab.added', { tab: tab });
    }
};
