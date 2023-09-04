<template>
  <div id="app">
    <Navigation/>
    <Muen></Muen>
  </div>
</template>

<script>
import Muen from './components/Muen.vue';
import Navigation from '../src/components/Navigation.vue';


export default {
  name: 'App',
  components: {
    Muen,Navigation
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
  background:rgb(26, 0, 26);
}
</style>
