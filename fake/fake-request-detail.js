/* jshint camelcase: false */
'use strict';

var chance = require('./fake-extension');
var _ = require('lodash');

var store = {
    execution: [],
    log: [],
    data: []
};
var support = {
    log: (function () {
        function processTemplate(template) {
            var message = template.mask;
            for (var key in template.values) {
                message = message.replace('{' + key + '}', template.values[key]);
            }

            return message;
        }

        return function (log) {
            if (log.template) {
                log.message = processTemplate(log.template);
            }

            return log;
        };
    })(),
    childTimings: function (events, availableTime, offset) {
        var usedTime = 0;

        if (events) {
            var timeParts = availableTime / (events.length * 100 * 2.5);
            var upperParts = events.length * 100;
            var lowerParts = upperParts * 0.5;

            for (var i = 0; i < events.length; i++) {
                var newActivityTime = timeParts * chance.integerRange(lowerParts, upperParts);

                events[i].duration = newActivityTime;

                usedTime += newActivityTime;
            }
        }

        return usedTime;
    }
};
var process = {
    activities: function (activities) {
        if (activities) {
            for (var i = 0; i < activities.length; i++) {
                var activity = activities[i];
                activity.type = 'data';
                activity.duration = activity.duration.toFixed(2);
                // activity.time = '1411576658503';
                // activity.offset = 124.12;

                store.data.push(activity);
            }
        }
    },
    logs: function (logs) {
        if (logs) {
            for (var i = 0; i < logs.length; i++) {
                var log = support.log(logs[i]);
                log.type = 'log';
                // log.time = '1411576658503';
                // log.offset = 124.12;

                store.log.push(log);
            }
        }
    },
    route: function (record) {
        var route = {
            type: 'route',
            duration: chance.durationRange(0, 1),
            // time: '1411576658503',
            // offset: 124.12,
            name: record.name,
            mask: record.mask,
            resolution: record.resolution
        };

        store.execution.push(route);
    },
    filter: function (controller, targetMethod, filterType, category, origin, activities, logs) {
        var filter = {
            type: 'filter',
            duration: chance.durationRange(0, 1),
            // time: '1411576658503',
            // offset: 124.12,
            targetClass: controller + 'Controller',
            targetMethod: targetMethod,
            filterType: filterType,
            category: category,
            filterOrigin: origin || 'system'
        };

        store.execution.push(filter);

        process.activities(activities);
        process.logs(logs);
    },
    action: function (controller, actionTime, binding, activities, logs) {
        var action = {
            type: 'action',
            duration: actionTime.toFixed(2),
            // time: '1411576658503',
            // offset: 124.12,
            targetClass: controller + 'Controller',
            targetMethod: 'Index',
            physicalFile: 'Controller/' + controller + 'Controller.cs',
            binding: binding
        };

        store.execution.push(action);

        process.activities(activities);
        process.logs(logs);
    }
};
var core = {
    subActions: function (actions, request) {
        if (actions) {
            for (var i = 0; i < actions.length; i++) {
                core.action(actions[i], request);
            }
        }
    },
    action: function (action, request) {
        var availableTime = action.duration;
        availableTime -= support.childTimings(action.actions, availableTime, 2.5);
        availableTime -= support.childTimings(action.activities, availableTime, 1.5);

        process.route(action.route);
        process.filter(action.controller, 'OnAuthorization', 'Authorization', 'Authorization', null, null, [ { template: { mask: 'User {0} authorized to execute this action', values: { '0': request.user.name } } } ]);
        process.filter(action.controller, 'OnActionExecuting', 'Action', 'Executing');
        process.action(action.controller, action.duration, action.binding, action.activities, action.trace);
        process.filter(action.controller, 'OnActionExecuted', 'Action', 'Executed');
        process.filter(action.controller, 'OnActionExecuting', 'Result', 'Executing');
        core.subActions(action.actions, request);
        process.filter(action.controller, 'OnActionExecuted', 'Result', 'Executed');
    }
};

function setup(summary) {
    var request = _.clone(summary, true);

    // Setup any root data
    request._mvc.duration = request.abstract.actionTime;

    return request;
}

function generate(summary) {
    var request = setup(summary);

    core.action(request._mvc, { user: request.user });

    request.data = {
        core_execution: {
            title: 'Execution',
            payload: store.execution
        },
        core_trace: {
            title: 'Log',
            payload: store.log
        },
        core_data: {
            title: 'Data',
            payload: store.data
        },
        core_generic: {
            title: 'Generic',
            payload: [ {
                    'Actor': 'Mark Hamill',
                    'Character': 'Luke Skywalker',
                    'Gender': 'Male',
                    'Age': '21'
                }, {
                    'Character': 'Darth Vader',
                    'Actor': 'James Earl Jones',
                    'Gender': 'Male',
                    'Age': '45'
                }, {
                    'Actor': 'Harrison Ford',
                    'Character': {
                        'Mark Hamill': 'Luke Skywalker',
                        'James Earl Jones': 'Darth Vader',
                        'Harrison Ford': 'Han Solo'
                    },
                    'Gender': 'Male',
                    'Age': '25'
                }, {
                    'Actor': 'Carrie Fisher',
                    'Character': 'Princess Leia Organa',
                    'Gender': 'Female',
                    'Age': '21'
                }, {
                    'Actor': 'Peter Cushing',
                    'Character': [ {
                            'Actor': 'Mark Hamill',
                            'Character': 'Luke Skywalker',
                            'Gender': 'Male',
                            'Age': '21'
                        }, {
                            'Actor': 'James Earl Jones',
                            'Character': 'Darth Vader',
                            'Gender': 'Male',
                            'Age': '45'
                        }, {
                            'Actor': 'Harrison Ford',
                            'Character': 'Han Solo',
                            'Gender': 'Male',
                            'Age': '25'
                        }, {
                            'Actor': 'Carrie Fisher',
                            'Character': 'Princess Leia Organa',
                            'Gender': 'Female',
                            'Age': '21'
                        }, {
                            'Actor': 'Peter Cushing',
                            'Character': 'Grand Moff Tarkin',
                            'Gender': 'Female',
                            'Age': '69'
                        }, {
                            'Actor': 'Alec Guinness',
                            'Character': 'Ben Obi-Wan Kenobi',
                            'Gender': 'Female',
                            'Age': '70'
                        }, {
                            'Actor': 'Anthony Daniels',
                            'Character': 'C-3PO',
                            'Gender': 'Droid',
                            'Age': '101'
                        }, {
                            'Actor': 'Kenny Baker',
                            'Character': 'R2-D2',
                            'Gender': 'Droid',
                            'Age': '150'
                        } ],
                    'Gender': 'Female',
                    'Age': '69'
                }, {
                    'Actor': 'Alec Guinness',
                    'Character': 'Ben Obi-Wan Kenobi',
                    'Gender': 'Female',
                    'Age': '70'
                }, {
                    'Actor': 'Anthony Daniels',
                    'Character': 'C-3PO',
                    'Gender': 'Droid',
                    'Age': '101'
                } ]
        }
    };

    return request;
}

module.exports = { generate: generate };
