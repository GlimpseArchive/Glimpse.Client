var Chance = require('chance'),
    chance = new Chance(),
    mvc = [],
    methods = [ 'GET', 'GET', 'GET', 'GET', 'POST', 'POST', 'POST', 'PUT', 'PUSH', 'DELETE' ],
    statuses = [ 200, 200, 200, 200, 200, 200, 404, 404, 403, 403, 500, 304 ];

chance.mixin({
    'integerRange': function(min, max) {
        return chance.integer({ min: min, max: max });
    },
    'dateRange': function(min, max) {
        var time = new Date().getTime(),
            difference = chance.integerRange(min, max),
            newTime = new Date(time + difference);

        return newTime;
    },
    'mvc': function() {
        return chance.pick(mvc);
    },
    'path': function() {
        return chance.pick(mvc).url;
    },
    'method': function() {
        return chance.pick(methods);
    },
    'status': function() {
        return chance.pick(statuses);
    }
});

function generateMvc() {
    // '/Store/Browse?Genre={Rock}'
    for (var i = 0; i < chance.integerRange(5, 10); i++) {
        mvc.push({ url: '/Store/Browse?Genre=' + chance.word(), controller: 'Store', action: 'Browse' });
    }

    // '/Store/Details/2'
    for (var i = 0; i < chance.integerRange(10, 15); i++) {
        mvc.push({ url: '/Store/Details/' + chance.integerRange(1000, 2000), controller: 'Store', action: 'Details' });
    }

    // Generate
    var standard = [
        { url: '/', controller: 'Home', action: 'Index' },
        { url: '/ShoppingCart/', controller: 'ShoppingCart', action: 'Index' },
        { url: '/Store/', controller: 'Store', action: 'Index' },
        { url: '/Account/LogOn/', controller: 'Account', action: 'LogOn' }
    ];
    for (var i = 0; i < chance.integerRange(15, 20); i++) {
        mvc.push(standard[chance.integerRange(0, 2)]);
    }
}
generateMvc();

module.exports = chance;
