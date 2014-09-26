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
    'durationRange': function(min, max) {
        return chance.floating({ min: min, max: max, fixed: 2 })
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

var generateRoute = (function() {
    return {
        normal: function(controller, action, id) {
            return {
                name: 'Default',
                mask: '{controller}/{action}/{id}',
                resolution: [
                    { key: 'controller', value: controller, default: 'home' },
                    { key: 'action', value: action, default: 'index' },
                    { key: 'id', value: id, default: null }
                ]
            }
        }
    }
}());

function gernateShoppingCart() {
    return {
        controller: 'ShoppingCart',
        action: 'CartSummary',
        route: generateRoute.normal('shoppingcart', 'cartsummary', null),
        activities: [
            { type: 'data', access: 'SQL', operation: 'Select', target: 'Carts', affected: 1  }
        ]
    };
}

function generateGenreMenu() {
    return {
        controller: 'Store',
        action: 'GenreMenu',
        route: generateRoute.normal('store', 'genremenu', null),
        activities: [
            { type: 'data', access: 'SQL', operation: 'Select', target: 'Genres', affected: 10 }
        ]
    };
}

function generateMvc() {
    // '/Store/Browse?Genre={Rock}'
    for (var i = 0; i < chance.integerRange(5, 10); i++) {
        var genre = chance.word();

        mvcActions.push({
            url: '/Store/Browse?Genre=' + genre,
            controller: 'Store',
            action: 'Browse',
            route: generateRoute.normal('store', 'browse', null),
            binding: [
                { type: 'string', name: 'Genre', value: genre }
            ],
            activities: [
                { type: 'data', access: 'SQL', operation: 'Select', target: 'Albums', affected: chance.integerRange(2, 50)  }
            ],
            child: [
                gernateShoppingCart(),
                generateGenreMenu()
            ]
        });
    }

    // '/Store/Details/2'
    for (i = 0; i < chance.integerRange(10, 15); i++) {
        var id = chance.integerRange(1000, 2000);

        mvcActions.push({ url: '/Store/Details/' + id, controller: 'Store', action: 'Details',
                route: generateRoute.normal('store', 'details', id),
                activities: [
                    { type: 'data', access: 'SQL', operation: 'Select', target: 'Albums', affected: 1  },
                    { type: 'data', access: 'SQL', operation: 'Select', target: 'Genres', affected: 1  },
                    { type: 'data', access: 'SQL', operation: 'Select', target: 'Artists', affected: 1  }
                ],
                child: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ]
            });
    }

    // Generate
    var standard = [
        { url: '/', controller: 'Home', action: 'Index',
                route: generateRoute.normal('home', 'index', null),
                activities: [
                    { type: 'data', access: 'SQL', operation: 'Select', target: 'Albums', affected: chance.integerRange(2, 50)  }
                ],
                child: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ] },
        { url: '/ShoppingCart/', controller: 'ShoppingCart', action: 'Index',
                route: generateRoute.normal('shoppingcart', 'index', null),
                activities: [
                    { type: 'data', access: 'SQL', operation: 'Select', target: 'Carts', affected: 1 },
                    { type: 'data', access: 'SQL', operation: 'Select', target: 'Carts', affected: 1  }
                ],
                child: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ] },
        { url: '/Store/', controller: 'Store', action: 'Index',
                route: generateRoute.normal('store', 'index', null),
                activities: [
                    { type: 'data', access: 'SQL', operation: 'Select', target: 'Genres', affected: 10 }
                ],
                child: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ] },
        { url: '/Account/LogOn/', controller: 'Account', action: 'LogOn',
                route: generateRoute.normal('account', 'logon', null),
                child: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ] }
    ];
    for (i = 0; i < chance.integerRange(15, 20); i++) {
        mvcActions.push(standard[chance.integerRange(0, 2)]);
    }
}
generateMvc();

module.exports = chance;
