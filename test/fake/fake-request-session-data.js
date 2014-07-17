var chance = require('./fake-extension.js'),
    glimpse = require('glimpse'),
    peopleMaster = [ { name: 'Anthony', url: 'https://avatars.githubusercontent.com/u/585619' },
        { name: 'Nik', url: 'https://avatars.githubusercontent.com/u/199026' },
        { name: 'Christophe', url: 'https://avatars.githubusercontent.com/u/1467346' },
        { name: 'Bjorn', url: 'https://avatars.githubusercontent.com/u/1607579' },
        { name: 'Ian', url: 'https://avatars.githubusercontent.com/u/52329?' },
        { name: 'Keith', url: 'https://avatars.githubusercontent.com/u/133987?' },
        { name: 'Aaron', url: 'https://avatars.githubusercontent.com/u/434140?' },
        { name: 'Jeff', url: 'https://avatars.githubusercontent.com/u/683658?' },
        { name: 'Kristian', url: 'https://avatars.githubusercontent.com/u/582487?' },
        { name: 'James', url: 'https://avatars.githubusercontent.com/u/1197383?' } ],
    people = chance.pick(peopleMaster, chance.integerRange(3, peopleMaster.length));

function publishSession() {
    var person = chance.pick(people),
        item = { id: person.name, url: person.url, count: chance.integerRange(1, 30), last: (chance.integerRange(1, 45) + ' sec ago ') };

    glimpse.emit('data.request.session.update', item);

    setTimeout(publishSession, chance.integerRange(250, 3000));
}

publishSession();
