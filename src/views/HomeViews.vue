<template>
    <div class="home">
        <!-- 查询 -->
        <!-- <el-input v-model="input" placeholder="找一部好番看看吧~" class="search"></el-input> -->
        <div style="width:100%;text-align:center">
            <inputSearch></inputSearch>
        </div>

        <!-- 今日更新 -->
        <div class="today">
            <h3>今日更新</h3>
            <div class="week">
                    <div v-for="v in inintWeek" :key="v" class="weekNum" @click="selectWeek(v)" :class="{'active':v===activeName}">
                        {{ v }}
                    </div>
                </div>

            <div class="today_content">
                <div v-for="v in weekVideo" :key="v.vid" class="video-item">
                    <div class="pic">
                        <img :src="v.vpic" alt="封面" v-if="v.vpic.length > 0" @click="toPlay(v.vid)" style="cursor: pointer;">
                        <img src="../assets/load.jpg" v-else-if="v.vpic.length == 0 || v.vpic == null" alt="封面" @click="toPlay(v.vid)">
                        <p style="width:9rem;margin:0 auto;cursor: pointer;" @click="toPlay(v.vid)">{{ v.vname }}</p>
                        <p style="margin:0 auto">{{ v.vnote }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 随机推荐 -->
        <div class="randomVideo">
            <div class="randomTitle">
                <h3>
                    <span style="margin-left:5rem">随机推荐</span>
                    
                    <span @click="more" class="more">查看更多</span>
                </h3>
            </div>

            <div class="random_content">
                <div v-for="v in randomVideo" :key="v.vid" class="video-item">
                    <div class="pic">
                        <img :src="v.vpic" alt="封面" v-if="v.vpic.length > 0" @click="toPlay(v.vid)" style="cursor: pointer;">
                        <img src="../assets/load.jpg" v-else-if="v.vpic.length == 0 || v.vpic == null" alt="封面" @click="toPlay(v.vid)">
                        <p style="width:9rem;margin:0 auto;cursor: pointer;" @click="toPlay(v.vid)">{{ v.vname }}</p>
                        <p style="margin:0 auto">{{ v.vnote }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 从零主题板块 -->
        <div class="reZero">
            <h3>Re:从零开始的异世界生活</h3>
            <div class="reThem">
                <div v-for="v in reZero" :key="v.vid" class="video-item">
                    <div class="pic">
                        <img :src="v.vpic" alt="封面" v-if="v.vpic.length > 0" @click="toPlay(v.vid)" style="cursor: pointer;">
                        <img src="../assets/load.jpg" v-else-if="v.vpic.length == 0 || v.vpic == null" alt="封面" @click="toPlay(v.vid)">
                        <p style="width:9rem;margin:0 auto;cursor: pointer;" @click="toPlay(v.vid)">{{ v.vname }}</p>
                        <p style="margin:0 auto">{{ v.vnote }}</p>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted, inject, ref } from 'vue';
import axios from 'axios';
import inputSearch from '@/components/inputSearch.vue';

export default {
    name: 'homeCompoents',
    components: { inputSearch },
    setup() {
        let day = new Date();
        
        const inintWeek=reactive(["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]);
        const activeName = ref(inintWeek[day.getDay()]);             //默认展示今天的番剧

        const router = inject('router'); // 注入全局的路由实例
        function initObject() {
            return reactive([{
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
        }
        const weekVideo = initObject();
        const randomVideo = initObject();
        const reZero = initObject();
        // 挂载完成后
        onMounted(() => {
            
            //随机推荐
            axios.get("http://localhost:8080/randomVideo").then((response) => {
                randomVideo.length = 0; // 清空数组，以便重新填充

                randomVideo.push(...response.data);
                randomVideo.forEach((item) => {
                    axios.get("http://localhost:8080/picUtils", {
                        params: {
                            vpic: item.vpic
                        }
                    },setTimeout(5000)).then((response) => {
                        console.log("test@@@@", response.data);
                        if (!response.data)
                            item.vpic = '';
                    })
                })
            });
            //从零主题
            axios.get("http://localhost:8080/selectVideoByName", {
                params: {
                    name: '从零开始的异世界生活'
                }
            },setTimeout(5000)).then((response) => {
                if (response.data != null) {
                    reZero.length = 0;
                    reZero.push(...response.data);
                }
            })
            newDay();
            console.log("111111",inintWeek.indexOf(activeName.value));
            console.log("22222",activeName);
        })

        //每周更新榜单
        function newDay(){
            axios.get("http://localhost:8080/weekNew", {
                params: {
                    day: (inintWeek.indexOf(activeName.value))+1
                }
            }).then((response) => {
                if (response.data != null) {
                    weekVideo.length = 0;
                    weekVideo.push(...response.data);
                    weekVideo.forEach((item) => {
                        axios.get("http://localhost:8080/picUtils", {
                            params: {
                                vpic: item.vpic
                            }
                        }).then((response) => {
                            if (!response.data)
                                item.vpic = ''
                        })
                    })
                }
            })
        }
        //选择星期数
        function selectWeek(day){
            activeName.value=day;
            newDay();     //显示指定星期的番剧数据
            console.log(day);
        }

        // 查看更多  分类大全 
        const more = function () {
            console.log("点击了查看更多");
            router.push('/all');

        }
        const handleError = () => {
            randomVideo.forEach((item, index) => {
                // 直接修改数组元素以触发响应
                randomVideo[index] = { ...item, vpic: "" };
            });
        }

        //前往播放界面
        function toPlay(id){
            localStorage.setItem('playId',id);
            router.push('/play');
        }

        return {
            activeName,inintWeek,
            randomVideo, reZero, weekVideo,
            more, newDay,selectWeek,toPlay,
            handleError
        }
    }

}
</script>

<style lang="less" scoped>
.home {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;

    /*搜索框*/
    .search {
        width: 30%;
        height: 3rem;
        margin-bottom: 3rem;
        opacity: 0.8;
    }

    /*今日更新*/
    .today {
        width: 80%;
        background: rgba(00, 00, 00, 0.7);
        

        h3 {
            color: white;
            margin: 0 auto;
            width: 100%;
            text-align: center;
        }
        .week{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1rem;
            .weekNum{
                color: #fff;
                padding:0.5rem ;
                margin-right: 0.1rem;
                cursor: pointer;
                border: 0.1rem solid #ffffff;
                border-radius: 20%;
            }
            .weekNum:hover{
                background-color: rgba(204, 113, 234, 0.389);
            }
            .active{
                border: none;
                border-radius: none;
                color: red;
            }
        }
        .today_content{
            display: flex;
            flex-wrap: wrap;
            color: #fff;
        }
    }

    /*视频模块*/
    .video-item {
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

    /*随机推荐*/
    .randomVideo {
        margin-top: 1rem;
        width: 80%;
        background: rgba(00, 00, 00, 0.7);

        .random_content {
            display: flex;
            flex-wrap: wrap;
            color: #fff;
        }

        h3 {
            color: white;
            margin: 0 auto;
            text-align: center;
            padding: 1rem;
        }

        /*查看更多*/
        .more {
            color: red;
            font-style: italic;
            float: right;
            cursor: pointer;
        }
    }

    /*从零模块*/
    .reZero {
        margin-top: 1rem;
        width: 80%;
        background: rgba(00, 00, 00, 0.7);

        .reThem {
            display: flex;
            flex-wrap: wrap;
            color: #fff;
        }

        h3 {
            color: white;
            margin: 0 auto;
            text-align: center;
            padding: 1rem;
        }
    }

}
</style>