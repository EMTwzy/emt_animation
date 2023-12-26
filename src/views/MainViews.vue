<template>
    <div class="main">
        <!-- 头部 -->
        <!-- 莉亚图、网站名称、搜索框、个人 -->
        <Header></Header>
        <!-- 内容部 -->
        <router-view >
        </router-view>
        <!-- 尾部 -->
        <!-- 免责声明哒 -->
        <Footer></Footer>

    </div>
</template>

<script>

import Header from '../components/headerComponents';
import Footer from '@/components/footerComponents.vue';

export default {
    name: 'MainCompoents',
    components:{Header,Footer},
    setup() {

    }
}
</script>

<style scoped lang="less">

</style>