var chance = require('./fake-extension.js'),
    glimpse = require('glimpse'),
    names = [];

function generateNames() {
    var range = chance.integerRange(3, 8);
    for (var i = 0; i < range; i++) {
        names.push(chance.first());
    }
}

function publishSession() {
    var item = { id: chance.pick(names), count: chance.integer(30), last: (chance.integerRange(1, 45) + ' sec ago ') };

    glimpse.emit('data.request.session.update', item);

    setTimeout(publishSession, chance.integerRange(250, 3000));
}

generateNames();
publishSession();
