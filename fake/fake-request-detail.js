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
                trace = function(message, level) {
                    var template = null;
                    if (typeof message === 'object') {
                        template = message;
                        message = template.mask;
                        for (var key in template.values) {
                            message = message.replace('{' + key + '}', template.values[key]);
                        }
                    }

                    var msg = {
                            type: 'trace',
                            message: message
                        };

                    if (template) {
                        msg.template = template;
                    }
                    if (level) {
                        msg.level = level;
                    }

                    return msg;
                },
                process = function(result, context, request) { //mvc, actionTime
                    var childTimings = 0;

                    result.push(route(context.detail.route));
                    result.push(filter(context.detail.controller, 'OnAuthorization', 'Authorization', 'Authorization'));
                    result.push(trace({ mask: 'User {0} authorized to execute this action', values: { '0': request.user.name } }));
                    result.push(filter(context.detail.controller, 'OnActionExecuting', 'Action', 'Executing'));
                    result.push(action(context.detail.controller, context.time, context.detail.binding, context.detail.activities));
                    result.push(filter(context.detail.controller, 'OnActionExecuted', 'Action', 'Executed'));
                    result.push(filter(context.detail.controller, 'OnActionExecuting', 'Result', 'Executing'));

                    var child = context.detail.child;
                    if (child) {
                        var partActionTime = context.time / (child.length * 100 * 2.5),
                            upperParts = child.length * 100,
                            lowerLimits = upperParts * 0.5;

                        for (var i = 0; i < child.length; i++) {
                            var newActionTime = partActionTime * chance.integerRange(lowerLimits, upperParts);

                            childTimings += newActionTime;

                            process(result, { detail: child[i], time: newActionTime }, request);
                        }
                    }

                    // TODO: Shouldn't be done here but anyway
                    var activities = context.detail.activities;
                    if (activities) {
                        var partActivityTime = (context.time - childTimings) / (activities.length * 100 * 1.5),
                            upperParts = activities.length * 100,
                            lowerLimits = upperParts * 0.5;

                        for (var i = 0; i < activities.length; i++) {
                            var newActivityTime = partActivityTime * chance.integerRange(lowerLimits, upperParts);

                            activities[i].duration = newActivityTime.toFixed(2);
                        }
                    }

                    result.push(filter(context.detail.controller, 'OnActionExecuted', 'Result', 'Executed'));
                };

            return function(request) {
                    var result = [];

                    process(result, { detail: request._mvc, time: request.abstract.actionTime }, { user: request.user });

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
            core_generic: {
                title: 'Generic',
                payload: [ {
                        'Actor' : 'Mark Hamill',
                        'Character' : 'Luke Skywalker',
                        'Gender' : 'Male',
                        'Age' : '21'
                    }, {
                        'Character' : 'Darth Vader',
                        'Actor' : 'James Earl Jones',
                        'Gender' : 'Male',
                        'Age' : '45'
                    }, {
                        'Actor' : 'Harrison Ford',
                        'Character' : {
                            'Mark Hamill' : 'Luke Skywalker',
                            'James Earl Jones' : 'Darth Vader',
                            'Harrison Ford' : 'Han Solo'
                        },
                        'Gender' : 'Male',
                        'Age' : '25'
                    }, {
                        'Actor' : 'Carrie Fisher',
                        'Character' : 'Princess Leia Organa',
                        'Gender' : 'Female',
                        'Age' : '21'
                    }, {
                        'Actor' : 'Peter Cushing',
                        'Character' : [ {
                                'Actor' : 'Mark Hamill',
                                'Character' : 'Luke Skywalker',
                                'Gender' : 'Male',
                                'Age' : '21'
                            }, {
                                'Actor' : 'James Earl Jones',
                                'Character' : 'Darth Vader',
                                'Gender' : 'Male',
                                'Age' : '45'
                            }, {
                                'Actor' : 'Harrison Ford',
                                'Character' : 'Han Solo',
                                'Gender' : 'Male',
                                'Age' : '25'
                            }, {
                                'Actor' : 'Carrie Fisher',
                                'Character' : 'Princess Leia Organa',
                                'Gender' : 'Female',
                                'Age' : '21'
                            }, {
                                'Actor' : 'Peter Cushing',
                                'Character' : 'Grand Moff Tarkin',
                                'Gender' : 'Female',
                                'Age' : '69'
                            }, {
                                'Actor' : 'Alec Guinness',
                                'Character' : 'Ben Obi-Wan Kenobi',
                                'Gender' : 'Female',
                                'Age' : '70'
                            }, {
                                'Actor' : 'Anthony Daniels',
                                'Character' : 'C-3PO',
                                'Gender' : 'Droid',
                                'Age' : '101'
                            }, {
                                'Actor' : 'Kenny Baker',
                                'Character' : 'R2-D2',
                                'Gender' : 'Droid',
                                'Age' : '150'
                            } ],
                        'Gender' : 'Female',
                        'Age' : '69'
                    }, {
                        'Actor' : 'Alec Guinness',
                        'Character' : 'Ben Obi-Wan Kenobi',
                        'Gender' : 'Female',
                        'Age' : '70'
                    }, {
                        'Actor' : 'Anthony Daniels',
                        'Character' : 'C-3PO',
                        'Gender' : 'Droid',
                        'Age' : '101'
                    } ]
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
