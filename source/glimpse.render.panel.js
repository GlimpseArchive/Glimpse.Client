(function($, data, elements, pubsub, renderEngine) {
    var render = function (key, pluginData, pluginMetadata) {
            pubsub.publish('action.panel.rendering.' + key, { key: key, pluginData: pluginData, pluginMetadata: pluginMetadata });
            
            var panelHolder = elements.panelHolder(),  
                permanent = pluginData.isPermanent ? ' glimpse-permanent' : '',
                html = '<div class="glimpse-panel glimpse-panelitem-' + key + permanent  + '" data-glimpseKey="' + key + '"><div class="glimpse-panel-message">Loading data, please wait...</div></div>',
                panel = $(html).appendTo(panelHolder);

            if (!pluginData.dontRender)
                renderEngine.insert(panel, pluginData.data, pluginMetadata); 
            
            pubsub.publish('action.panel.rendered.' + key, { key: key, panel: panel, pluginData: pluginData, pluginMetadata: pluginMetadata, panelHolder: panelHolder });

            return panel;
        },
        selected = function(options) {
            var pluginData = data.currentData().data[options.key],
                pluginMetadata = data.currentMetadata().plugins[options.key],
                panel = elements.panel(options.key),
                currentSelection = elements.panelHolder().find('.glimpse-active');
            
            // Raise an event that lets us know when we dont care about a panel any more
            if (currentSelection.length > 0) { 
                // If already have a panel and its selected, ditch out
                var oldKey = currentSelection.attr('data-glimpseKey');
                if (oldKey == options.key)
                    return;

                currentSelection.removeClass('glimpse-active');
                
                pubsub.publish('action.panel.hiding.' + oldKey, { key: oldKey, newKey: options.key });
            }

            // Only run if we have data 
            if (pluginData != null) {
                pubsub.publish('action.panel.showing.' + options.key, { key: options.key, panel: panel, pluginData: pluginData, pluginMetadata: pluginMetadata, oldKey: oldKey });

                // Only render the content when we need to
                if (panel.length == 0) 
                    panel = render(options.key, pluginData, pluginMetadata);   
             
                panel.addClass('glimpse-active'); 
            
                pubsub.publish('action.panel.showed.' + options.key, { key: options.key, panel: panel, pluginData: pluginData, pluginMetadata: pluginMetadata, oldKey: oldKey });
            }
        },
        clear = function() {
            elements.panelHolder().find('.glimpse-panel:not(.glimpse-permanent)').remove();
        };

    pubsub.subscribe('trigger.tab.select', selected);
    pubsub.subscribe('trigger.shell.clear', clear);
})(jQueryGlimpse, glimpse.data, glimpse.elements, glimpse.pubsub, glimpse.render.engine);
