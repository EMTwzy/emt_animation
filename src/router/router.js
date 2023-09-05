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