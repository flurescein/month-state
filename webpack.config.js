const path            = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'src/js/main.js'),
    module: {
        rules: [{
            test: /\.(sass|scss)$/,
            exclude: [/node_modules/],
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Month State',
            filename: 'index.html',
            template: 'src/templates/index.html'
        })
    ],
    mode: 'production',
    devServer: {
        contentBase: path.resolve(__dirname, 'docs')
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'month-state.js'
    }
}
