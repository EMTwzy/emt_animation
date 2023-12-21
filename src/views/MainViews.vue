<template>
    <div class="main">
        <!-- 头部 -->
        <!-- 莉亚图、网站名称、搜索框、个人 -->
        <Header></Header>
        <!-- 内容部 -->
        <!-- 今日更新 、随机推荐（每一个专题都有跳转到全部分类的功能）-->
        <router-view >
        </router-view>

    </div>
</template>

<script>

import Header from '../components/headerComponents';


export default {
    name: 'MainCompoents',
    components:{Header},
    setup() {

    }
}
</script>

<style scoped lang="less">

</style>