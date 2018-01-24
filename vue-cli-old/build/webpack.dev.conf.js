/**
 * webpack开发环境配置
 */

// 引入utils工具
var utils = require('./utils')
var webpack = require('webpack')
// 引入config下的index.js环境变量配置
var config = require('../config')
var merge = require('webpack-merge')
// 引入webpack基本配置
var baseWebpackConfig = require('./webpack.base.conf')

var HtmlWebpackPlugin = require('html-webpack-plugin')
// 更加友好的输出webpack的错误、警告信息
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 将 hot-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

/**
 * 类似于继承的方式，将下面的配置与webpack基本配置合并
 */
module.exports = merge(baseWebpackConfig, {
  module: {
    // 开发环境下，单独的css不生成sourceMap
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // 选择是否生成，以及如何生成source Map
  // see:<http://www.css88.com/doc/webpack2/configuration/devtool/>
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // 通过插件修改定义的变量
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // 热加载，生成环境中不要使用
    // see:<https://github.com/glenjamin/webpack-hot-middleware#installation--usage>
    new webpack.HotModuleReplacementPlugin(),
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    // see:<https://doc.webpack-china.org/plugins/no-emit-on-errors-plugin>
    new webpack.NoEmitOnErrorsPlugin(),
    // html文件生成插件
    // see:<https://github.com/ampedandwired/html-webpack-plugin>
    new HtmlWebpackPlugin({
      // filename即生成的文件名
      filename: 'index.html',
      // template即使用的模板名
      template: 'index.html',
      // 让打包生成的html文件中css和js就默认添加到html里面，css就添加到head里面，js就添加到body里面
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
