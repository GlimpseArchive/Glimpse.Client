(function($, pubsub, util, settings, elements, data, renderEngine) {
    var middleware = {};

    var renderArrow = function(side, color) {
            return '<div class="glimpse-arrow-holder-' + side + '"><div class="glimpse-arrow-bar" style="background-color:' + color + ';"></div><div class="glimpse-arrow-head-back"></div><div class="glimpse-arrow-head" style="border-' + (side == 'left' ? 'right' : 'left') + '-color:' + color + '"></div></div>';
        }, 
        renderMiddlewareItem = function(item, previousColor) {
            var html = '<table class="glimpse-middleware-holder' + (!item.children ? ' glimpse-middleware-holder-childless' : '') + (item.childlessDuration ? ' glimpse-middleware-holder-important' : '') + '"><tr>';

            // item 
            html += '<td style="background-color:' + item.color + ';">';

                // arror
                if (item.duration) {
                    html += renderArrow('right', previousColor);
                    html += renderArrow('left', item.color);
                }
                // content
                html += '<div class="glimpse-middleware-content">';
                    html += '<div class="glimpse-middleware-title" title="' + item.type + '">' + item.title + '</div>'; 
                    if (item.childlessDuration != null) {
                        var durationTitle = item.duration != null ? ' title="Total Duration ' + item.duration + 'ms"' : ''; 
                        html += '<div' + durationTitle + ' class="glimpse-middleware-duration">' + item.childlessDuration + '<span>ms</span></div>';
                    }
                html += '</div>';

            html += '</td>'

            // children
            if (item.children) {
                html += '<td>';
                item.children.forEach(function(element) {
                    html += renderMiddlewareItem(element, item.color);
                });
                html += '</td>';
            }

            return html + '</tr></table>';
        },
        renderMiddleware = function(item) { 
            var html = '<div class="glimpse-header">Execution Pipline</div>';
            html += '<table class="glimpse-middleware-holder"><tr><td class="glimpse-middleware-holder-main"><div class="glimpse-middleware-main-title">Host</div></td><td>'
            html += renderMiddlewareItem(item, '#d6d6d6'); //' + renderArrow('right', '#d6d6d6') + '
            html += '</td></tr></table>'

            return html;
        },
        init = function(args) {
            if (!args.data)
                return;

            var html = renderMiddleware(args.data);

            args.scope.html(html);
        },
        modify = function(options) {
            options.templates.css += '/*(import:glimpse.middleware.shell.css)*/';
        },
        prerender = function(args) {
            args.pluginData._data = args.pluginData.data;
            args.pluginData.data = 'Loading data, please wait...';
        },
        postrender = function(args) {
            args.pluginData.data = args.pluginData._data;
            args.pluginData._data = null;

            pubsub.publishAsync('trigger.middleware.init', { scope: args.panel, data:  args.pluginData.data });
        };


    pubsub.subscribe('trigger.middleware.init', init);
    pubsub.subscribe('action.template.processing', modify);
    pubsub.subscribe('action.panel.rendering.glimpse_middleware', prerender);
    pubsub.subscribe('action.panel.rendered.glimpse_middleware', postrender);


})(jQueryGlimpse, glimpse.pubsub, glimpse.util, glimpse.settings, glimpse.elements, glimpse.data, glimpse.render.engine);
