<template>
  <div class="searchResult">
    <h2>{{ input }}</h2>
    <div class="search">
      <inputSearch :inintWidth="inputSearch"></inputSearch>
    </div>
    <div class="result">
      <div v-for="v in videoData" :key="v.vodId" class="video_item">
        <div class="pic">
          <img :src="v.vodPic" alt="封面" v-if="v.vodPic.length > 0" @click="toPlay(v.vodId)" style="cursor: pointer;">
          <img src="../assets/load.jpg" v-else-if="v.vodPic.length == 0 || v.vodPic == null" alt="封面" @click="toPlay(v.vodId)">
          <p style="width:9rem;margin:0 auto;cursor: pointer;" @click="toPlay(v.vodId)">{{ v.vodName }}</p>
          <p style="margin:0 auto">{{ v.vodTitle }}</p>
        </div>
      </div>
      <h3 style="text-align:center;margin-top:1rem;color:red;width:100%" v-if="videoData.length > 1">到此为止了</h3>
    </div>
  </div>
</template>

<script>

import { onMounted, reactive, ref ,inject} from 'vue';
import axios from 'axios';
import inputSearch from '@/components/inputSearch.vue';

export default {
  name: 'searchViews',
  components: { inputSearch },
  setup() {

    const router=inject('router');
    const input = ref(JSON.parse(sessionStorage.getItem('input')));          //输入框传来的数据
    let userAgent=navigator.userAgent;    //获取用户客户端类型数据
    const inputSearch=ref('');      //输入框样式
    if(userAgent.indexOf('Mobile')!==-1)
    inputSearch.value='width:50%;font-size:1rem';
    else
        inputSearch.value="width:30%;font-size:1rem";

    const videoData = reactive([{           //视频数据
      vodId: 0,//作品编号
      vodName: '',//作品名称
      vodTitle: 0,//作品状态（集数）
      vodPic: '',//作品封面
      vodActor: '',//声优
      vodYear: 0,//上映时间（年份）
      vodArea: '',//上映地区（制作国）
      vodAddtime: '',//添加时间（时间戳）
      vodLetter: '',//作品开头字母
      vodLanguage: '',//语种（作品语类）
    }]);

    onMounted(() => {
      if (input.value != '' && input.value != null)
        axios.get("https://www.emtanimation.fun:8080/selectVideoByName", {
          params: {
            name: input.value
          }
        }).then((response) => {
          if (response.data != '' && response.data != null) {
            let total = response.data.length;

            input.value = input.value + "搜索结果为(共" + total + "条结果):";
            videoData.length = 0;                 //置空数据组的内容
            videoData.push(...response.data);

            videoData.forEach((item) => {
              axios.get("https://www.emtanimation.fun:8080/picUtils", {
                params: {
                  vpic: item.vodPic
                }
              }).then((response) => {
                if (!response.data)    //如果图片判定为无法访问
                  item.vodPic = '';
              })
            });
          }
        })
      else
        input.value = '未输入内容或查询出错';
    })

    //前往播放界面
    function toPlay(id) {
      localStorage.setItem('playId', id);
      router.push('/play');
    }

    return {
      input,inputSearch,
      videoData,
      toPlay
    }
  }
}
</script>

<style lang="less">
.searchResult {
  width: 80%;
  margin-top: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  margin: 0 auto;
  color: white;
  .search{
    text-align:center;
    width:100%;
  }
  h2 {
    text-align: center;
    padding-top: 1rem;
  }

  .result {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
  }

  .video_item {
    flex: 0 0 20%;
    /* 让每个项目占据 20% 的宽度，一行显示 5 个项目 */
    margin-top: 0.5rem;

    .pic {
      text-align: center;

      img {
        width: 9rem;
        height: 11rem;
      }
    }
  }
}
@media (max-width:600px) {
  .searchResult{
    /**太宽了会导致出现左右滑轮*/
    width: 91.2%;   
    height: 80vh;
    overflow: auto;
    .search{
      width: 80%;
      margin: 0 auto;
    }
    .video_item{
      margin-left: 2rem;
    }
  }

  
}
</style>