var chance = require('./fake-extension.js'),
    _ = require('lodash');

var generate = (function() {
    return function(summary) {
        var request = _.clone(summary, true);

        //TODO: Fill out object
        request.data = {
            core_execution: {
                title: 'Execution',
                payload: [
                    { type: 'route' },
                    { type: 'filter', origin: 'system', category: 'Authorization' }
                ]
            },
            core_trace: {
                title: 'Trace',
                payload: [
                    { type: 'route' },
                    { type: 'filter', origin: 'system', category: 'Authorization' }
                ]
            }
        };

        return request;
    };
})();

module.exports = {
    generate: generate
};
