var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, '..'),
    entry: './src/cyan.tsx',
    output: {
        filename: 'index.js',
        path: './dist',
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js']
    },
    externals: { 
        "snabbdom": "snabbdom"
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/, loader: 'ts-loader'
            }
        ]
    }
}