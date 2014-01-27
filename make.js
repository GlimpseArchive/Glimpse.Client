var fs = require('fs');
var path = require('path');

var regex = /\/\*\(import:\S*\)\*\//g;

var process = function (data, dir) {
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
            matchContent = process(fs.readFileSync(path.join(dir, matchFileName), 'UTF-8'), dir);

            if (/(.htm|.css)/g.test(matchFileName)) {
                matchContent = matchContent.replace(/[\r|\n|\r\n|\t]/gi, '');
                matchContent = matchContent.replace(/\s{2,}/gi, '');
            }

            if (tabIndex > 0)
                matchContent = tabs + matchContent.replace(/\n/, '\n' + tabs);

            return matchContent;
        });
    },
    output = function(manifest, sourceDir, outputDir, outputFile) {
        fs.readFile(manifest, 'UTF-8', function(err, data) {
            if (err) {
                throw err;
            }

            data = process(data, sourceDir);

            fs.exists(outputDir, function(exists) {
                if (!exists) {
                    fs.mkdirSync(outputDir);
                }

                fs.exists(outputFile, function(exists) {
                    if (exists) {
                        fs.unlinkSync(outputFile);
                    }
                    
                    fs.writeFile(outputFile, data, function (err) {
                        if (err) {
                            throw err;
                        }

                        console.log('File has been generated at ' + outputFile);
                    });
                });
            });
        });
    };

var outputDir = path.join(__dirname, 'build'); 
var sourceDir = path.join(__dirname, 'source'); 

var coreManifest = path.join(sourceDir, '_build.js');
var coreOutputFile = path.join(outputDir, 'glimpse.js'); 
output(coreManifest, sourceDir, outputDir, coreOutputFile);
  
var corePreManifest = path.join(sourceDir, '_buildPre.js');
var corePreOutputFile = path.join(outputDir, 'glimpsePre.js'); 
output(corePreManifest, sourceDir, outputDir, corePreOutputFile);

var testSourceDir = path.join(__dirname, 'test', 'mock');
var testManifest = path.join(testSourceDir, 'test.glimpse.ajax.js');
var testOutputFile = path.join(outputDir, 'glimpseTest.js'); 
output(testManifest, testSourceDir, outputDir, testOutputFile);