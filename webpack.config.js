var webpack = require('webpack'),
    path = require('path');

module.exports = {
    output: {
        path: __dirname,
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
        })
    ],
    //verbose: true
};
