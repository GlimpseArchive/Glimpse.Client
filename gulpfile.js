var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    htmlcompress = require('gulp-minify-html'),
    livereloadembed = require('gulp-embedlr'),
    livereload = require('gulp-livereload'),
    gutil = require('gulp-util'),
    //filelog = require('gulp-filelog'),  // NOTE: Used for debug
    runSequence = require('run-sequence'),
    extend = require('extend'),
    openbrowser = require('open'),

    settings = {
        index: './src/index.html',
        entry: './src/index.js',
        output: './dist',
        server: './dist',
        port: 8080
    },

    webpackAction = function(modifyConfig) {
        var config = require('./webpack.config.js');

        if (modifyConfig) {
            config = extend(true, {}, config);
            config = modifyConfig(config);
        }

        return gulp.src(settings.entry)
            .pipe(webpack(config))
            .pipe(gulp.dest(settings.output));
    },
    defaultSetup = function(config) {
        // Build settings to include source maps and pathinfo
        config.devtool = '#inline-source-map';
        config.output.pathinfo = true;

        return config;
    },
    watchSetup = function(config) {
        config = defaultSetup(config);

        // Dev settings to turn on watch
        config.watch = true;

        return config;
    },
    prodSetup = function(config) {
        var webpack = require('webpack');

        // Dev settings to turn on watch
        config.plugins = config.plugins.concat(
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.OccurenceOrderPlugin()
        );

        return config;
    };

gulp.task('build', [ 'build-html' ], function() {
    return webpackAction(defaultSetup);
});
gulp.task('build-watch', [ 'build-html' ], function() {
    console.log('WARNING!!!!! This task does not currently work correctly');
    return webpackAction(watchSetup)
        .pipe(livereload({ auto: false }));
});
gulp.task('build-prod', [ 'build-html' ], function() {
    return webpackAction(prodSetup);
});
gulp.task('build-html', function() {
    return gulp.src(settings.index)
        .pipe(livereloadembed())
        .pipe(htmlcompress())
        .pipe(gulp.dest(settings.output));
});

gulp.task('open', function(cb) {
    var port = settings.port;

    gutil.log('Opening browser using port: ' + gutil.colors.red(port));
    openbrowser('http://localhost:' + port, function() { cb(); });
});

gulp.task('server', function(cb) {
    var stat = require('node-static'),
        server = new stat.Server(settings.server, { cache: false }),
        port = settings.port;

    gutil.log('Starting Server');

    livereload.listen();

    require('http').createServer(function(request, response) {
        request.addListener('end', function() {
            server.serve(request, response);
        }).resume();
    }).listen(port, function() {
        gutil.log('Started Server on port: ' + gutil.colors.red(port));
        cb();
    });
});

gulp.task('dev', function(cb) {
    runSequence('server', 'open', 'build-watch', function() { cb(); });
});

gulp.task('prod', [ 'build', 'build-prod' ]);

gulp.task('default', [ 'dev' ]);
