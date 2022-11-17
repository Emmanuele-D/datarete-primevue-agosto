const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const { defineConfig } = require("@vue/cli-service");


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
});
