<template>
  <div class="all">
    <div class="tags">
      <el-form-item label="按年份查找">
        <a @click="search_tags(v)" v-for="v in time" :key="v" class="year" :class="{'selected':v==selected_year}">
          {{v}}
        </a>
      </el-form-item>
      <el-form-item label="按语言查找">
        <a @click="search_tags(v)" v-for="v in lang" :key="v" class="year" :class="{'selected':v==selected_lang}">
          {{v}}
        </a>
      </el-form-item>
      <el-form-item label="按地区查找">
        <a @click="search_tags(v)" v-for="v in addr" :key="v" class="year" :class="{'selected':v==selected_addr}">
          {{v}}
        </a>
      </el-form-item>
      <el-form-item label="首字母查找">
        <a @click="search_tags(v)" v-for="v in letter" :key="v" class="year" :class="{'selected':v==selected_letter}">
          {{v}}
        </a>
      </el-form-item>
    </div>
    <!-- 查询 -->
    <div style="text-align:right">
      <!-- <el-input v-model="input" placeholder="找一部好番看看吧~" class="search" ></el-input> -->
      <inputSearch></inputSearch>
    </div>
    
    <div class="video_content">
        <div class="video_item" v-for="v in videoData" :key="v.vid">
          <div class="pic">
            <img :src="v.vpic" alt="封面" v-if="v.vpic.length > 0">
            <img src="../assets/load.jpg" v-else-if="v.vpic.length == 0 || v.vpic == null" alt="封面">
            <p style="width:9rem;margin:0 auto;">{{ v.vname }}</p>
            <p>{{ v.vnote }}</p>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive,ref} from 'vue';
import axios from 'axios';
import inputSearch from '@/components/inputSearch.vue';

export default {
    name:'AllViews',
    components:{inputSearch},
    setup() {
        let year=ref(new Date().getFullYear());
        const time=ref([           //初始化年份数据
          year.value,year.value-1,year.value-2,year.value-3,year.value-4,year.value-5,year.value-6,year.value-7,year.value-8,"更早以前"
        ]);
        const addr=ref([           //初始化地区数据
          '日韩','中国','欧美'
        ]);
        const lang=ref([          //初始化语言数据
          '日语','中文','其他'
        ]);
        const letter=ref([        //初始化作品开头字母数据
          'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
        ]);
        const input=ref('');      //获取输入框数据
        const selected_year=ref('');   //被选年
        const selected_addr=ref('');   //被选地址
        const selected_lang=ref('');   //被选语言
        const selected_letter=ref(''); //被选首字母类别
        var search_key={
          year:'',   //年份
          addr:'',   //地区
          lang:'',   //语言
          letter:'', //首字母
        }
        const page=reactive({
          pageNum:1,//页码数
          pageTotal:0,//总页数
        });                            
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
        
        onMounted(()=>{
          search_tags(1);
        })

        //根据tags查找
        function search_tags(value){
        let page_ok=true;
          time.value.forEach((item)=>{
            if(item==value){
              search_key.year=selected_year.value=value;
              page_ok=false;
            }
          })
          addr.value.forEach((item)=>{
            if(item==value){
              search_key.addr=selected_addr.value=value;
              page_ok=false;
            }
          })
          lang.value.forEach((item)=>{
            if(item==value){
              search_key.lang=selected_lang.value=value;
              page_ok=false;}

          })
          letter.value.forEach((item)=>{
            if(item==value){
              search_key.letter=selected_letter.value=value;
              page_ok=false;
            }
          })
          if(page_ok){
            page.pageNum=value;
          }
          console.log(search_key,page.pageNum);

          axios.get("http://localhost:8080/selectVideo",{
            params:{
              lang:search_key.lang,
              publishyear:search_key.year,
              publisharea:search_key.addr,
              letter:search_key.letter,
              pageNum:page.pageNum
            }
          }).then((response)=>{
            videoData.length=0;        //每次获取数据前先清空数组
            videoData.push(...response.data)        //将数据填充进数组内
            videoData.forEach((item) => {
                    axios.get("http://localhost:8080/picUtils", {
                        params: {
                            vpic: item.vpic
                        }
                    }).then((response) => {
                        if (!response.data)
                            item.vpic = '';
                    })
                })
          })
          

        }

        

        
        

        return{
          search_tags,
          time,addr,lang,page,letter,input,
          selected_year,selected_addr,selected_lang,selected_letter,
          videoData,
        }
    }
}
</script>

<style lang="less" scoped>
  .all{
    width: 80%;
    background-color: rgba(00, 00, 00, 0.7);
    margin: 0 auto;
    font-size: 1.2rem;
    
    .tags{
      color: white;
      margin-left: 2rem;
      margin-top: 2rem;
      .selected{
        color: red;
      }
        .year{
          margin-left: 1rem;
          font-size: 1.2rem;
          cursor: pointer;      /*定义鼠标样式*/
        }
    }

    .video_content{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .video_item{
        flex: 0 0 20%;
        /* 让每个项目占据 20% 的宽度，一行显示 5 个项目 */
        margin-top: 0.5rem;
        color: white;
        font-size: 1rem;
        
        .pic {
            text-align: center;

            img {
                width: 9rem;
                height: 11rem;
            }
        }
      }
    }

  }
</style>