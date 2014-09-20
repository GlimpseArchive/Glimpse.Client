var glimpse = require('glimpse'),
    tabs = {};

module.exports = {
    getTabs: function() {
        return tabs;
    },
    registerTab: function(tab) {
        // TODO: validate key being in place
        tabs[tab.key] = tab;

        glimpse.emit('shell.request.tab.added', { tab: tab });
    }
};
