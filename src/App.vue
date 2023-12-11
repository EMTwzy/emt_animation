<template>
<<<<<<< HEAD
  <id class="app snowfall">
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
=======
  <div id="app">
    <!-- 导航栏 -->
    <Navigation/>
    <!-- 菜单 -->
    <Muen></Muen>
    <!-- 变动区 -->
    <div id="content">
      <router-view>
        <!-- 默认展示首页内容 -->
        <Home></Home>
      </router-view>
    </div>
  </div>
</template>

<script>
import Muen from './components/Muen.vue';
import Navigation from '../src/components/Navigation.vue';
import Home from './components/Home.vue';

export default {
  name: 'App',
  components: {
    Muen,Navigation,Home,
  },
  data(){
    return{
      hg:0,
    }
  },
  
}

</script>

<style scoped>
/**
全局样式
*/
*{
  padding: 0;
  margin: 0;
}
list{
  list-style: none;
}
a{
  text-decoration: none;
}


/*
界面样式
**/
#app{
  margin: 0;
}

/**
变动区域的样式
*/
#content{
  background: rgb(26, 0, 26);

>>>>>>> 84d56de9b5987a42f7b75f6beafdf19b82c518aa
}
</style>
