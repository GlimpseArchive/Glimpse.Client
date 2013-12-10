(function($, pubsub, data, elements) {
    var renderLayout = function() {
            var requestData = data.currentData(),
                name = requestData.clientId ? '"' + requestData.clientId + '"' : '&#xa0;';

            elements.titleHolder().find('.glimpse-snapshot-name').html(name);
            elements.titleHolder().find('.glimpse-uri').text(requestData.uri);
        };
    
    pubsub.subscribe('action.shell.rendering', renderLayout);
    pubsub.subscribe('trigger.title.render', renderLayout);
})(jQueryGlimpse, glimpse.pubsub, glimpse.data, glimpse.elements);
