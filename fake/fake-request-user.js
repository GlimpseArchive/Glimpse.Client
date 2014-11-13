'use strict';

var extend = require('extend');
var chance = require('./fake-extension');

var usersAll = [
    { id: chance.guid(), name: 'Anthony', avatarUrl: 'https://avatars.githubusercontent.com/u/585619' },
    { id: chance.guid(), name: 'Nik', avatarUrl: 'https://avatars.githubusercontent.com/u/199026' },
    { id: chance.guid(), name: 'Christophe', avatarUrl: 'https://avatars.githubusercontent.com/u/1467346' },
    { id: chance.guid(), name: 'Bjorn', avatarUrl: 'https://avatars.githubusercontent.com/u/1607579' },
    { id: chance.guid(), name: 'Ian', avatarUrl: 'https://avatars.githubusercontent.com/u/52329?' },
    { id: chance.guid(), name: 'Keith', avatarUrl: 'https://avatars.githubusercontent.com/u/133987?' },
    { id: chance.guid(), name: 'Aaron', avatarUrl: 'https://avatars.githubusercontent.com/u/434140?' },
    { id: chance.guid(), name: 'Jeff', avatarUrl: 'https://avatars.githubusercontent.com/u/683658?' },
    { id: chance.guid(), name: 'Kristian', avatarUrl: 'https://avatars.githubusercontent.com/u/582487?' },
    { id: chance.guid(), name: 'James', avatarUrl: 'https://avatars.githubusercontent.com/u/1197383?' }
];
var usersCurrent = chance.pick(usersAll, chance.integerRange(3, usersAll.length));

module.exports = {
    pickUser: function () {
        var user = chance.pick(usersCurrent);

        return extend(true, {}, user);
    }
};
