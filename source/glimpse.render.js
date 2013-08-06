glimpse.render = (function($, pubsub, util, data, settings) {
    var templates = {
            css: '/*(import:glimpse.render.shell.css)*/',
            html: '/*(import:glimpse.render.shell.html)*/'
        },
        generateSpriteAddress = function () {
            var uri = settings.local('sprite') || 'http://getglimpse.com/content/_v1/app-sprite-new.png?version={version}',
                version = settings.local('version') || '0.0',
                hash = settings.local('hash') || '0.0';
            
            return util.uriTemplate(uri, { 'version': version, 'hash': hash });
        },
        updateSpriteAddress = function (args) {
            var uri = args.metadata.resources.glimpse_sprite,
                version = args.metadata.version,
                hash = args.metadata.hash;
            if (uri)
                settings.local('sprite', uri);
            if (version)
                settings.local('version', version);
            if (hash)
                settings.local('hash', hash);
        },
        getCss = function() {
            var content = templates.css.replace(/url\(\)/gi, 'url(' + generateSpriteAddress() + ')');
            
            return '<style type="text/css"> ' + content + ' </style>'; 
        },
        getHtml = function() {
            return templates.html;
        },
        process = function(isInitial, topic) {
            pubsub.publish(topic + '.rendering', { isInitial: isInitial });
            pubsub.publish('action.shell.rendering', { isInitial: isInitial }); 
         
            pubsub.publish('action.shell.rendered', { isInitial: isInitial });
            pubsub.publish(topic + '.rendered', { isInitial: isInitial });
        },
        refresh = function() {
            pubsub.publish('trigger.shell.clear');

            process(false, 'action.shell.refresh');
        },
        init = function() {  
            pubsub.publish('action.template.processing', { templates: templates });
            pubsub.publish('action.shell.loading');
            
            $(getCss()).appendTo('head'); 
            $(getHtml()).appendTo('body');
            
            pubsub.publish('action.shell.loaded');
            pubsub.publish('action.template.processed', { templates: templates });

            pubsub.publish('trigger.shell.subscriptions'); 

            process(true, 'action.shell.initial'); 
            
            pubsub.publish('trigger.shell.ready'); 
        },
        notify = function() {
            setTimeout(function() {
                $('.glimpse-panelitem-default').html('No data has been found. This could be caused because:<br /><br />- the data is still loading by the client, or<br />- no data has been received from the server (check to see if the data &amp; metadata payloads are present), or<br />- no plugin has been loaded, or<br />- an error has been thrown in the client (please check your JavaScript console and let us know if anything is up).');
            }, 6000);
        };

    pubsub.subscribe('action.data.metadata.changed', updateSpriteAddress);
    pubsub.subscribe('trigger.shell.refresh', refresh); 
    pubsub.subscribe('trigger.shell.init', init);
    pubsub.subscribe('action.shell.loaded', notify);

    return {};
})(jQueryGlimpse, glimpse.pubsub, glimpse.util, glimpse.data, glimpse.settings); 