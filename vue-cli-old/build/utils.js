var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

/**
 * 生成编译输出的二级目录
 * @param {*} _path 
 */
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  // path.posix是Path模块跨平台的实现（不同平台的路径表示是不一样的）
  return path.posix.join(assetsSubDirectory, _path)
}

/**
 * 生成cssLoaders用于加载vue文件中的样式
 * @param {*} options 
 */
exports.cssLoaders = function (options) {
  options = options || {}

  // css处理器
  var cssLoader = {
    loader: 'css-loader',
    options: {
      // 是否压缩
      minimize: process.env.NODE_ENV === 'production',
      // 是否生成sourceMap
      sourceMap: options.sourceMap
    }
  }

  /**
   * 结合ExtractTextPlugin创建loader加载器字符串
   * @param {loader的名称} loader
   * @param {loader对应的配置} loaderOptions 
   */
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        // 将配置复制到{}中，返回新的配置
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      // 明确指定要提取静态文件
      return ExtractTextPlugin.extract({
        // use指定使用什么加载器来编译文件，从右到左执行
        use: loaders,
        // webpack默认会按照loaders中的加载器从右向左调用编译各种css类型文件。如果一切顺利，在loaders中的
        // 各个加载器运行结束之后就会把css文件导入到规定的文件中去，如果不顺利，则继续使用vue-style-loader来处理
        fallback: 'vue-style-loader'
      })
    } else {
      // 没有指定需要提取，则最后使用vue-style-loader处理css
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // see:<https://vue-loader.vuejs.org/en/configurations/extract-css.html>
  return {
    // css-loader
    css: generateLoaders(),
    // postcss-loader
    postcss: generateLoaders(),
    // less-loader
    less: generateLoaders('less'),
    // sass-loader，后边的值表示sass语法缩进
    sass: generateLoaders('sass', { indentedSyntax: true }),
    // scss-loader
    scss: generateLoaders('sass'),
    // stylus-loader
    stylus: generateLoaders('stylus'),
    // stylus-loader，styl是另一种后缀
    styl: generateLoaders('stylus')
  }
}

// 为不在vue文件中的独立的样式文件创建加载器配置
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
