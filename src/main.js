import Vue from 'vue'
import App from './App.vue'
//引入路由
import UseRouter from 'vue-router';
//引入路由器
import index from './router/router';




Vue.config.productionTip = false
//使用路由
Vue.use(UseRouter);
new Vue({
  render: h => h(App),
  router:index,
}).$mount('#app')
