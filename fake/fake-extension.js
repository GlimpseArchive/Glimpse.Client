'use strict';

var Chance = require('chance');
var chance = new Chance();
var mvcActions = [];
var methods = [ 'GET', 'GET', 'GET', 'GET', 'POST', 'POST', 'POST', 'PUT', 'PUSH', 'DELETE' ];
var statuses = [ 200, 200, 200, 200, 200, 200, 404, 404, 403, 403, 500, 304 ];
var statusText = { 200: 'OK', 404: 'NOT FOUND', 500: 'SERVER ERROR', 304: 'OK', 403: 'ERROR' };

chance.mixin({
    'integerRange': function(min, max) {
        return chance.integer({ min: min, max: max });
    },
    'durationRange': function(min, max) {
        return chance.floating({ min: min, max: max, fixed: 2 });
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
            };
        }
    };
}());

function gernateShoppingCart() {
    return {
        controller: 'ShoppingCart',
        action: 'CartSummary',
        route: generateRoute.normal('shoppingcart', 'cartsummary', null),
        activities: [
            { access: 'SQL', operation: 'Select', target: 'Carts', affected: 1, commmand: 'SELECT TOP (5) \n[Project1].[AlbumId] AS [AlbumId], \n[Project1].[GenreId] AS [GenreId], \n[Project1].[ArtistId] AS [ArtistId], \n[Project1].[Title] AS [Title], \n[Project1].[Price] AS [Price], \n[Project1].[AlbumArtUrl] AS [AlbumArtUrl]\nFROM ( SELECT \n    [Extent1].[AlbumId] AS [AlbumId], \n    [Extent1].[GenreId] AS [GenreId], \n    [Extent1].[ArtistId] AS [ArtistId], \n    [Extent1].[Title] AS [Title], \n    [Extent1].[Price] AS [Price], \n    [Extent1].[AlbumArtUrl] AS [AlbumArtUrl], \n    (SELECT \n        COUNT(1) AS [A1]\n        FROM [dbo].[OrderDetails] AS [Extent2]\n        WHERE [Extent1].[AlbumId] = [Extent2].[AlbumId]) AS [C1]\n    FROM [dbo].[Albums] AS [Extent1]\n)  AS [Project1]\nORDER BY [Project1].[C1] DESC'  }
        ],
        trace: [
            { message: 'Cart has items in that the user has added.' }
        ]
    };
}

function generateGenreMenu() {
    return {
        controller: 'Store',
        action: 'GenreMenu',
        route: generateRoute.normal('store', 'genremenu', null),
        activities: [
            { access: 'SQL', operation: 'Select', target: 'Genres', affected: 10, command: 'SELECT \n[Extent1].[GenreId] AS [GenreId], \n[Extent1].[Name] AS [Name], \n[Extent1].[Description] AS [Description]\nFROM [dbo].[Genres] AS [Extent1]' }
        ]
    };
}

