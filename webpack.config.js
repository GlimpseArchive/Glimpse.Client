var webpack = require('webpack'),
    path = require('path');

module.exports = {
    output: {
        path: __dirname,
        filename: './[name].js',
        chunkFilename: './[id].chunk.js',
        pathinfo: true
    },
    resolve: {
        modulesDirectories: ['bower_components'],
		alias: {
			'glimpse': path.resolve(__dirname, './build/glimpse.js'),
            'shell': path.resolve(__dirname, './build/shell'),
            'request': path.resolve(__dirname, './build/request')
		}
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
