var webpack = require('webpack');
var path = require('path');

var INDEX_DIR = path.resolve(__dirname, 'index');
var BUILD_DIR = path.resolve(__dirname, 'webpack');
var REACT_DIR = path.resolve(__dirname, 'react');

var config = {
    entry: {
        "app.js": INDEX_DIR + '/app.jsx',
        "routes.js": INDEX_DIR + '/routes.jsx',
        "StandUpTimerStyle.css": INDEX_DIR + '/StandUpTimerStyle.css'
    },
    output: {
        path: BUILD_DIR,
        filename: "[name]"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [INDEX_DIR, REACT_DIR],
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
};

module.exports = config;
