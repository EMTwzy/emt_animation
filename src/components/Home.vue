<template>
  <div id="Home">
    <!-- 每日更新 -->
    <div class="theme_img"></div>
    <hr>
    <NewDay></NewDay>
  </div>
</template>

<script>
import NewDay from './NewDay.vue';

export default {
    name:'Home',
    components:{NewDay,},
}
</script>

<style scoped>
.theme_img{
  width: 75%;
  height: 4rem;
  background: url(../assets/theme00.jpg) 100% 100% no-repeat;
  background-position-y: -1rem;
  background-size: cover;
  margin: 0 auto;
}
hr{
  width: 80%;
  margin: 0 auto;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
}
</style>