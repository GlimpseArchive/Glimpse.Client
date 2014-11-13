'use strict';

var gulp = require('gulp');
var argv = require('minimist')(process.argv.slice(2));
var extend = require('extend');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var htmlcompress = require('gulp-minify-html');
var gutil = require('gulp-util');
var gif = require('gulp-if');
// var filelog = require('gulp-filelog');  // NOTE: Used for debug
var runSequence = require('run-sequence');

var settings = {
    index: __dirname + '/src/index.html',
    entry: __dirname + '/src/index.js',
    output: __dirname + '/dist',
    server: __dirname + '/dist'
};

var WATCH = !!argv.watch;
var RELEASE = !!argv.release;
var DEBUG = !!argv.debug;

function getBundleConfig() {
    var config = extend(true, {}, require('./webpack.config'));

    config.entry = settings.entry;
    config.output.path = settings.output;

    if (WATCH) {
        // config.chunkModules = false;
        config.watch = true;
    }

    if (RELEASE) {
        config.plugins = config.plugins.concat(
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.OccurenceOrderPlugin()
        );
    } else {
        config.output.pathinfo = true;
    }

    if (!RELEASE || DEBUG) {
        config.devtool = '#inline-source-map';
    }

    return config;
}

gulp.task('bundle', function (cb) {
    var started = false;
    var config = getBundleConfig();
    function processResult(err, stats) {
        gutil.log('Webpack\n' + stats.toString(config.log));

        if (config.watch) {
            browserSync.reload(settings.entry);
        }

        if (!started) {
            started = true;
            cb();
        }
    }

    var compiler = webpack(config);
    if (config.watch) {
        compiler.watch(200, processResult);
    } else {
        compiler.run(processResult);
    }

});
gulp.task('pages', function () {
    return gulp.src(settings.index)
        .pipe(gif(RELEASE, htmlcompress()))
        .pipe(gulp.dest(settings.output))
        .pipe(gif(WATCH, browserSync.reload({ stream: true })));
});

gulp.task('build', ['pages', 'bundle']);

gulp.task('server', function (cb) {
    browserSync({
        server: {
            baseDir: [settings.server]
        }
    });

    cb();
});

gulp.task('dev', function (cb) {
    WATCH = true;

    runSequence('build', 'server', cb);
});

gulp.task('prod', function (cb) {
    RELEASE = true;
    WATCH = true;

    runSequence('build', 'server', cb);
});

gulp.task('default', ['dev']);
