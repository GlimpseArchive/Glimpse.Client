var faker = require('faker'),
    glimpse = require('glimpse'),
    names = [];

function generateNumber(down, up) {
    return Math.floor((Math.random() * up) + down);
}

function generateNames() {
    var range = generateNumber(3, 8);
    for (var i = 0; i < range; i++) {
        names.push(faker.Name.firstName());
    }
}

function publishSession() {
    glimpse.emit('data.request.session.update', { id: faker.random.array_element(names), count: faker.random.number(30), last: (generateNumber(1, 45) + ' sec ago ') });

    setTimeout(publishSession, generateNumber(250, 3000));
}

generateNames();
publishSession();
