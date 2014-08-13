var chance = require('./fake-extension.js'),
    _ = require('lodash');

var generate = (function() {
    return function(summary) {
        var request = _.clone(summary, true);
        
        //TODO: Fill out object

        return request;
    };
})();

module.exports = {
    generate: generate
};
