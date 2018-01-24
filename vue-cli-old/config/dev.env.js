/**
 * 定义开发环境变量
 */

// webpack-merge提供链接数据和合并对象来创建新对象的函数
// see:<https://www.npmjs.com/package/webpack-merge>
var merge = require('webpack-merge')
// 引入生产环境变量配置
var prodEnv = require('./prod.env')

// 导出开发环境配置，使用merge方法，相同的属性会被覆盖，因此此处的结果是{NODE_ENV: '"development"'}
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
