var webpack = require('webpack');

module.exports = {
    output: {
        path: __dirname,
        filename: './[name].js',
        chunkFilename: './[id].chunk.js',
        pathinfo: true
    },
    resolve: {
        modulesDirectories: ['bower_components']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.js$/, loader: 'source-map-loader' },
            { test: /react/, loader: 'expose-loader?React' }
        ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
    ],
    devtool: '#source-map'
};
