'use strict';

var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool:'inline-source-map',
    entry: {
            'application': './src/index.js',
            'vendors': [
                'jquery'
            ]
        },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve:{
        extensions:['','.js']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
    postcss: [autoprefixer({browsers: ['last 5 versions']})],
    module:{
        loaders:[
            {
                test:/\.(jade|pug)$/,
                loader:'pug?includeInline=false'
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel',
                query:{
                    presets:['es2015']
                }
            },
            {
                test:/\.html$/,loader:'raw'
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass!')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass!')
            },
            {
              test: /\.styl$/,
              loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus!')
            },
            {
                test: /\.(ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
                loader: ['file?name=[path][name].[ext]']
        }
        ]
    },
    sassLoader: {
            precision: 8
        },
    plugins:[
        // new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('app.css?modules=true!postcss'),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js'),
        new HtmlWebpackPlugin({
          template: './src/index.jade'
        })
        // ,
        // new webpack.optimize.UglifyJsPlugin({
        //     beautify: false, //prod
        //     compress: {
        //         drop_console: true,
        //         warnings: false
        //     },
        //         sourceMap: false,
        //         mangle: false,
        //         comments: false
        // })
    ]
};
