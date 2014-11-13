'use strict';

var webpack = require('webpack');
var path = require('path');

// TODO: At some point factor this better
var progressPlugin = (function () {
    var chars = 0;
    var lastState;
    var lastStateTime;

    return new webpack.ProgressPlugin(function (percentage, msg) {
        var state = msg;
        if (percentage < 1) {
            percentage = Math.floor(percentage * 100);
            msg = percentage + '% ' + msg;
            if (percentage < 100) {
                msg = ' ' + msg;
            }
            if (percentage < 10) {
                msg = ' ' + msg;
            }
        }
        if (percentage > 0) {
            for (; chars > msg.length; chars--) {
                process.stderr.write('\b \b');
            }
            chars = msg.length;
            for (var i = 0; i < chars; i++) {
                process.stderr.write('\b');
            }
            process.stderr.write(msg);
        }
    });
})();

module.exports = {
    entry: 'NOT SET HERE',
    output: {
        path: 'NOT SET HERE',
        filename: './[name].js',
        chunkFilename: './[id].chunk.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules'],
        alias: {
            'glimpse': path.resolve(__dirname, './src/glimpse.js'),
            'shell': path.resolve(__dirname, './src/shell'),
            'request': path.resolve(__dirname, './src/request'),
            'fake': path.resolve(__dirname, './fake/fake.js'),
            'diagnostics': path.resolve(__dirname, './diagnostics/diagnostics.js'),
            'react': require.resolve('react/addons'),
            'lib': path.resolve(__dirname, './src/lib/')
         }
     },
    module: {
        loaders: [
            { test: /react/, loader: 'expose-loader?React' },
            { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?includePaths[]=' + (path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets/')) },
            { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            DIAGNOSTICS: true,
            FAKE_SERVER: true
        }),
        progressPlugin
    ],
    log: {
        colors: true,
        hash: true,
        timings: true,
        assets: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: true,
        cached: true
    }
    // verbose: true
};
