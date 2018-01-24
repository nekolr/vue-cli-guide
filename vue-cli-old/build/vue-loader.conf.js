/**
 * css加载器配置
 */

// 引入utils工具
var utils = require('./utils')
// 引入config下的index.js环境变量配置
var config = require('../config')
// 是否是生产环境
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
