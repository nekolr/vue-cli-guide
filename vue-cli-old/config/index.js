/**
 * 定义构建时所需环境变量
 */
var path = require('path')

module.exports = {
    build: {
        // 生产环境
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        // 编译好的文件存放目录
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 编译输出的二级目录
        assetsSubDirectory: 'static',
        // 编译发布的根目录，可配置为资源服务器域名或者cdn域名
        assetsPublicPath: './',
        // 生产环境是否生产sourceMap
        productionSourceMap: true,
        // 默认关闭Gzip，因为许多流行的静态主机，比如Surge或Netlify已经为您提供了所有的静态资源。
        // 在设置为true前，请npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        // 生成环境Gzip压缩格式
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        // 开发环境
        env: require('./dev.env'),
        // 端口号
        port: 8080,
        // 是否自动打开浏览器
        autoOpenBrowser: true,
        // 编译输出的二级目录
        assetsSubDirectory: 'static',
        // 编译发布的根目录，可配置为资源服务器域名或者cdn域名
        assetsPublicPath: '/',
        // 定义HTTP代理表，代理到后端的API
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        // 是否生成cssSourceMap
        cssSourceMap: false
    }
}
