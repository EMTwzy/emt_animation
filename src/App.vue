<template>
  <id class="app">
    <!-- 背景图 -->
    <div id="background" :style="bk"></div>
    <!-- 内容区 -->
    <div id="routers">
      <router-view></router-view>
    </div>
  </id>
</template>


<script>
import { onMounted } from 'vue';
import background from '@/assets/background.jpg';
import phone from '@/assets/phone_bk.jpg';

export default {
  name: 'App',
  components: {},
  setup() {
    var backgroundImage = background;
    // 定义全局rem
    //屏幕宽1536px
    document.querySelector("html").style.fontSize = 16 + 'px';
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
        document.querySelector("html").style.fontSize = 9 + 'px';   //手机端10px/rem
      }
      document.getElementById('background').style.backgroundImage = `url(${backgroundImage})`;

    })
    window.addEventListener('keydown', function (e) {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault(); // 阻止默认行为
        alert("本站是开源的，@github.com/EMTwzy");
      }
    });





    return {
      bk,
    }

  }
}
</script>

<style lang="less">
body,
html {
  margin: 0;
  height: 100%;

}

.app {
  position: relative;
  overflow-x: hidden;


  #routers {
    height: 100vh;
    overflow: auto;
  }

  #background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    /* 可根据需要调整背景图片的显示方式 */
    z-index: -1;
    /* 将背景图放到z轴的最底层，确保不会遮挡其他内容 */
  }

  @media (min-width:600px) {
    #background {
      background-position-y: -5rem;
    }
  }

  @media (max-width:600px) {
    #background {
      background-attachment: fixed;
      background-position-y: 0rem !important;
    }
  }

}</style>