var Chance = require('chance'),
    chance = new Chance();

chance.mixin({
    'integerRange': function(min, max) {
        return chance.integer({ min: min, max: max });
    },
    'dateRange': function(min, max) {
        var time = new Date().getTime(),
            difference = chance.integerRange(min, max),
            newTime = new Date(time + difference);

        return newTime;
    }
});
