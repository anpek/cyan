var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, '..'),
    entry: './src/cyan.tsx',
    output: {
        filename: '[name].js',
        path: './dist'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/, loader: 'ts-loader'
            }
        ]
    }
}