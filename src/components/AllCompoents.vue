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
    </div>
  </div>
</template>

<script>
import {reactive,ref} from 'vue';
import axios from 'axios';

export default {
    name:'AllComponents',
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
        const selected_year=ref(time.value[0]);
        const selected_addr=ref(addr.value[0]);
        const selected_lang=ref(lang.value[0]);
        var search_key={
          year:'',   //年份
          addr:'',   //地区
          lang:'',   //语言
        }
        

        //根据tags查找
        function search_tags(value){
          time.value.forEach((item)=>{
            item==value?(search_key.year=selected_year.value=value):'';
          })
          addr.value.forEach((item)=>{
            item==value?(search_key.addr=selected_addr.value=value):'';
          })
          lang.value.forEach((item)=>{
            item==value?(search_key.lang=selected_lang.value=value):'';
          })
          

        }

        // 按年份查找
        function search_year(year){
          search_key.year=year;
          }
          /*
          if(year !=null &&year.length>0){
            let key=year;
              axios.get('http://localhost:8080/searchByYear',{
                params:{
                  year:key
                }
              }).then((response)=>{
                if(response.data.length>0){
                  console.log('@@@',response.data);
                }
              })
          }*/

        
        

        return{
          search_year,
          search_tags,
          time,addr,lang,
          selected_year,selected_addr,selected_lang,
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
  }
</style>