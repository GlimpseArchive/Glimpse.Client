var chance = require('./fake-extension.js'),
    glimpse = require('glimpse'),
    peopleMaster = [ { id: chance.guid(), name: 'Anthony', url: 'https://avatars.githubusercontent.com/u/585619' },
        { id: chance.guid(), name: 'Nik', url: 'https://avatars.githubusercontent.com/u/199026' },
        { id: chance.guid(), name: 'Christophe', url: 'https://avatars.githubusercontent.com/u/1467346' },
        { id: chance.guid(), name: 'Bjorn', url: 'https://avatars.githubusercontent.com/u/1607579' },
        { id: chance.guid(), name: 'Ian', url: 'https://avatars.githubusercontent.com/u/52329?' },
        { id: chance.guid(), name: 'Keith', url: 'https://avatars.githubusercontent.com/u/133987?' },
        { id: chance.guid(), name: 'Aaron', url: 'https://avatars.githubusercontent.com/u/434140?' },
        { id: chance.guid(), name: 'Jeff', url: 'https://avatars.githubusercontent.com/u/683658?' },
        { id: chance.guid(), name: 'Kristian', url: 'https://avatars.githubusercontent.com/u/582487?' },
        { id: chance.guid(), name: 'James', url: 'https://avatars.githubusercontent.com/u/1197383?' } ],
    people = chance.pick(peopleMaster, chance.integerRange(3, peopleMaster.length));

function publishSession() {
    var person = chance.pick(people);
    person.online = chance.bool({ likelihood : person.online ? 75 : 25 });

    var item = {
        id: person.id,
        title: person.name,
        url: person.url,
        online: person.online,
        last: ''
    };
    // TODO: Once we switch over to auto online offline this wont be needed
    if (item.online) {
        person.last = (chance.integerRange(1, 45) + ' sec ago');
        item.request = { id: chance.guid(), url: chance.path() };
    }
    item.last = person.last;

    glimpse.emit('data.request.session.update', item);

    setTimeout(publishSession, chance.integerRange(250, 3000));
}

publishSession();
