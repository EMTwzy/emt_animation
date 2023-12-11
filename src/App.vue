<template>
  <id class="app">
    <!-- 背景图 -->
    <div class="background"></div>
    <router-view></router-view>

  </id>
  
</template>


<script>
export default {
  name: 'App',
  components: {},
  setup() {

    // 定义全局rem
    //屏幕宽1536px
    document.querySelector("html").style.fontSize = document.documentElement.clientWidth / 96 + 'px';

  }
}
</script>

<style lang="less">
body {
  margin: 0;
  /* 隐藏页面溢出部分 */
  /*overflow: hidden;
  background: url(../src//assets//background.png) center center no-repeat;
  background-size:cover;
  background-position-y:-5rem;**/

}

.app {
  position: relative;
  overflow-x: hidden;

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../src//assets//background.png');
    background-size: cover;
    background-position-y:-5rem ;
    /* 可根据需要调整背景图片的显示方式 */
    z-index: -1;
    /* 将背景图放到z轴的最底层，确保不会遮挡其他内容 */
  }
}
</style>