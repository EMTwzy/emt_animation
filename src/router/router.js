<<<<<<< HEAD
import {createRouter, createWebHistory} from 'vue-router';
import main from '../components/MainCompoents';
import home from '../components/HomeCompoents';

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

            ],
        }
    ]
});

export default Router;
=======
import Router from 'vue-router';

import Home from '../components/Home';

const router =new Router({
    routes:[{
        //指明拦截目标
        path:'/',
        //指明前进方向
        component:Home,
            }
]
})

export default router;
>>>>>>> 84d56de9b5987a42f7b75f6beafdf19b82c518aa
