/**
 * webpack基本配置
 */

var path = require('path')
// 引入utils工具
var utils = require('./utils')
// 引入config下的index.js环境变量配置
var config = require('../config')
// 引入css加载器配置
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    // 包含其他模块的webpack编译入口文件
    entry: {
        app: './src/main.js'
    },
    // 编译输出路径及命名规范
    output: {
        // 编译输出路径
        path: config.build.assetsRoot,
        // 编译输出文件命名
        filename: '[name].js',
        // 编译后发布的路径
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    // 配置模块resolve的规则
    resolve: {
        // 当使用require或者import的时候，自动补全下面的扩展名文件的扩展名，也就是说引入的时候不需要使用扩展名
        extensions: ['.js', '.vue', '.json'],
        // 路径别名，这个很方便，可以缩短路径长度，比如
        // import Vue from 'vue/dist/vue.js'加上别名vue后，可以直接 import Vue from 'vue'
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            // 这里的路径是../src
            '@': resolve('src')
        }
    },
    // 对不同类型的模块采用不同的loader来编译
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/vue-awesome')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 大小限制，当不超过10kb时，生成base64字符串
                    limit: 10000,
                    // 超过大小限制后单独生成一个文件，name是文件名
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loaer',
            },
        ]
    },
}
