/**
 * 本地服务器配置
 */

// 检测Node.js和npm版本
require('./check-versions')()

// 引入config目录下的index.js环境变量配置
var config = require('../config')

// process是Node.js环境中的全局变量，提供控制当前进程的相关信息，对于Node.js应用来说始终可用
// see:<http://nodejs.cn/api/process.html>
if (!process.env.NODE_ENV) {
  // 在没有该变量时从config.dev.env中获取
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 可以打开网站、文件、可执行文件的模块
// see:<https://www.npmjs.com/package/opn>
var opn = require('opn')

// Node.js内置Path模块
// see:<http://javascript.ruanyifeng.com/nodejs/path.html>
var path = require('path')

var express = require('express')
var webpack = require('webpack')

// http代理中间件
var proxyMiddleware = require('http-proxy-middleware')

// 引入webpack开发环境配置
var webpackConfig = require('./webpack.dev.conf')

// dev server监听端口
var port = process.env.PORT || config.dev.port

// 是否自动打开浏览器 
var autoOpenBrowser = !!config.dev.autoOpenBrowser

// HTTP代理表
var proxyTable = config.dev.proxyTable

// 创建express实例
var app = express()

// 根据webpack配置创建Compiler
var compiler = webpack(webpackConfig)

// webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给express使用之后即可访问这些编译后的产品文件
// 同时当文件改动后不用刷新页面也可以看到效果
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// 一个为webpack提供的热部署中间件
// see:<https://github.com/glenjamin/webpack-hot-middleware>
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// 当html被改变的时候，让html被强制部署，使用html-webpack-plugin
// see:<https://github.com/ampedandwired/html-webpack-plugin>
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 遍历代理表的配置信息,并使用中间件加载进去
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 当访问找不到的页面的时候，该中间件指定了一个默认的页面返回，常用于SPA
// see:<https://github.com/bripkens/connect-history-api-fallback>
app.use(require('connect-history-api-fallback')())

// 使用webpack-dev-middleware中间件
app.use(devMiddleware)

// 使用webpack-hot-middleware中间件
app.use(hotMiddleware)

// 根据配置信息拼接一个目录路径，然后将该路径下的文件交给express的静态目录管理
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 地址信息
var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  // 如果符合自动打开浏览器的条件，则通过opn插件调用系统默认浏览器打开对应的地址uri
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
