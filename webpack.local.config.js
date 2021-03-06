var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.entry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './assets/js/index' // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
]

// override django's STATIC_RUL for webpack bundles
config.output.publicPath = 'http://localhost:3000/assets/bundles'

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'})
])

config.module.loaders.push(
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: ['react-hot-loader', 'babel-loader']
      } // to transform JSX into JS
)

module.exports = config