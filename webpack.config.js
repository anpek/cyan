module.exports = {
    entry: './built/src/index.js',
    output: {
        filename: 'index.js',
        path: './dist'
    },
    // module: {
    //     loaders: [
    //         {
    //             test: /\.ts$/,
    //             exclude: /(node_modules|bower_components)/,
    //             loader: 'babel-loader',
    //             query: {
    //                 presets: ['es2015']
    //             }
    //         }
    //     ]
    // },
    plugins: [
    ]
}