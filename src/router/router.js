
import {createRouter, createWebHistory} from 'vue-router';
import main from '../views/MainViews';
import home from '../views/HomeViews';
import all from '../views/AllViews';
import search from '../views/searchViews.vue';

//Vue 3 中，Vue Router 默认使用的是 HTML5 历史记录模式（history mode），这种模式下，URL 中不再带有哈希 '#'，
const Router = createRouter({
    //告诉 Vue Router 使用浏览器的历史记录 API 来管理路由
    history: createWebHistory(),
    //这里就是routes不允许更改
    routes: [
        {
            path: '/',
            component: main,
            redirect: 'home',
            children: [
                {path: '/home', component: home},
                {path:'/all',component:all},
                {path:'/search',component:search},
            ],
        }
    ]
});

export default Router;
