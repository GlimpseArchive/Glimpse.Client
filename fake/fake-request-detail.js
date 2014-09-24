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
                    { type: 'route', duration: '0.01', time: '1411576658503', name: 'Default', mask: '{controller}/{action}/{id}',
                        resolution: [
                            { key: 'controller', value: 'home', default: 'home' },
                            { key: 'action', value: 'index', default: 'index' },
                            { key: 'id', value: null, default: null }
                        ]
                    },
                    { type: 'filter', duration: '0.01', time: '1411576658503', targetClass: 'HomeController', targetMethod: 'OnAuthorization', filterType:'Authorization', filterOrigin: 'system', category: 'Authorization' },
                    { type: 'filter', duration: '0.01', time: '1411576658503', targetClass: 'HomeController', targetMethod: 'OnActionExecuting', filterType:'Action', filterOrigin: 'system', category: 'Executing' },
                    { type: 'action', duration: '12.24', time: '1411576658503', targetClass: 'HomeController', targetMethod: 'Index', physicalFile: 'Controller/HomeController.cs',
                        binding: [
                            { type: 'int', name: 'albumId', value: 8 },
                            { type: 'UserInfo', name: 'userInfo', value: [
                                    { type: 'string', name: 'name', value: 'Harry' },
                                    { type: 'int', name: 'age', value: 25 },
                                    { type: 'int', name: 'dob', value: 1983 }
                                ]
                            }
                        ],
                        activities: [
                            { tpye: 'data', duration: '2.34', time: '1411576658505', access: 'SQL', operation: 'Select', target: 'Carts', affected: '2'  },
                            { tpye: 'data', duration: '1.78', time: '1411576658508', access: 'SQL', operation: 'Select', target: 'Albums', affected: '1'  }
                        ]
                    },
                    { type: 'filter', duration: '0.01', time: '1411576658515', targetClass: 'HomeController', targetMethod: 'OnActionExecuted', filterType:'Action', filterOrigin: 'system', category: 'Executed' },
                    { type: 'filter', duration: '0.01', time: '1411576658516', targetClass: 'HomeController', targetMethod: 'OnResultExecuting', filterType:'Result', filterOrigin: 'system', category: 'Executing' },
                    { type: 'result', duration: '223.63', time: '1411576658516', targetClass: 'ViewResult', targetMethod: 'ExecuteResult', physicalFile: 'View/Home/Index.cshtml', engine: 'Razor' },

                        { type: 'route', duration: '0.01', time: '1411576658642', name: 'Default', mask: '{controller}/{action}/{id}',
                            resolution: [
                                { key: 'controller', value: 'shoppingcart', default: 'home' },
                                { key: 'action', value: 'cartsummary', default: 'index' },
                                { key: 'id', value: null, default: null }
                            ]
                        },
                        { type: 'filter', duration: '0.01', time: '1411576658642', targetClass: 'ShoppingCart', targetMethod: 'OnAuthorization', filterType:'Authorization', filterOrigin: 'system', category: 'Authorization' },
                        { type: 'filter', duration: '0.01', time: '1411576658642', targetClass: 'ShoppingCart', targetMethod: 'OnActionExecuting', filterType:'Action', filterOrigin: 'system', category: 'Executing' },
                        { type: 'action', duration: '4.12', time: '1411576658642', targetClass: 'ShoppingCart', targetMethod: 'CartSummary', physicalFile: 'Controller/ShoppingCartController.cs',
                            binding: [
                                { type: 'int', name: 'userId', value: 213 }
                            ],
                            activities: [
                                { tpye: 'data', duration: '0.21', time: '1411576658644', access: 'Cache', operation: 'Hit', target: 'MenuDataItems', affected: '10'  }
                            ]
                        },
                        { type: 'filter', duration: '0.01', time: '1411576658646', targetClass: 'ShoppingCart', targetMethod: 'OnActionExecuted', filterType:'Action', filterOrigin: 'system', category: 'Executed' },
                        { type: 'filter', duration: '0.01', time: '1411576658646', targetClass: 'ShoppingCart', targetMethod: 'OnResultExecuting', filterType:'Result', filterOrigin: 'system', category: 'Executing' },
                        { type: 'result', duration: '10.74', time: '1411576658646', targetClass: 'ViewResult', targetMethod: 'ExecuteResult', physicalFile: 'View/Store/CartSummary.cshtml', engine: 'Razor' },
                        { type: 'filter', duration: '0.01', time: '1411576658656', targetClass: 'ShoppingCart', targetMethod: 'OnResultExecuted', filterType:'Result', filterOrigin: 'system', category: 'Executed' }

                    { type: 'filter', duration: '0.01', time: '1411576658739', targetClass: 'HomeController', targetMethod: 'OnResultExecuted', filterType:'Result', filterOrigin: 'system', category: 'Executed' }
                ]    
            },
            core_trace: {
                title: 'Trace',
                payload: [
                    { type: 'trace', time: '1411576658503', message: 'Merge result set for store listing' },
                    { type: 'trace', time: '1411576658503', message: 'Found user specific entries' },
                    { type: 'trace', time: '1411576658503', message: 'Apply weighting to menu item position by user', template: {
                            mask: 'Apply weighting to menu item position by {0}',
                            values: {
                                '0': 'User'
                            }
                        }
                    },
                    { type: 'trace', time: '1411576658503', message: 'Sort result by User', template: {
                            mask: 'Sort result by {0}',
                            values: {
                                '0': 'User'
                            }
                        }
                    },
                    { type: 'trace', time: '1411576658503', message: 'Merge result set for store listing', category: 'Error' }
                ]
            }
        };

        return request;
    };
})();

module.exports = {
    generate: generate
};
