<template>
  <id class="app">
    <!-- 背景图 -->
    <div id="background" :style="bk"></div>
    <router-view></router-view>

  </id>
</template>


<script>
import { onMounted } from 'vue';
import background from '@/assets/background.png';
import phone from '@/assets/phone_bk.png';

export default {
  name: 'App',
  components: {},
  setup() {
    var backgroundImage = background;
    // 定义全局rem
    //屏幕宽1536px
    document.querySelector("html").style.fontSize = document.documentElement.clientWidth / 96 + 'px';
    const bk = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPositionY: '-5rem',
      /* 可根据需要调整背景图片的显示方式 */
      zIndex: -1,
      /* 将背景图放到z轴的最底层，确保不会遮挡其他内容 */
    };
    onMounted(() => {
      // 获取用户代理字符串  
      var userAgent = navigator.userAgent;
      console.log("当前访问ua类型", userAgent);
      if (userAgent.indexOf('Mobile') !== -1) {
        backgroundImage = phone;
      }
      document.getElementById('background').style.backgroundImage = `url(${backgroundImage})`;

    })
    
    
    


    return {
      bk,
    }

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

  #background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position-y: -5rem;
    /* 可根据需要调整背景图片的显示方式 */
    z-index: -1;
    /* 将背景图放到z轴的最底层，确保不会遮挡其他内容 */
  }

}

</style>