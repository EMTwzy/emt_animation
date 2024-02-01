<template>
  <div class="player">
    <div class="top">
      <!-- video -->
      <div class="video">
        <!--  -->
        <iframe :src="playing" scrolling="0" frameborder="0" width="100%" height="100%" allowfullscreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen"
          oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen">
        </iframe>
      </div>
      <!-- 相关集数与搜索框 -->
      <div class="group">
        <div class="searchInput">
          <inputSearch :inintWidth="inputSearch"></inputSearch>
        </div>
        <!-- 集数 -->
        <div class="collection">
          <el-button v-for="v in group" :key="v" class="chapter" @click="selectPlay(v)"
            :class="{ 'selected': v == playChapter }">
            {{ v }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 视频相关信息 -->
    <div class="information">
      <div class="pic">
        <img :src="videoData.vpic" alt="封面" v-if="videoData.vpic.length > 0">
        <img src="../assets/load.jpg" v-else-if="videoData.vpic.length == 0 || videoData.vpic == null" alt="封面">
      </div>
      <!-- 番剧详情 -->
      <div class="content">
        <p>{{ videoData.vname }}</p>
        <p><span style="color:rgb(128,128,128)">上映时间：</span>{{ videoData.vpublishyear }}</p>
        <p><span style="color:rgb(128,128,128)">地区：</span>{{ videoData.vpublisharea }}</p>
        <p><span style="color:rgb(128,128,128)">更新时间：</span>{{ videoData.vaddtime }}</p>
        <p id="videoContent"><span style="color:rgb(128,128,128)">介绍：</span>{{ videoContent }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import inputSearch from '@/components/inputSearch.vue';

export default {
  name: 'PlayViews',
  components: { inputSearch },
  setup() {
    var videoData = reactive({        //接收视频信息
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
    });
    const videoContent = ref('');   //视频详细介绍信息
    var playData = [];    //视频播放数据
    var group = [];    //视频集数
    const vid = ref(localStorage.getItem('playId'));    //视频的号
    const playing = ref(0);       //正在播放的链接
    if (!localStorage.getItem('playChapter'))
      localStorage.setItem('playChapter', "");     //初始化播放集数   
    var playChapter = ref(localStorage.getItem('playChapter'));   //正在播放的集数
    console.log("localStorage", playChapter.value);

    let userAgent = navigator.userAgent;       //获取当前访客的客户端类别信息
    const inputSearch = ref('width:80%;font-size:1rem');  //输入框样式
    if (userAgent.indexOf('Mobile') !== -1) {
      inputSearch.value = 'width:50%;font-size:1rem';
    }

    onMounted(() => {
      //获取视频信息数据
      axios.get("http://localhost:8080/selectVideoById", {
        params: {
          vid: vid.value
        }
      }).then((response) => {
        if (response.data != null) {
          Object.assign(videoData, response.data);
          videoData.vaddtime = timeUtis(videoData.vaddtime);
        }
      });
      //获取视频详细介绍数据
      axios.get("http://localhost:8080/selectContent", {
        params: {
          vid: vid.value
        }
      }, setTimeout(5000)).then((response) => {
        if (response.data != null) {
          // 替换 HTML 实体和去除标签
          var decodedString = response.data.replace(/&lt;\/?p&gt;|&lt;br\/&gt;/g, '')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, ' ')
            .replace(/&amp;nbsp;/g, ' ');

          // 去除行首和行尾的空格，合并多余的空格
          decodedString = decodedString.trim().replace(/\s+/g, ' ');
          videoContent.value = decodedString.trim();
        }
      });
      getplay();

    })

    // 选择播放集数
    function selectPlay(v) {
      if (v !== '' && typeof v !== 'undefined') {
        console.log(v);
        localStorage.setItem('playChapter', v);       //将当前观看的结果保存在cookie中
        let index = group.indexOf(v);
        console.log("str", group);
        playChapter.value = v;
        //对播放内容进行判定
        var str = playData[index];
        if (str == null)
          alert("出现错误了！");
        console.log("末尾判定", str.slice(-5));
        if (str.slice(-5) == '.m3u8')
          playing.value = "https://lziplayer.com/?url=" + playData[index];
        else
          playing.value = playData[index];
        console.log(playing.value, "当前播放数据");
      }
    }

    //获取播放数据与集数
    async function getplay() {
      try {
        //获取视频的集数
        await axios.get("http://localhost:8080/getScore", {
          params: {
            vid: vid.value
          }
        }).then((response) => {
          console.log("集数 response", response.data)
          if (response.data != null && response.data.length > 0) {
            response.data.forEach(element => {
              group.push(element);
            });
            console.log("集数", group)
          }
        });
        //获取视频的播放数据
        await axios.get("http://localhost:8080/getPlay", {
          params: {
            vid: vid.value
          }
        }).then((response) => {
          if (response.data != null && response.data.length > 0) {
            playData.length = 0;
            playData = response.data;
            console.log("播放response", response.data);
            console.log("播放", playData);
            if (playChapter.value == '')
              selectPlay(group[0]);
            else
              selectPlay(playChapter.value);
          }
        });
      } catch (error) {
        console.error("获取数据时出错:", error);
      }
    }

    //格式化时间戳
    function timeUtis(time) {
      // 创建一个 Date 对象
      let date = new Date(time * 1000); // 乘以1000将秒转换为毫秒
      // 获取年、月、日
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
      let day = String(date.getDate()).padStart(2, '0');
      let formattedDate = year + '-' + month + '-' + day;
      // 格式化日期字符串
      return formattedDate;
    }


    return {

      videoData, videoContent, playData, group, playing, playChapter, inputSearch,
      selectPlay,

    }
  }
}
</script>

<style scoped lang="less">
.player {
  width: 90%;
  background: rgb(00, 00, 00);
  margin: 0 auto;

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24rem;

    .video {
      width: 50%;
      height: 20rem;
    }

    /*播放器*/
    .playVideo {
      width: 50%;
      height: 50%;

    }

    /*搜索框和集数*/
    .group {
      width: 30%;
      height: 20rem;
      margin-left: 5rem;
      text-align: center;

      .collection {
        border: 0.3rem solid #989393;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        color: white;
        height: 15rem;
        overflow: auto;

        /**超出高度后用滑轮显示*/
        .chapter {
          padding: 0.3rem;
          height: 1rem;
          width: 4rem;
          cursor: pointer;
          background-color: #000;
          border: none;
          margin: 0.5rem 0;
          font-size: 1rem;
        }

        .selected {
          color: blue;
        }

      }
    }
  }

  /**视频信息**/
  .information {
    width: 100%;
    border: 0.2rem solid white;
    color: white;
    display: flex;
    justify-items: center;

    .pic {
      width: 10rem;

      img {
        width: 10rem;
      }
    }

    .content {
      margin-left: 1rem;

      #videoContent {
        height: 5rem;
        overflow: auto;
      }
    }
  }

}

@media (max-width:500px) {
  .player {
    width: 100%;
    height: 75vh;
    background: rgba(00, 00, 00,0.8 );
    /**内容上层**/
    .top {
      display:block;
      height: auto;
      padding-top:2rem;
      .video{
        width: 90%;
        margin: 0 auto;
        border: 0.1rem solid white;
      }
      .group {
        width: 100%;
        margin-left: 0rem;
        height: auto;
        /**输入框框架*/
        .searchInput {
          width: 100%;
        }
        /**集数**/
        .collection{
          width: 70%;
          margin: 0 auto;
          display: block;
          text-align: left;
          .chapter{
            height: 5rem;
            width: 5rem;
            font-size: 1.2rem;
            margin-left: 0.1rem;
          }
        }
      }
    }
    /**视频详细信息**/
    .information{
      font-size: 1.2rem;
      width: auto;
      margin-top: 3rem;
      .pic{
        display: flex;
      }
    }
  }
}</style>