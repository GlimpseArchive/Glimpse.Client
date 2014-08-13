var chance = require('./fake-extension.js'),
    fakeSession = require('./fake-request-user.js'),
    moment = require('moment');

var generate = (function() {
    return function(dateTime) {
        var mvcAction = chance.mvcAction(),
            httpStatus = chance.httpStatus(),
            networkTime = chance.integerRange(0, 15),
            serverLowerTime = chance.integerRange(5, 10),
            serverUpperTime = chance.integerRange(60, 100),
            serverTime = chance.integerRange(serverLowerTime, serverUpperTime), // TODO: Bug with these two lines
            actionTime = chance.integerRange(serverLowerTime - 1, serverTime), // TODO: Need to verify that this works
            viewTime = serverTime - actionTime,
            clientTime = chance.integerRange(20, 120),
            queryTime = chance.integerRange(2, Math.max(actionTime / 3, 3));

            function pickUser() {
                return fakeSession.pickUser();
            }

            function pickSummary() {
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
                id: chance.guid(),
                uri: mvcAction.url,
                dateTime: dateTime || moment().toISOString(),
                duration: clientTime + serverTime + networkTime,
                method: chance.httpMethod(),
                contentType: chance.httpContentType(),
                statusCode: httpStatus.code,
                statusText: httpStatus.text,
                user: pickUser(),
                summary: pickSummary()
            };

        return request;
    };
})();

module.exports = {
    generate: generate
};
