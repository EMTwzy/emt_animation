<template>
    <div class="home">
        <!-- 查询 -->
        <el-input v-model="input" placeholder="找一部好番看看吧~" class="search"></el-input>
        <!-- 今日更新 -->
        <div class="today">
            <h3>今日更新</h3>
            <div class="today_content">

            </div>
        </div>
        <!-- 随机推荐 -->
        <div class="randomVideo">
            <div class="randomTitle">
                <h3>随机推荐
                    <span @click="more" class="more">查看更多</span>
                </h3>
            </div>

            <div class="random_content">
                <div v-for="v in randomVideo" :key="v.vid" class="video-item">
                    <div class="pic">
                        <img :src="v.vpic" alt="封面" v-if="v.vpic.length > 0">
                        <img src="../assets/load.jpg" v-else-if="!v.vpic.length > 0 || v.vpic == null" alt="封面">
                        <p style="width:9rem">{{ v.vname }}</p>
                        <p>{{ v.vnote }}</p>
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
                        <img :src="v.vpic" alt="封面" v-if="v.vpic.length > 0">
                        <img src="../assets/load.jpg" v-else-if="v.vpic.length == 0 || v.vpic == null" alt="封面">
                        <p style="width:9rem">{{ v.vname }}</p>
                        <p>{{ v.vnote }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: 'homeCompoents',
    setup() {
        const input = ref('');    //获取输入框输入数据

        const randomVideo = reactive([{
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
        const reZero = reactive([{
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
                    }).then((response) => {
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
            }).then((response) => {
                if (response.data != null) {
                    reZero.length = 0;
                    reZero.push(...response.data);
                }
            })

        })

        function more() {
            console.log("点击了查看更多");
        }
        const handleError = () => {
            randomVideo.forEach((item, index) => {
                // 直接修改数组元素以触发响应
                randomVideo[index] = { ...item, vpic: "" };
            });
        }


        return {
            input,
            randomVideo,
            reZero,
            more,
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

    /*添加滑轮效果*/
    /*搜索框*/
    .search {
        width: 30%;
        height: 3rem;
        margin-bottom: 3rem;
        opacity: 0.8;
    }

    /*今日更新*/
    .today {
        height: 5rem;
        width: 80%;
        background: rgba(00, 00, 00, 0.7);
        display: flex;
        flex: auto;
        justify-items: center;
        align-items: center;

        h3 {
            color: white;
            margin: 0 auto;
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

}</style>