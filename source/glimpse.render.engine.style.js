(function($, pubsub) {
    var codeProcess = function(items) {
            $.each(items, function() {
                var item = $(this).addClass('prettyprint'),
                    codeType = item.hasClass('glimpse-code') ? item.attr('data-codeType') : item.closest('.glimpse-code').attr('data-codeType');

                item.html(prettyPrintOne(item.html(), codeType));
            });
        },
        apply = function(options) { 
            // Expand collapse  
            options.scope.find('.glimpse-expand').click(function() {
                var toggle = $(this).toggleClass('glimpse-collapse'),
                    hasClass = toggle.hasClass('glimpse-collapse');
                toggle.parent().next().children().first().toggle(!hasClass).next().toggle(hasClass);
            });
            
            // Hide expand/collapse depending on wether it is needed
            options.scope.find('.glimpse-toggle-all').closest('table').each(function() {
                var expandButtons = $(this).find('.glimpse-expand');
                if (expandButtons.length == 0) {
                    $(this).find('.glimpse-toggle-all').hide();
                }
            });
            
            // Expand or collapse all
            options.scope.find('.glimpse-toggle-all').click(function(event) {
                event.preventDefault();
                var table = $(this).closest('table');
                if ($(this).text() === '[Expand All]') {
                    table.find('.glimpse-expand').addClass('glimpse-collapse');
                    table.find('.glimpse-preview-show').show();
                    table.find('.glimpse-preview-string').hide();
                    table.find('.glimpse-toggle-all').text('[Collapse All]');
                } else {
                    table.find('.glimpse-expand').removeClass('glimpse-collapse');
                    table.find('.glimpse-preview-show').hide();
                    table.find('.glimpse-preview-string').show();
                    table.find('.glimpse-toggle-all').text('[Expand All]');
                }
            });
            
            // Alert state
            options.scope.find('.info, .warn, .error, .fail, .loading, .ms') 
                .find('> td:first-child, > tr:first-child .glimpse-cell:first-child')
                .not(':has(.icon)').prepend('<div class="icon"></div>');
;
            // Code formatting
            codeProcess(options.scope.find('.glimpse-code:not(:has(table)), .glimpse-code > table:not(:has(thead)) .glimpse-preview-show'));

            // Open state
            options.scope.find('.glimpse-start-open > td > .glimpse-expand:first-child').click(); 
        };
     
    pubsub.subscribe('trigger.panel.render.style', apply);
})(jQueryGlimpse, glimpse.pubsub);