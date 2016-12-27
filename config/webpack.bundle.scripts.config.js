var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, '..'),
    entry: './scripts/index.js',
    target: 'node',
    output: {
        filename: 'scripts.js',
        path: './dist'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('#!/usr/bin/env node', {raw: true, entryOnly: true})
    ]
}