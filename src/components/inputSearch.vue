<template>
  <div class="inputSearch">
    <!-- 查询 -->
    <el-input v-model="input" placeholder="找一部好番看看吧~" class="search" @keyup.enter="search" style="width:30%">

    </el-input>
  </div>
</template>

<script>
import { inject, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'inputSearch',
  setup() {
    const store = useStore();
    const router = inject('router'); // 注入全局的路由实例
    const input =ref('');
    
    

    function search() {
      console.log("启动了函数");
      //store.commit('setInput',input);
      sessionStorage.setItem('input',JSON.stringify(input.value));
      console.log(router.currentRoute.value.path);
      let now=router.currentRoute.value.path;
      if(now=='/search'){
        router.go(0);
      }else
      router.push('/search');
    }

    return {
      search, store,input
    }
  }
}
</script>

<style>
/*搜索框*/
.search {
  width: 30%;
  padding: 1rem;
  height: 5rem;
  opacity: 0.8;

}
</style>