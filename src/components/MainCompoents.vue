<template>
    <div class="main">
        <!-- 头部 -->
        <!-- 莉亚图、网站名称、搜索框、个人 -->
        <Header></Header>
        <!-- 内容部 -->
        <!-- 今日更新 、随机推荐（每一个专题都有跳转到全部分类的功能）-->
        <RouterView>
            <Home></Home>
        </RouterView>

    </div>
</template>

<script>

import Header from '../views/headerViews';
import Home from '../components/HomeCompoents.vue';

export default {
    name: 'MainCompoents',
    components:{Header,Home},
    setup() {

    }
}
</script>

<style scoped lang="less">

</style>