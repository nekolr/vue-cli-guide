# 简要说明
vue-cli-old是使用旧版vue-cli生成的项目骨架，因为旧版和新版有一个比较大的区别是：新版没有了`dev-server.js`和`dev-client.js`配置文件，可以使用它和新版做个横向对比。几乎所有的代码都带有说明及参考链接，方便理解。    
# 项目结构
```
│  .babelrc						// babel配置
│  .postcssrc.js					// CSS预编译器配置
│  index.html						// 入口页面
│  package.json					        // npm配置
├─build							// 构建脚本目录，使用 npm run * 时就是执行这里的文件
│      build.js						// 生成环境构建脚本
│      check-versions.js				// 检测Node和NPM版本
│      dev-client.js					// 本地服务器热重载脚本
│      dev-server.js					// 运行本地服务器的脚本
│      utils.js						// 构建用的相关工具方法
│      vue-loader.conf.js				// css加载器配置
│      webpack.base.conf.js			        // webpack基础配置，类似一上手使用的webpack.config.js
│      webpack.dev.conf.js			        // webapck开发环境配置
│      webpack.prod.conf.js			        // webpack生产环境配置
├─config					        // 项目配置目录
│      dev.env.js					// 开发环境变量
│      index.js						// 项目配置文件
│      prod.env.js					// 生产环境变量
├─src							// 源代码目录
│  ├─assets						// 资源文件目录
│  ├─components					        // 组件目录
│  ├─router						// 路由目录
└─static					        // 静态资源目录
```

