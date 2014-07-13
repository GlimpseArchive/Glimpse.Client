'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    tslint = require('gulp-tslint'),
    sasslint = require('gulp-scss-lint'),
    typedoc = require('gulp-typedoc'),
    react = require('gulp-react'),
    typescript = require('gulp-tsc'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    webpack = require('gulp-webpack'),
    //filelog = require('gulp-filelog'),  // NOTE: Used for debug
    //sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    //livereloadEmbed = require('gulp-embedlr'),

    openbrowser = require('open'),
    lazypipe = require('lazypipe'),

    //webpack = require('webpack'),
    //WebpackDevServer = require('webpack-dev-server'),

    config = {
        app: {
            js: [ './src/**/*.js' ],
            ts: [ './src/**/*.ts' ],
            jsx: [ './src/**/*.jsx' ],
            sass: [ './src/**/*.sass', './src/**/*.scss' ],
        },
        build: {
            output: './build',
            content: './build/**/*.*',
            entry: './build/app.js'
        },
        dist: {
            output: './dist'
        },
        lr: {
            port: 7000,
            embed: false
        },
        server: {
            port: 8080,
            dir: './dist'
        }
    },

    onError = function(err) {
        gutil.beep();
        gutil.log(gutil.colors.underline(gutil.colors.red('ERROR:')) +
            ' ' + gutil.colors.cyan(err.plugin) + ' - ' + err.message);
    },
    plumberDefault = lazypipe()
        .pipe(plumber, { errorHandler: onError }),

    jsFiles = function() {
        return gulp.src(config.app.js);
    },
    jshintTask = lazypipe()
        .pipe(jshint)
        .pipe(jshint.reporter, 'jshint-stylish'),
    jscsTask = lazypipe()
        .pipe(jscs),
    jslintTask = lazypipe()
        .pipe(jshintTask)
        .pipe(jscsTask),
    jscompileTask = lazypipe()
        .pipe(jslintTask)
        .pipe(gulp.dest, config.build.output),

    tsFiles = function() {
        return gulp.src(config.app.ts);
    },
    tslintTask = lazypipe()
        .pipe(tslint)
        .pipe(tslint.report, 'verbose'),
    tscompileTask = lazypipe()
        //.pipe(tslintTask)
        .pipe(typescript, { sourcemap: true })  // NOTE: sourcemap not currently supported
        .pipe(gulp.dest, config.build.output),

    // NOTE: jsxlint just compiles the jsx and then runs jshint anyway,
    jsxFiles = function() {
        return gulp.src(config.app.jsx);
    },
    jsxlintTask = lazypipe()
        .pipe(react)
        .pipe(jslintTask),
    jsxcompileTask = lazypipe()
        //.pipe(sourcemaps.init)            // NOTE: SourceMaps not currently supported
        .pipe(react, { sourceMap: true })
        //.pipe(sourcemaps.write, './')
        .pipe(jslintTask)
        .pipe(gulp.dest, config.build.output),

    sassFiles = function() {
        return gulp.src(config.app.sass);
    },
    sasslintTask = lazypipe()
        .pipe(sasslint),
    sasscompileTask = lazypipe()
        //.pipe(sass, {sourceComments: 'map'})
        .pipe(sass, { includePaths: [ './bower_components/bootstrap-sass-official/assets/stylesheets/' ] })
        .pipe(autoprefixer, [ 'last 2 version' ])
        .pipe(gulp.dest, config.build.output),

    buildentryFiles = function() {
        return gulp.src(config.build.entry);
    },
    packTask = lazypipe()
        .pipe(webpack, require('./webpack.config.js'))
        .pipe(gulp.dest, config.dist.output);

gulp.task('jshint', function() {
    return jsFiles().pipe(jshintTask());
});
gulp.task('jscs', function() {
    return jsFiles().pipe(jscsTask());
});
gulp.task('jslint', function() {
    return jsFiles().pipe(jslintTask());
});
gulp.task('tslint', function() {
    return tsFiles().pipe(tslintTask());
});
gulp.task('jsxlint', function() {
    return jsxFiles().pipe(jsxlintTask());
});
gulp.task('sasslint', function() {
    return sassFiles().pipe(sasslintTask()); // TODO: Need to get to work
});
gulp.task('lint', [ 'jslint', 'jsxlint', 'tslint'/*, 'sasslint'*/ ]);

gulp.task('jscompile', function() {
    return jsFiles().pipe(jscompileTask());
});
gulp.task('tscompile', function() {
    return tsFiles().pipe(tscompileTask());
});
gulp.task('jsxcompile', function() {
    return jsxFiles().pipe(jsxcompileTask());
});
gulp.task('sasscompile', function() {
    return sassFiles().pipe(sasscompileTask());
});
gulp.task('compile', [ 'jscompile', 'jsxcompile', 'tscompile', 'sasscompile' ]);

gulp.task('compile', [ 'jscompile', 'jsxcompile', 'tscompile' ]);

gulp.task('pack', function() {
    return buildentryFiles().pipe(packTask());
});

gulp.task('build', function(cb) {
    runSequence('compile', 'pack', function() { cb(); });
});

gulp.task('tsdocs', function() {
    return gulp
        .src(config.app.ts)
        .pipe(typedoc({
            module: 'commonjs',
            out: './docs',
            name: 'Glimpse Client',
            target: 'es5'
        }));
});

gulp.task('docs', [ 'tsdocs' ]);

gulp.task('srcwatch', function() {
    watch({ glob: config.app.js, emitOnGlob: false, name: 'WATCH: JavaScript on "' + config.app.js + '"' }, function(files) {
        return files
            .pipe(plumberDefault())
            .pipe(jscompileTask());
    });

    watch({ glob: config.app.ts, emitOnGlob: false, name: 'WATCH: TypeScript on "' + config.app.ts + '"' }, function(files) {
        return files
            .pipe(plumberDefault())
            .pipe(tscompileTask());
    });

    watch({ glob: config.app.jsx, emitOnGlob: false, name: 'WATCH: React on "' + config.app.jsx + '"' }, function(files) {
        return files
            .pipe(plumberDefault())
            .pipe(jsxcompileTask());
    });

    watch({ glob: config.app.sass, emitOnGlob: false, name: 'WATCH: React on "' + config.app.sass + '"' }, function(files) {
        return files
            .pipe(plumberDefault())
            .pipe(sasscompileTask());
    });
});
gulp.task('buildwatch', function() {
    watch({ glob: config.build.content, emitOnGlob: false, name: 'WATCH: WebPack on "' + config.build.content + '"' }, function() {
        gulp.start('pack') // NOTE: Triggering task as we want to run whole task
            .on('task_stop', function() {
                if (config.lr.embed) {
                    console.log('TEST TEST TEST');
                }
            });
    });
});
gulp.task('watch', [ 'srcwatch', 'buildwatch' ]);

gulp.task('server', function(cb) {
    var stat = require('node-static'),
        server = new stat.Server(config.server.dir),
        port = config.server.port;

    gutil.log('Starting Server');

    require('http').createServer(function(request, response) {
        request.addListener('end', function() {
            server.serve(request, response);
        }).resume();
    }).listen(port, function() {
        gutil.log('Started Server on port: ' + gutil.colors.red(port));
        cb();
    });
});

gulp.task('open', function() {
    var port = config.server.port;

    gutil.log('Opening browser using port: ' + gutil.colors.red(port));
    openbrowser('http://localhost:' + port);
});

gulp.task('dev', function(cb) {
    runSequence('build', 'watch', 'server', 'open', function() { cb(); });
});

gulp.task('default', [ 'dev' ]);  // NOTE: might change in the future
