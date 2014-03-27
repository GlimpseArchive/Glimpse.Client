(function($, pubsub, elements, settings) {
    var firstOpen = true,
        wireListeners = function () { 
            elements.opener().find('.glimpse-icon').click(function () { pubsub.publish('trigger.shell.open', { isInitial: false }); });
            elements.barHolder().find('.glimpse-minimize').click(function () { pubsub.publish('trigger.shell.minimize'); });
            elements.barHolder().find('.glimpse-close').click(function () { pubsub.publish('trigger.shell.close'); });
        },  
        open = function(args) {
            if (!args.isInitial)
                settings.local('hidden', false);
            
            if (!settings.local('hidden') || args.force) {
                settings.local('isOpen', true);

                if (firstOpen)
                    pubsub.publish('action.shell.initial.opening'); 
                pubsub.publish('action.shell.opening', { isInitial: args.isInitial });

                var height = settings.local('height') || 300; 
                settings.local('height', height);
                settings.local('panelHeight', height - 52);
                
                var heightTargets = $.fn.add.call(elements.holder(), elements.pageSpacer());
                if (!args.fullScreen) 
                    heightTargets.height(height);
                elements.root().removeClass('glimpse-minimized').addClass('glimpse-opened');
                if (args.isInitial)
                    elements.root().addClass('glimpse-heightset');  
                 
                if (args.fullScreen) {
                    elements.pageSpacer().remove();
                     
                    $(window).resize(function() {
                        var panelHeight = $(window).height() - 54; 
                        elements.panels().height(panelHeight); 
                        pubsub.publish('trigger.shell.fullScreen.resize', { panelHeight: panelHeight });
                    });
                }
                
                pubsub.publish('action.shell.opened', { isInitial: args.isInitial });
                if (firstOpen)
                    pubsub.publish('action.shell.initial.opened');

                firstOpen = false;
            }
            else
                pubsub.publish('trigger.shell.suppressed.open');
        },
        minimize = function() {
            settings.local('isOpen', false);
             
            pubsub.publish('action.shell.minimizing'); 
            elements.root().removeClass('glimpse-opened').addClass('glimpse-minimized'); 
            pubsub.publish('action.shell.minimized');  
            
        },
        hide = function () {
            settings.local('hidden', true);

            elements.holder().hide();
            elements.pageSpacer().hide();
            elements.opener().show(); 
        },
        close = function() {
            settings.local('isOpen', false);
            settings.local('hidden', false);
            settings.global('glimpsePolicy', null, -1);
            
            pubsub.publish('action.shell.closeing');

            elements.holder().remove();
            elements.pageSpacer().remove();
            elements.opener().remove(); 

            pubsub.publish('action.shell.closed'); 
        };
    
    pubsub.subscribe('trigger.shell.open', open);
    pubsub.subscribe('trigger.shell.minimize', minimize);
    pubsub.subscribe('trigger.shell.close', close);
    pubsub.subscribe('trigger.shell.subscriptions', wireListeners); 
    pubsub.subscribe('trigger.shell.hide', hide);
})(jQueryGlimpse, glimpse.pubsub, glimpse.elements, glimpse.settings);
