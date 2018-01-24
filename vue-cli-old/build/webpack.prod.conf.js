var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')

// 引入基本环境变量配置
var config = require('../config')

var merge = require('webpack-merge')

// 引入webpack基本配置
var baseWebpackConfig = require('./webpack.base.conf')

// 复制文件和文件夹的插件
// see:<https://www.npmjs.com/package/copy-webpack-plugin>
var CopyWebpackPlugin = require('copy-webpack-plugin')
// html文件生成插件
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 压缩css插件
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 生产环境变量
var env = config.build.env

// 合并webpack配置
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      // 这里取值为true，表示生产环境生成source Map
      sourceMap: config.build.productionSourceMap,
      // 生产环境指定提取css
      extract: true
    })
  },
  // see:<http://www.css88.com/doc/webpack2/configuration/devtool/>
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    // 编译输出目录
    path: config.build.assetsRoot,
    // 编译输出文件名格式
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有指定输出名的文件输出的文件名格式
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // see:<http://vuejs.github.io/vue-loader/en/workflow/production.html>
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    // 抽取css到独立的文件中
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 压缩css
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see:<https://github.com/ampedandwired/html-webpack-plugin>
    new HtmlWebpackPlugin({
      // filename即生成的文件名
      filename: config.build.index,
      template: 'index.html',
      // 让打包生成的html文件中css和js就默认添加到html里面，css就添加到head里面，js就添加到body里面
      inject: true,
      // 配置压缩行为
      minify: {
        // 删除注释
        removeComments: true,
        // 去掉空格和换行
        collapseWhitespace: true,
        // 尽可能的去掉属性中的引号和空属性
        removeAttributeQuotes: true
        // 更多配置 see:<https://github.com/kangax/html-minifier#options-quick-reference>
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 控制chunks的顺序，这里表示按照依赖关系进行排序
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    // 使用CommonsChunkPlugin提取公共代码块，最终合成的文件能够在最开始的时候加载一次
    // 然后缓存起来供后续使用，这会带来速度上的提升
    // see:<https://doc.webpack-china.org/plugins/commons-chunk-plugin>
    new webpack.optimize.CommonsChunkPlugin({
      // 这是 common chunk 的名称
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 为了将项目中的第三方依赖代码抽离出来，官方文档上推荐使用这个插件，在实际使用时
    // 发现一旦更改了 app.js 内的代码，vendor.js 的 hash 也会改变，那么下次上线时，
    // 用户仍然需要重新下载 vendor.js 与 app.js。这样就失去了缓存的意义了。所以第二次new就是解决这个问题的
    // 参考：<https://github.com/DDFE/DDFE-blog/issues/10>
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    // 拷贝静态资源到build文件夹中
    new CopyWebpackPlugin([
      {
        // 定义要拷贝的资源的源目录
        from: path.resolve(__dirname, '../static'),
        // 定义要拷贝的资源的目标目录
        to: config.build.assetsSubDirectory,
        // 忽略拷贝指定的文件，可以使用模糊匹配
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  // 如果开启了生产环境的Gzip
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      // 目标资源的名称
      // [path]会被替换成原资源路径
      // [query]会被替换成原查询字符串
      asset: '[path].gz[query]',
      // Gzip算法
      algorithm: 'gzip',
      // 处理所有匹配此正则表达式的资源
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      // 只处理比这个值大的资源
      threshold: 10240,
      // 只有压缩率比这个值小的资源才会被处理
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
