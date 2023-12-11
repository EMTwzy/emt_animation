<<<<<<< HEAD
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
=======
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  
>>>>>>> 84d56de9b5987a42f7b75f6beafdf19b82c518aa
})
