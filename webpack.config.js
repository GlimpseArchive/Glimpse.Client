var webpack = require('webpack');

module.exports = {
    output: {
        path: __dirname,
        filename: './[name].js',
        chunkFilename: './[id].chunk.js'
    },
    resolve: {
        modulesDirectories: ['bower_components']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
    ],
    devtool: '#source-map'
};
