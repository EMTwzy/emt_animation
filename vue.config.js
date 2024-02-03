
const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '': {
        target: 'https://8.130.75.115:8080',
        changeOrigin: true,
      }
    }
  }
});
