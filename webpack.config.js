var webpack = require('webpack'),
    path = require('path');
    // TODO: At some point factor this better
    progressPlugin = (function() {
        var chars = 0, lastState, lastStateTime;

        return new webpack.ProgressPlugin(function(percentage, msg) {
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
        modulesDirectories: ['node_modules', 'bower_components'],
        alias: {
            'glimpse': path.resolve(__dirname, './src/glimpse.js'),
            'shell': path.resolve(__dirname, './src/shell'),
            'request': path.resolve(__dirname, './src/request'),
            'fake': path.resolve(__dirname, './fake/fake.js'),
            'diagnostics': path.resolve(__dirname, './diagnostics/diagnostics.js'),
            'postal': 'postal.js',
            'react': path.resolve(__dirname, './bower_components/react/react-with-addons.js'),
            'moment': path.resolve(__dirname, './bower_components/moment/min/moment.min.js'),
            'lib': path.resolve(__dirname, './src/lib/'),
         }
     },
    module: {
        loaders: [
            { test: /react/, loader: 'expose-loader?React' },
            { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?includePaths[]=' + (path.resolve(__dirname, './bower_components/bootstrap-sass-official/assets/stylesheets/')) },
            { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM' }
        ],
        preLoaders: [
            //{ test: /\.js$/, loader: 'jshint-loader', exclude: /node_modules|bower_components/ }
        ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
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
    //verbose: true
};
