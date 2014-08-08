var glimpse = require('glimpse'),
    chance = require('./fake-extension.js'),
    moment = require('moment'),
    fakeRequest = require('./fake-request-entry.js'),
    maxEvents = chance.integerRange(25, 35),
    numLocal = maxEvents * 0.25,
    numRemote = maxEvents * 0.3;

function subtractSeconds(seconds) {
    var date = new Date(),
        value = seconds * 1000;

    return moment(date.setTime(date.getTime() - value)).toISOString();  // new Date(date.setTime(date.getTime() - value)).toString();
}

function generateBatch(num, event, dateTimeOffet) {
    var results = [];

    for (var i = 0; i < num; i++) {
        dateTimeOffet -= chance.integerRange(30, 300);

        var request = fakeRequest.pickRequest();
        request.dateTime = subtractSeconds(dateTimeOffet);

        results.push(request);
    }

    glimpse.emit('data.request.summary.found.' + event, results);
}

function generateLocal() {
    // simulate requests happening more than a day ago
    generateBatch(numLocal, 'local', 25 * 60 * 60);
}

function generateRemote() {
    // simulate requests happeing more than 10 seconds ago
    generateBatch(numRemote, 'remote', 10);
}

function generateStream(position) {
    // TODO: Update so that array occasionally puts out 2 vs the norm of 1 result

    glimpse.emit('data.request.summary.found.stream', [ fakeRequest.pickRequest() ]);

    setTimeout(function() {
        if (position < maxEvents) {
            generateStream(++position);
        }
    }, chance.integerRange(500, 15000));
}

function generate() {
    // simulate messages from local store
    setTimeout(function() {
        generateLocal();
    }, chance.integerRange(50, 100));

    // simulate messages from remote
    setTimeout(function() {
        generateRemote();
    }, chance.integerRange(1000, 1500));

    // simulate messages from stream
    setTimeout(function() {
        generateStream(0);
    }, chance.integerRange(1000, 5000));
}

generate();

/*
    // TODO: Respond after 50 - 100ms
    glimpse.emit('data.request.summary.found.local', dataArray);

    // TODO: Respond after 1000 - 1500ms
    glimpse.emit('data.request.summary.found.remote', dataArray);

    // TODO: Respond in 1000 - 5000ms intervals 500ms in
    glimpse.emit('data.request.summary.found.stream', dataArray);



    // TODO: Implement later
    glimpse.emit('data.request.summary.update', dataItem);
*/
