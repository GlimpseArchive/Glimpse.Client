var Chance = require('chance'),
    chance = new Chance(),
    mvcActions = [],
    methods = [ 'GET', 'GET', 'GET', 'GET', 'POST', 'POST', 'POST', 'PUT', 'PUSH', 'DELETE' ],
    statuses = [ 200, 200, 200, 200, 200, 200, 404, 404, 403, 403, 500, 304 ],
    statusText = { 200: 'OK', 404: 'NOT FOUND', 500: 'SERVER ERROR', 304: 'OK', 403: 'ERROR' };

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
    'mvcAction': function() {
        return chance.pick(mvcActions);
    },
    'httpPath': function() {
        return chance.pick(mvcActions).url;
    },
    'httpMethod': function() {
        return chance.pick(methods);
    },
    'httpStatus': function() {
        var code = chance.pick(statuses);
        return {
            code: code,
            text: statusText[code]
        };
    },
    'httpContentType': function() {
        // TODO: Switch over to weighted random with bias towards html
        return 'text/html';
    }
});

function generateMvc() {
    // '/Store/Browse?Genre={Rock}'
    for (var i = 0; i < chance.integerRange(5, 10); i++) {
        mvcActions.push({ url: '/Store/Browse?Genre=' + chance.word(), controller: 'Store', action: 'Browse' });
    }

    // '/Store/Details/2'
    for (i = 0; i < chance.integerRange(10, 15); i++) {
        mvcActions.push({ url: '/Store/Details/' + chance.integerRange(1000, 2000), controller: 'Store', action: 'Details' });
    }

    // Generate
    var standard = [
        { url: '/', controller: 'Home', action: 'Index' },
        { url: '/ShoppingCart/', controller: 'ShoppingCart', action: 'Index' },
        { url: '/Store/', controller: 'Store', action: 'Index' },
        { url: '/Account/LogOn/', controller: 'Account', action: 'LogOn' }
    ];
    for (i = 0; i < chance.integerRange(15, 20); i++) {
        mvcActions.push(standard[chance.integerRange(0, 2)]);
    }
}
generateMvc();

module.exports = chance;
