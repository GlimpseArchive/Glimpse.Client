(function(settings, pubsub, elements) { 
    var readyOpen = function () {
            var isOpen = settings.local('isOpen'); 
            if (isOpen) 
                pubsub.publish('trigger.shell.open', { isInitial: true }); 
        },
        readySelect = function () {
            var current = settings.local('view'),
                tabElement = elements.tab(current),
                forced = current != null;
            
            if (!current || tabElement.length == 0) {
                tabElement = elements.tabHolder().find('li:not(.glimpse-active, .glimpse-disabled):first'); 
                current = tabElement.attr('data-glimpseKey');
            }
             
            if (tabElement.length > 0 && !tabElement.hasClass('glimpse-active'))
                pubsub.publish('trigger.tab.select.' + current, { key: current, forced: forced });
        },
        selected = function (args) {
            if (!args.forced)
                settings.local('view', args.key);
        },
        currentTab = '', 
        focusStart = function(key, isOpening) {
            if (key)
                currentTab = key;
            
            if (currentTab) { 
                pubsub.publish('action.tab.focus.start.' + currentTab, { isOpening: isOpening, key: currentTab });
            }
        },
        focusStop = function(userTermination, switchingTab, pageRedirect) { 
            if (currentTab) { 
                pubsub.publish('action.tab.focus.stop.' + currentTab, { userTermination: userTermination, switchingTab: switchingTab, pageRedirect: pageRedirect, key: currentTab }); 
                currentTab = '';
            }
        };

    pubsub.subscribe('trigger.shell.ready', readyOpen);
    pubsub.subscribe('action.tab.inserted', readySelect);
    pubsub.subscribe('trigger.tab.select', selected);
    pubsub.subscribe('action.panel.showing', function(args) { focusStart(args.key, false); });
    pubsub.subscribe('action.shell.opening', function() { focusStart(null, true); });
    pubsub.subscribe('action.shell.closeing', function() { focusStop(true, false, false); }); 
    pubsub.subscribe('action.shell.minimizing', function() { focusStop(true, false, false); }); 
    pubsub.subscribe('action.panel.hiding', function() { focusStop(false, true, false); });
    window.onbeforeunload = function() { focusStop(false, false, true); };
})(glimpse.settings, glimpse.pubsub, glimpse.elements);
