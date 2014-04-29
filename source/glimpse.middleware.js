(function($, pubsub, util, settings, elements, data, renderEngine) {
    var middleware = {};

    var generateColor = (function() {
            var color = ['#9b59b6','#3498db','#2ecc71','#1abc9c','#f1c40f','#e67e22','#e74c3c'],
                index = -1;

            return function() {
                index = index >= color.length - 1 ? 0 : index + 1;

                return color[index];
            };
        })(),
        renderArrow = function(side, color) {
            return '<div class="glimpse-arrow-holder-' + side + '"><div class="glimpse-arrow-bar" style="background-color:' + color + ';"></div><div class="glimpse-arrow-head-back"></div><div class="glimpse-arrow-head" style="border-' + (side == 'left' ? 'right' : 'left') + '-color:' + color + '"></div></div>';
        }, 
        renderTerminator = function(color) {
            return '<div class="glimpse-terminator-holder"><div class="glimpse-terminator-head" style="background-color:' + color + ';"></div><div class="glimpse-terminator-bar" style="background-color:' + color + ';"></div></div>'
        },
        renderMiddlewareItem = function(item, previousColor) {
            var nextColor = item.color || (!item.duration ? '#B8B8B8' : generateColor()),
                html = '<div class="glimpse-middleware-holder-outer"><table class="glimpse-middleware-holder' + (!item.children ? ' glimpse-middleware-holder-childless' : '') + (item.duration ? ' glimpse-middleware-holder-important' : '') + (!item.duration ? ' glimpse-middleware-holder-none' : '') + '"><tr>';

            // item 
            html += '<td style="background-color:' + nextColor + ';">';

                // arror
                if (item.duration) {
                    html += renderArrow('right', previousColor);
                    html += renderArrow('left', nextColor);
                }
                else
                    html += renderTerminator(previousColor);

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
                    html += renderMiddlewareItem(element, nextColor);
                });
                html += '</td>';
            }

            return html + '</tr></table></div>';
        },
        renderMiddleware = function(item) { 
            var html = '<div class="glimpse-header">Execution Pipline</div>';
            html += '<table class="glimpse-middleware-holder"><tr><td class="glimpse-middleware-holder-root"><div class="glimpse-middleware-root-title">Host</div></td><td>'
            html += renderMiddlewareItem(item, '#d6d6d6');
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
