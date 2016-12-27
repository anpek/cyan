module.exports = {
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/, loader: 'ts-loader'
            }
        ]
    },
    plugins: [
    ]
}