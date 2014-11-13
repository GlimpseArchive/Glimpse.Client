'use strict';

var chance = require('./fake-extension');
var fakeSession = require('./fake-request-user');
var moment = require('moment');

function generate(dateTime) {
    var mvcAction = chance.mvcAction();
    var httpStatus = chance.httpStatus();
    var networkTime = chance.integerRange(0, 15);
    var serverLowerTime = chance.integerRange(5, 10);
    var serverUpperTime = chance.integerRange(60, 100);
    var serverTime = chance.integerRange(serverLowerTime, serverUpperTime); // TODO: Bug with these two lines
    var actionTime = chance.integerRange(serverLowerTime - 1, serverTime); // TODO: Need to verify that this works
    var viewTime = serverTime - actionTime;
    var clientTime = chance.integerRange(20, 120);
    var queryTime = chance.integerRange(2, Math.max(actionTime / 3, 3));

    function pickUser() {
        return fakeSession.pickUser();
    }

    function pickAbstract() {
        return {
            networkTime: networkTime,
            serverTime: serverTime,
            clientTime: clientTime,
            controller: mvcAction.controller,
            action: mvcAction.action,
            actionTime: actionTime,
            viewTime: viewTime,
            queryTime: queryTime,
            queryCount: chance.integerRange(1, 4)
        };
    }

    var request =  {
        _mvc: mvcAction,
        id: chance.guid(),
        uri: mvcAction.url,
        dateTime: dateTime || moment().toISOString(),
        duration: clientTime + serverTime + networkTime,
        method: chance.httpMethod(),
        contentType: chance.httpContentType(),
        statusCode: httpStatus.code,
        statusText: httpStatus.text,
        user: pickUser(),
        abstract: pickAbstract()
    };

    return request;
}

module.exports = {
    generate: generate
};
