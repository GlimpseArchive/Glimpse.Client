var glimpse = require('glimpse'),
    tabs = {};

module.exports = {
    resolveTab: function(key, data) {
        // TODO: strategy needs to be improved
        return tabs[key].component;
    },
    registerTab: function(tab) {
        // TODO: validate key being in place
        tabs[tab.key] = tab;

        glimpse.emit('shell.request.tab.added', { tab: tab });
    }
};
