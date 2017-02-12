var webpack = require('webpack');
var path = require('path');

var INDEX_DIR = path.resolve(__dirname, 'index');
var BUILD_DIR = path.resolve(__dirname, 'webpack');
var REACT_DIR = path.resolve(__dirname, 'react');

var config = {
    entry: {
        app: INDEX_DIR + '/app.jsx',
        routes: INDEX_DIR + '/routes.jsx',
        AwesomeComponent: REACT_DIR + '/components/' + 'AwesomeComponent.jsx',
        Root: REACT_DIR + '/components/' + 'Root.jsx',
        NotFound: REACT_DIR + '/components/' + 'NotFound.jsx'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            include: [INDEX_DIR, REACT_DIR],
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};

module.exports = config;
