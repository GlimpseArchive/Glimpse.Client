glimpse.elements = (function($) {
    var scope = $(document),
        rootFunc = function () {
            return root || (root = scope.find('.glimpse'));;
        }, 
        root, holder, opener, pageSpacer, barHolder, panelHolder, tabHolder, tabInstanceHolder, tabPermanentHolder, titleHolder, notificationHolder, lightbox, optionsHolder, helpLink;
    
    return {
        scope: function () {
            return scope;
        },
        root: rootFunc,
        holder: function () {
            return holder || (holder = rootFunc().find('.glimpse-holder'));
        },
        opener: function () {
            return opener || (opener = rootFunc().find('.glimpse-open'));
        },
        pageSpacer: function () {
            return pageSpacer || (pageSpacer = rootFunc().find('.glimpse-spacer'));
        },
        barHolder: function () {
            return barHolder || (barHolder = rootFunc().find('.glimpse-bar'));
        },
        titleHolder: function () {
            return titleHolder || (titleHolder = rootFunc().find('.glimpse-title'));
        },
        tabHolder: function() {
             return tabHolder || (tabHolder = rootFunc().find('.glimpse-tabs ul'));
        },
        tabInstanceHolder: function() {
             return tabInstanceHolder || (tabInstanceHolder = rootFunc().find('.glimpse-tabs-instance ul'));
        },
        tabPermanentHolder: function() {
             return tabPermanentHolder || (tabPermanentHolder = rootFunc().find('.glimpse-tabs-permanent ul'));
        },
        panelHolder: function() {
             return panelHolder || (panelHolder = rootFunc().find('.glimpse-panel-holder'));
        },
        notificationHolder: function() {
            return notificationHolder || (notificationHolder = rootFunc().find('.glimpse-notification-holder'));
        },
        lightbox: function() {
            return lightbox || (lightbox = rootFunc().find('.glimpse-lightbox'));
        },
        panel: function(key) {
             return this.panelHolder().find('.glimpse-panel[data-glimpseKey="' + key + '"]');
        },
        tab: function(key) {
             return this.tabHolder().find('.glimpse-tab[data-glimpseKey="' + key + '"]');
        },
        panels: function() {
             return this.panelHolder().find('.glimpse-panel');
        },
        optionsHolder: function() {
            return optionsHolder || (optionsHolder = rootFunc().find('.glimpse-options'));
        },
        helpLink: function () {
            return helpLink || (helpLink = rootFunc().find('.glimpse-meta-help'));
        }
    };
})(jQueryGlimpse);
