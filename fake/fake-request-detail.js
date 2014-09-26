var chance = require('./fake-extension.js'),
    _ = require('lodash');

var generate = (function() {

    var tab = {
        execution: (function() {
            var route = function(route) {
                    return {
                        type: 'route',
                        duration: chance.durationRange(0, 1),
                        //time: '1411576658503',
                        name: route.name,
                        mask: route.mask,
                        resolution: route.resolution
                    };
                },
                filter = function(controller, targetMethod, filterType, category, origin) {
                    return {
                            type: 'filter',
                            duration: chance.durationRange(0, 1),
                            //time: '1411576658503',
                            targetClass: controller + 'Controller',
                            targetMethod: targetMethod,
                            filterType: filterType,
                            category: category,
                            filterOrigin: origin || 'system'
                        };
                },
                action = function(controller, actionTime, binding, activities) {
                    return {
                            type: 'action',
                            duration: actionTime.toFixed(2),
                            //time: '1411576658503',
                            targetClass: controller + 'Controller',
                            targetMethod: 'Index',
                            physicalFile: 'Controller/' + controller + 'Controller.cs',
                            binding: binding,
                            activities: activities
                        };
                },
                process = function(result, mvc, actionTime) {
                    var childTimings = 0;
                    result.push(route(mvc.route));
                    result.push(filter(mvc.controller, 'OnAuthorization', 'Authorization', 'Authorization'));
                    result.push(filter(mvc.controller, 'OnActionExecuting', 'Action', 'Executing'));
                    result.push(action(mvc.controller, actionTime, mvc.binding, mvc.activities));
                    result.push(filter(mvc.controller, 'OnActionExecuted', 'Action', 'Executed'));
                    result.push(filter(mvc.controller, 'OnActionExecuting', 'Result', 'Executing'));

                    if (mvc.child) {
                        var partActionTime = actionTime / (mvc.child.length * 100 * 2.5),
                            upperParts = mvc.child.length * 100,
                            lowerLimits = upperParts * 0.5;

                        for (var i = 0; i < mvc.child.length; i++) {
                            var newActionTime = partActionTime * chance.integerRange(lowerLimits, upperParts);

                            childTimings += newActionTime;

                            process(result, mvc.child[i], newActionTime);
                        }
                    }

                    // TODO: Shouldn't be done here but anyway
                    if (mvc.activities) {
                        var partActivityTime = (actionTime - childTimings) / (mvc.activities.length * 100 * 1.5),
                            upperParts = mvc.activities.length * 100,
                            lowerLimits = upperParts * 0.5;

                        for (var i = 0; i < mvc.activities.length; i++) {
                            var newActivityTime = partActivityTime * chance.integerRange(lowerLimits, upperParts);

                            mvc.activities[i].duration = newActivityTime.toFixed(2);
                        }
                    }

                    result.push(filter(mvc.controller, 'OnActionExecuted', 'Result', 'Executed'));
                };

            return function(request) {
                    var result = [];

                    process(result, request._mvc, request.abstract.actionTime);

                    return result;
                };
        })()
    };


    return function(summary) {
        var request = _.clone(summary, true);

        //TODO: Fill out object
        request.data = {
            core_execution: {
                title: 'Execution',
                payload: tab.execution(request)
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
