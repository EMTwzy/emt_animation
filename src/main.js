
import {createApp} from 'vue'
import App from './App.vue'
//引入router，以及router配置文件
import routerConfigure from '../src/router/router';
//引入elementUI 在vue3中element-ui改成了element-plus
import ElementUI from 'element-plus';
import 'element-plus/dist/index.css';
//引入vuex
import {vuex} from './vuex';
import store from '../src/vuex/index';

const app = createApp(App);
// 使用路由
app.use(routerConfigure);
app.provide('router', routerConfigure); // 提供全局的路由实例
// 使用element-ui
app.use(ElementUI);
//使用vuex
app.use(vuex);
app.provide('store',store);

// 防止路由原地跳转导致出错

const originalPush = routerConfigure.push;
routerConfigure.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

app.config.productionTip = false;


app.mount('#app');
