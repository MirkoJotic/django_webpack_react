var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

// where to compile main js file
config.output.path = require('path').resolve('./assets/dist')

config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats-prod.json'}),

    // define ENV as PROD
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    // keeps hashes consistent between compilations
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
])

config.module.loaders.push(
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: ['react-hot-loader', 'babel-loader']
      } // to transform JSX into JS
)

module.exports = config