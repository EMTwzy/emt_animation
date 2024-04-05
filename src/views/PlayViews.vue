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
      <!-- 鐩稿叧闆嗘暟涓庢悳绱㈡ -->
      <div class="group">
        <div class="searchInput">
          <inputSearch :inintWidth="inputSearch"></inputSearch>
        </div>
        <!-- 闆嗘暟 -->
        <div class="collection">
          <el-button v-for="v in group" :key="v" class="chapter" @click="selectPlay(v)"
            :class="{ 'selected': v == playChapter }">
            {{ v }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 瑙嗛鐩稿叧淇℃伅 -->
    <div class="information">
      <div class="pic">
        <img :src="videoData.vodPic" alt="灏侀潰" v-if="videoData.vodPic.length > 0">
        <img src="../assets/load.jpg" v-else-if="videoData.vodPic.length == 0 || videoData.vodPic == null" alt="灏侀潰">
      </div>
      <!-- 鐣墽璇︽儏 -->
      <div class="content">
        <p>{{ videoData.vodName }}</p>
        <p><span style="color:rgb(128,128,128)">涓婃槧鏃堕棿锛�</span>{{ videoData.vodYear }}</p>
        <p><span style="color:rgb(128,128,128)">鍦板尯锛�</span>{{ videoData.vodArea }}</p>
        <p><span style="color:rgb(128,128,128)">鏇存柊鏃堕棿锛�</span>{{ videoData.vodAddtime }}</p>
        <p id="videoContent"><span style="color:rgb(128,128,128)">浠嬬粛锛�</span>{{ videoContent }}</p>
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
    var videoData = reactive({        //鎺ユ敹瑙嗛淇℃伅
      vodId: 0,//浣滃搧缂栧彿
      vodName: '',//浣滃搧鍚嶇О
      vodTitle: 0,//浣滃搧鐘舵€侊紙闆嗘暟锛�
      vodPic: '',//浣滃搧灏侀潰
      vodActor: '',//澹颁紭
      vodYear: 0,//涓婃槧鏃堕棿锛堝勾浠斤級
      vodArea: '',//涓婃槧鍦板尯锛堝埗浣滃浗锛�
      vodAddtime: '',//娣诲姞鏃堕棿锛堟椂闂存埑锛�
      vodLetter: '',//浣滃搧寮€澶村瓧姣�
      vodLanguage: '',//璇锛堜綔鍝佽绫伙級
    });
    const videoContent = ref('');   //瑙嗛璇︾粏浠嬬粛淇℃伅
    var playData = [];    //瑙嗛鎾斁鏁版嵁
    var group = [];    //瑙嗛闆嗘暟
    const vid = ref(localStorage.getItem('playId'));    //瑙嗛鐨勫彿
    const playing = ref(0);       //姝ｅ湪鎾斁鐨勯摼鎺�
    if (!localStorage.getItem('playChapter'))
      localStorage.setItem('playChapter', "");     //鍒濆鍖栨挱鏀鹃泦鏁�   
    var playChapter = ref(localStorage.getItem('playChapter'));   //姝ｅ湪鎾斁鐨勯泦鏁�
    console.log("localStorage", playChapter.value);

    let userAgent = navigator.userAgent;       //鑾峰彇褰撳墠璁垮鐨勫鎴风绫诲埆淇℃伅
    const inputSearch = ref('width:80%;font-size:1rem');  //杈撳叆妗嗘牱寮�
    if (userAgent.indexOf('Mobile') !== -1) {
      inputSearch.value = 'width:50%;font-size:1rem';
    }

    onMounted(() => {
      //鑾峰彇瑙嗛淇℃伅鏁版嵁
      axios.get("https://www.emtanimation.fun:8080/selectVideoById", {
        params: {
          vid: vid.value
        }
      }).then((response) => {
        if (response.data != null) {
          Object.assign(videoData, response.data);
          videoData.vodAddtime = timeUtis(videoData.vodAddtime);
        }
      });
      //鑾峰彇瑙嗛璇︾粏浠嬬粛鏁版嵁
      axios.get("https://www.emtanimation.fun:8080/selectContent", {
        params: {
          vid: vid.value
        }
      }, setTimeout(5000)).then((response) => {
        if (response.data != null) {
          // 鏇挎崲 HTML 瀹炰綋鍜屽幓闄ゆ爣绛�
          var decodedString = response.data
            .replace(/&lt;\/?(p|br)&gt;/g, '')  // 鍚屾椂鍖归厤 <p>, </p>, <br>, 鍜� </br>  
            .replace(/&lt;/g, '')
            .replace(/&gt;/g, '')
            .replace(/&amp;nbsp;/g, ' ')
            // 鏇挎崲 <br> 鏍囩鐨勫彉浣撲负绌哄瓧绗︿覆  
            .replace(/<br\s*\/?>/gi, '')
            // 鍘婚櫎 <p> 鍜� </p> 鏍囩  
            .replace(/<\/?p>/g, '');
            

      // 鍘婚櫎琛岄鍜岃灏剧殑绌烘牸锛屽悎骞跺浣欑殑绌烘牸
      decodedString = decodedString.trim().replace(/\s+/g, ' ');
      videoContent.value = decodedString.trim();
    }
      });
  getplay();

})

// 閫夋嫨鎾斁闆嗘暟
function selectPlay(v) {
  if (v !== '' && typeof v !== 'undefined') {
    console.log(v);
    localStorage.setItem('playChapter', v);       //灏嗗綋鍓嶈鐪嬬殑缁撴灉淇濆瓨鍦╟ookie涓�
    let index = group.indexOf(v);
    console.log("str", group);
    playChapter.value = v;
    //瀵规挱鏀惧唴瀹硅繘琛屽垽瀹�
    var str = playData[index];
    if (str == null)
      alert("鍑虹幇閿欒浜嗭紒");
    console.log("鏈熬鍒ゅ畾", str.slice(-5));
    if (str.slice(-5) == '.m3u8')
      playing.value = "https://lziplayer.com/?url=" + playData[index];
    else
      playing.value = playData[index];
    console.log(playing.value, "褰撳墠鎾斁鏁版嵁");
  }
}

//鑾峰彇鎾斁鏁版嵁涓庨泦鏁�
async function getplay() {
  try {
    //鑾峰彇瑙嗛鐨勯泦鏁�
    await axios.get("https://www.emtanimation.fun:8080/getScore", {
      params: {
        vid: vid.value
      }
    }).then((response) => {
      console.log("闆嗘暟 response", response.data)
      if (response.data != null && response.data.length > 0) {
        response.data.forEach(element => {
          group.push(element);
        });
        console.log("闆嗘暟", group)
      }
    });
    //鑾峰彇瑙嗛鐨勬挱鏀炬暟鎹�
    await axios.get("https://www.emtanimation.fun:8080/getPlay", {
      params: {
        vid: vid.value
      }
    }).then((response) => {
      if (response.data != null && response.data.length > 0) {
        playData.length = 0;
        playData = response.data;
        console.log("鎾斁response", response.data);
        console.log("鎾斁", playData);
        if (playChapter.value == '')
          selectPlay(group[0]);
        else
          selectPlay(playChapter.value);
      }
    });
  } catch (error) {
    console.error("鑾峰彇鏁版嵁鏃跺嚭閿�:", error);
  }
}

//鏍煎紡鍖栨椂闂存埑
function timeUtis(time) {
  // 鍒涘缓涓€涓� Date 瀵硅薄
  let date = new Date(time * 1000); // 涔樹互1000灏嗙杞崲涓烘绉�
  // 鑾峰彇骞淬€佹湀銆佹棩
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0'); // 鏈堜唤浠�0寮€濮嬶紝闇€瑕佸姞1
  let day = String(date.getDate()).padStart(2, '0');
  let formattedDate = year + '-' + month + '-' + day;
  // 鏍煎紡鍖栨棩鏈熷瓧绗︿覆
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

    /*鎾斁鍣�*/
    .playVideo {
      width: 50%;
      height: 50%;

    }

    /*鎼滅储妗嗗拰闆嗘暟*/
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

        /**瓒呭嚭楂樺害鍚庣敤婊戣疆鏄剧ず*/
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

  /**瑙嗛淇℃伅**/
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

@media (max-width:600px) {
  .player {
    width: 100%;
    height: 85vh;
    background: rgba(00, 00, 00, 0.8);
    overflow: auto;

    /**鍐呭涓婂眰**/
    .top {
      display: block;
      height: auto;
      padding-top: 2rem;

      .video {
        width: 90%;
        margin: 0 auto;
        border: 0.1rem solid white;
      }

      .group {
        width: 100%;
        margin-left: 0rem;
        height: auto;

        /**杈撳叆妗嗘鏋�*/
        .searchInput {
          width: 100%;
        }

        /**闆嗘暟**/
        .collection {
          width: 70%;
          margin: 0 auto;
          display: block;
          text-align: left;

          .chapter {
            height: 5rem;
            width: 5rem;
            font-size: 1.2rem;
            margin-left: 0.1rem;
          }
        }
      }
    }

    /**瑙嗛璇︾粏淇℃伅**/
    .information {
      font-size: 1.2rem;
      width: auto;
      margin-top: 3rem;

      .pic {
        display: flex;
      }
    }
  }
}
</style>