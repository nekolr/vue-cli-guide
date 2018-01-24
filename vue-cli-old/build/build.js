// Node.js和npm版本检查
require('./check-versions')()

process.env.NODE_ENV = 'production'

// Node.js环境下的loading效果模块
// see:<https://github.com/sindresorhus/ora>
var ora = require('ora')

// The UNIX command rm -rf for node
var rm = require('rimraf')

var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')

// 引入基本的环境变量
var config = require('../config')

// 导入生成环境配置
var webpackConfig = require('./webpack.prod.conf')

// 显示loading
var spinner = ora('building for production...')
spinner.start()

// 删除打包目标目录下的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    // 进行打包
    webpack(webpackConfig, function(err, stats) {
        // 打包完成
        spinner.stop()
        if (err) throw err
        // 输出打包的状态信息
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})