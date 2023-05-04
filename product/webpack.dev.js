const baseConfig = require("./webpack.config");
const merge = require("webpack-merge");
const serve = require("../server/server.js");

module.exports = merge(baseConfig, {
  devtool: "#eval-source-map",
  devServer: {
    hot: true,
    compress: true,
    port: 9000,
    open: true,
    proxy: {
      // "*": "http://localhost:18888"
      // '*': "http://localhost:8090"
      '/api': {
        //本地服务接口地址
        target: 'http://localhost:8090',
        // target: 'https://fzxx.iyuhong.com.cn/api',
        //远程演示服务地址,可用于直接启动项目
        //target: 'https://saber.bladex.vip/api',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    // before() {
    //   serve.run(18888, "n");
    // }
  }
});
