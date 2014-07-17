var chance = require('./fake-extension.js'),
    glimpse = require('glimpse');

function publishEntry() {
    var mvc = chance.mvc(),

        serverLowerTime = chance.integerRange(5, 10),
        serverUpperTime = chance.integerRange(60, 100),

        networkTime = chance.integerRange(0, 15),
        clientTime = chance.integerRange(20, 120),
        serverTime = chance.integerRange(serverLowerTime, serverUpperTime),
        actionTime = chance.integerRange(serverLowerTime, serverUpperTime),
        viewTime = serverTime - actionTime,
        queryTime = chance.integerRange(2, actionTime / 3),

        item = {
            id: chance.guid(),
            url: mvc.url,
            method: chance.method(),
            status: chance.status(),
            duration: clientTime + serverTime + networkTime,
            networkTime: networkTime,
            serverTime: serverTime,
            clientTime: clientTime,
            controller: mvc.controller,
            action: mvc.action,
            actionTime: actionTime,
            viewTime: viewTime,
            queryTime: queryTime,
            queryCount: chance.integerRange(1, 4),
            last: (chance.integerRange(1, 45) + ' sec ago ')
        };

    glimpse.emit('data.request.entry.updated', item);

    setTimeout(publishEntry, chance.integerRange(3000, 5000));
}

publishEntry();