function generateMvc() {
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
                { access: 'SQL', operation: 'Select', target: 'Albums', affected: chance.integerRange(2, 50), command: 'SELECT \n[Project1].[GenreId] AS [GenreId], \n[Project1].[Name] AS [Name], \n[Project1].[Description] AS [Description], \n[Project1].[C1] AS [C1], \n[Project1].[AlbumId] AS [AlbumId], \n[Project1].[GenreId1] AS [GenreId1], \n[Project1].[ArtistId] AS [ArtistId], \n[Project1].[Title] AS [Title], \n[Project1].[Price] AS [Price], \n[Project1].[AlbumArtUrl] AS [AlbumArtUrl]\nFROM ( SELECT \n    [Limit1].[GenreId] AS [GenreId], \n    [Limit1].[Name] AS [Name], \n    [Limit1].[Description] AS [Description], \n    [Extent2].[AlbumId] AS [AlbumId], \n    [Extent2].[GenreId] AS [GenreId1], \n    [Extent2].[ArtistId] AS [ArtistId], \n    [Extent2].[Title] AS [Title], \n    [Extent2].[Price] AS [Price], \n    [Extent2].[AlbumArtUrl] AS [AlbumArtUrl], \n    CASE WHEN ([Extent2].[AlbumId] IS NULL) THEN CAST(NULL AS int) ELSE 1 END AS [C1]\n    FROM  (SELECT TOP (2) [Extent1].[GenreId] AS [GenreId], [Extent1].[Name] AS [Name], [Extent1].[Description] AS [Description]\n        FROM [dbo].[Genres] AS [Extent1]\n        WHERE [Extent1].[Name] = "Rock" ) AS [Limit1]\n    LEFT OUTER JOIN [dbo].[Albums] AS [Extent2] ON [Limit1].[GenreId] = [Extent2].[GenreId]\n)  AS [Project1] ORDER BY [Project1].[GenreId] ASC, [Project1].[C1] ASC' }
            ],
            actions: [
                gernateShoppingCart(),
                generateGenreMenu()
            ],
            trace: [
                { template: { mask: 'Currently genre {0} selected', values: { '0': genre } } }
            ]
        });
    }

    // '/Store/Details/2'
    for (i = 0; i < chance.integerRange(10, 15); i++) {
        var id = chance.integerRange(1000, 2000);

        mvcActions.push({ url: '/Store/Details/' + id, controller: 'Store', action: 'Details',
                route: generateRoute.normal('store', 'details', id),
                activities: [
                    { access: 'SQL', operation: 'Select', target: 'Albums', affected: 1, command: 'SELECT TOP (2) \n[Extent1].[AlbumId] AS [AlbumId], \n[Extent1].[GenreId] AS [GenreId], \n[Extent1].[ArtistId] AS [ArtistId], \n[Extent1].[Title] AS [Title], \n[Extent1].[Price] AS [Price], \n[Extent1].[AlbumArtUrl] AS [AlbumArtUrl]\nFROM [dbo].[Albums] AS [Extent1]\nWHERE [Extent1].[AlbumId] = 1 /* @p0 */' },
                    { access: 'SQL', operation: 'Select', target: 'Genres', affected: 1, command: 'SELECT \n[Extent1].[GenreId] AS [GenreId], \n[Extent1].[Name] AS [Name], \n[Extent1].[Description] AS [Description]\nFROM [dbo].[Genres] AS [Extent1]\nWHERE [Extent1].[GenreId] = 1 /* @EntityKeyValue1 */' },
                    { access: 'SQL', operation: 'Select', target: 'Artists', affected: 1, command: 'SELECT \n[Extent1].[ArtistId] AS [ArtistId], \n[Extent1].[Name] AS [Name]\nFROM [dbo].[Artists] AS [Extent1]\nWHERE [Extent1].[ArtistId] = 1 /* @EntityKeyValue1 */' }
                ],
                actions: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ],
                trace: [
                    { template: { mask: 'Currently item/detail {0} selected', values: { '0': id } } }
                ]
            });
    }

    // Generate
    var standard = [
        { url: '/', controller: 'Home', action: 'Index',
                route: generateRoute.normal('home', 'index', null),
                activities: [
                    { access: 'SQL', operation: 'Select', target: 'Albums', affected: chance.integerRange(2, 50), command: 'SELECT TOP (5) \n[Project1].[AlbumId] AS [AlbumId], \n[Project1].[GenreId] AS [GenreId], \n[Project1].[ArtistId] AS [ArtistId], \n[Project1].[Title] AS [Title], \n[Project1].[Price] AS [Price], \n[Project1].[AlbumArtUrl] AS [AlbumArtUrl]\nFROM ( SELECT \n    [Extent1].[AlbumId] AS [AlbumId], \n    [Extent1].[GenreId] AS [GenreId], \n    [Extent1].[ArtistId] AS [ArtistId], \n    [Extent1].[Title] AS [Title], \n    [Extent1].[Price] AS [Price], \n    [Extent1].[AlbumArtUrl] AS [AlbumArtUrl], \n    (SELECT \n        COUNT(1) AS [A1]\n        FROM [dbo].[OrderDetails] AS [Extent2]\n        WHERE [Extent1].[AlbumId] = [Extent2].[AlbumId]) AS [C1]\n    FROM [dbo].[Albums] AS [Extent1]\n)  AS [Project1]\nORDER BY [Project1].[C1] DESC'  }
                ],
                actions: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ],
                trace: [
                    { message: 'Initial page loaded.' }
                ] },
        { url: '/ShoppingCart/', controller: 'ShoppingCart', action: 'Index',
                route: generateRoute.normal('shoppingcart', 'index', null),
                activities: [
                    { access: 'SQL', operation: 'Select', target: 'Carts', affected: 1, command: 'SELECT \n[Extent1].[RecordId] AS [RecordId], \n[Extent1].[CartId] AS [CartId], \n[Extent1].[AlbumId] AS [AlbumId], \n[Extent1].[Count] AS [Count], \n[Extent1].[DateCreated] AS [DateCreated]\nFROM [dbo].[Carts] AS [Extent1]\nWHERE [Extent1].[CartId] = "df0238d4-5bd4-49b5-97f0-9ba2c9957dc1" /* @p__linq__0 */' },
                    { access: 'SQL', operation: 'Select', target: 'Carts', affected: 1, command: 'SELECT \n[GroupBy1].[A1] AS [C1]\nFROM ( SELECT \n    SUM([Filter1].[A1]) AS [A1]\n    FROM ( SELECT \n         CAST( [Extent1].[Count] AS decimal(19,0)) * [Extent2].[Price] AS [A1]\n        FROM  [dbo].[Carts] AS [Extent1]\n        INNER JOIN [dbo].[Albums] AS [Extent2] ON [Extent1].[AlbumId] = [Extent2].[AlbumId]\n        WHERE [Extent1].[CartId] = "df0238d4-5bd4-49b5-97f0-9ba2c9957dc1" /* @p__linq__0 */\n    )  AS [Filter1]\n)  AS [GroupBy1]' }
                ],
                actions: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ],
                trace: [
                    { message: 'Cart applied tax rates correctly.' },
                    { template: { mask: 'Cart tax rates processed in {0}ms', values: { '0': chance.durationRange(0, 1) } } }
                ] },
        { url: '/Store/', controller: 'Store', action: 'Index',
                route: generateRoute.normal('store', 'index', null),
                activities: [
                    { access: 'SQL', operation: 'Select', target: 'Genres', affected: 10, command: 'SELECT \n[Extent1].[GenreId] AS [GenreId], \n[Extent1].[Name] AS [Name], \n[Extent1].[Description] AS [Description]\nFROM [dbo].[Genres] AS [Extent1]' }
                ],
                actions: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ],
                trace: [
                    { message: 'Processing menu options for selection.' }
                ] },
        { url: '/Account/LogOn/', controller: 'Account', action: 'LogOn',
                route: generateRoute.normal('account', 'logon', null),
                actions: [
                    gernateShoppingCart(),
                    generateGenreMenu()
                ],
                trace: [
                    { template: { mask: 'User from {0} is attempting to login', values: { '0': chance.ip() } } }
                ] }
    ];
    for (i = 0; i < chance.integerRange(15, 20); i++) {
        mvcActions.push(standard[chance.integerRange(0, 2)]);
    }
}
generateMvc();

module.exports = chance;
