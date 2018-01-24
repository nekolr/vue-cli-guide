/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 订阅事件，当event.action === 'reload'时执行页面刷新（想到dev-server里的发布事件了吗）
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
