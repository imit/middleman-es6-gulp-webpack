const path = require('path');

module.exports = {
    entry: './source/dev/js/app.js',
    output: {
        path: path.resolve(__dirname,'source/javascripts'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }
}