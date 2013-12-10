(function($, pubsub, data, elements) {
    var wireListeners = function() {
            elements.titleHolder().find('.glimpse-snapshot-path .glimpse-link').live('click', function() { pubsub.publish('trigger.data.context.switch', { requestId: $(this).attr('data-requestId'), type: 'path' }); });
        }, 
        buildHtml = function(currentData) {
            var baseData = data.baseData(), 
                html = '';
            
            if (currentData.isAjax)
                html = ' &gt; Ajax';
            if ((currentData.isAjax && baseData.requestId != currentData.parentRequestId) || (!currentData.isAjax && baseData.requestId != currentData.requestId)) {
                if (html) 
                    html = ' &gt; <span class="glimpse-link glimpse-pulse glimpse-context" data-requestId="' + (currentData.isAjax ? currentData.parentRequestId : currentData.requestId) + '">History</span>' + html;
                else
                    html = ' &gt; History';    
            }
            if (html)
                html = ' (<span class="glimpse-link glimpse-pulse glimpse-context" data-requestId="' + baseData.requestId + '">Original</span>' + html + ')';

             return html; 
        }, 
        contextSwitch = function(args) { 
            var html =  buildHtml(args.newData);
            
            elements.titleHolder().find('.glimpse-snapshot-path').html(html);

            var count = 0,
                pulseFunction = function() {
                    setTimeout(function() {
                        $('.glimpse-context', elements.scope()).toggleClass('glimpse-pulse-go');
                        
                        if (count++ < 7)
                            pulseFunction();
                    }, 500);
                };
            pulseFunction();
        },
        selected = function(args) {
            if (args.type == 'path') 
                data.retrieve(args.requestId, 'path');
        };
     
    pubsub.subscribe('action.data.refresh.changed', contextSwitch); 
    pubsub.subscribe('trigger.data.context.switch', selected); 
    pubsub.subscribe('trigger.shell.subscriptions', wireListeners);
})(jQueryGlimpse, glimpse.pubsub, glimpse.data, glimpse.elements);
