/*
* @Author: Rosen
* @Date:   2016-11-20 13:19:28
* @Last Modified by:   zhengquan
* @Last Modified time: 2017-10-11 10:17:59
* 知识点：css单独打包、全局jquery引用、各种loader
*/

const webpack             = require('webpack');
const path                = require('path');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量, dev, (test), online
// var WEBPACK_ENV            = process.env.WEBPACK_ENV || 'dev'; 

// webpack config
module.exports = {
    entry:  './src/app.jsx',
    // path && publickPath
    output: {
        path        : path.resolve(__dirname, 'dist'),
        publicPath  :  '/dist/',
        filename    : 'js/[name].js'
    },
    resolve: {
        alias: {
            util            : path.resolve(__dirname, 'src/util'),
            page            : path.resolve(__dirname, 'src/page')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                           limit: 8192,
                           name: 'resource/[name].[ext]'
                       }
                   }
               ]
           },
           {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                       limit: 8192,
                       name: 'resource/[name].[ext]'
                   }
                   }
               ]
           },
           {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            }
        ]
    },
    plugins: [
        //处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        //打包css文件
        new ExtractTextPlugin("css/[name].css"),
        //提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename:'js/base.js'
        })
    ],
    devServer: {
        port : 8086,
        historyApiFallback : {
            index : '/dist/index.html'
        }
    }
};

