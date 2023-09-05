<template>
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

}
</style>
