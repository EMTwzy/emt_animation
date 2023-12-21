<template>
  <div class="searchResult">
    <h2>{{input}}</h2>
    <div class="result">
      <div v-for="v in videoData" :key="v.vid" class="video_item">
          <div class="pic">
              <img :src="v.vpic" alt="封面" v-if="v.vpic.length > 0">
              <img src="../assets/load.jpg" v-else-if="(v.vpic.length === 0 || v.vpic === '' )&&input.value" alt="封面">
              <p style="width:9rem">{{ v.vname }}</p>
              <p>{{ v.vnote }}</p>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, reactive,ref } from 'vue';
import axios from 'axios';
export default {
  name: 'searchViews',
  setup() {
    const store = useStore();
    const input = ref(store.state.input);          //输入框传来的数据

    const videoData = reactive([{           //视频数据
      vid: 0,//作品编号
      vname: '',//作品名称
      vstate: 0,//作品状态（集数）
      vpic: '',//作品封面
      vactor: '',//声优
      vpublishyear: 0,//上映时间（年份）
      vpublisharea: '',//上映地区（制作国）
      vaddtime: '',//添加时间（时间戳）
      vnote: '',//更新状态
      vletter: '',//作品开头字母
      vdirector: '',//制作人
      vlang: '',//语种（作品语类）
    }]);

    onMounted(() => {
      console.log('input的数据状态',input.value!='');
      if(input.value!=''&&input.value!=null)
      axios.get("http://localhost:8080/selectVideoByName", {
        params: {
          name: input.value
        }
      }).then((response) => {
        if (response.data != '' && response.data != null) {
          store.commit('setInput', '');        //置空输入框的内容
          input.value=input.value+"搜索结果为:";
          console.log(response.data);
        }
      })
      else
      input.value='未输入内容或查询出错';
    })

    return {
      input,
      videoData,

    }
  }
}
</script>

<style lang="less">
    .searchResult {
      width: 80%;
      margin-top: 1rem;
      background-color:rgba(0,0,0,0.8 );
      margin: 0 auto;
      color: white;
      h2{
        text-align: center;
      }
      .result{
        display: flex;

        justify-items: center;
        align-items: center;
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
</style>