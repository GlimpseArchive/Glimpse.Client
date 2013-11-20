var fs = require('fs');
var path = require('path');

var outputDir = path.join(__dirname, 'build');
var outputFile = path.join(outputDir, 'glimpse.js');
var sourceDir = path.join(__dirname, 'source');

var buildManifest = path.join(sourceDir, '_build.js');

var regex = /\/\*\(import:\S*\)\*\//g;

var process = function (data) {
    return data.replace(regex, function (match) {
        var matchIdentifier = match.substring(10, match.length - 3);
        var matchFileName = matchIdentifier;
        var tabIndex = 0;

        if (matchFileName.indexOf('|') > -1) {
            tabIndex = matchFileName.substring(matchFileName.indexOf('|') + 1, matchFileName.length - matchFileName.indexOf('|') - 1) * 1;
            matchFileName = matchFileName.substring(0, matchFileName.indexOf('|'));
        }

        var tabs = '';
        for (var i = 0; i < tabIndex; i++) {
            tabs += '    ';
        }

        var matchContent = '';
        matchContent = process(fs.readFileSync(path.join(sourceDir, matchFileName), 'UTF-8'));

        if (/(.htm|.css)/g.test(matchFileName)) {
            matchContent = matchContent.replace(/[\r|\n|\r\n|\t]/gi, '');
            matchContent = matchContent.replace(/\s{2,}/gi, '');
        }

        if (tabIndex > 0)
            matchContent = tabs + matchContent.replace(/\n/, '\n' + tabs);

        return matchContent;
    });
};

fs.readFile(buildManifest, 'UTF-8', function (err, data) {
    if (err) {
        throw err;
    }

    data = process(data);

    fs.exists(outputDir, function (exists) {
        if (!exists) {
            fs.mkdirSync(outputDir);
        }

        fs.exists(outputFile, function (exists) {
            if (exists) {
                fs.unlinkSync(outputFile);
            }

            fs.writeFile(outputFile, data, function (err) {
                if (err) {
                    throw err;
                }

                console.log('Glimpse has been generated at ' + outputFile);
            });
        });
    });
});