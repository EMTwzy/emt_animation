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
            <h3>随机推荐</h3>
            <div class="random_content">
                <div v-for="v in randomVideo" :key="v.vid" class="video-item">
                    <div class="pic">
                        <img :src="v.vpic" alt="封面" @error="handleError" srcset="../assets/load.jpg">
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
            v_id: 0,//作品编号
            v_name: '',//作品名称
            v_state: 0,//作品状态（集数）
            v_pic: '',//作品封面
            v_actor: '',//声优
            v_publishyear: 0,//上映时间（年份）
            v_publisharea: '',//上映地区（制作国）
            v_addtime: '',//添加时间（时间戳）
            v_note: '',//更新状态
            v_letter: '',//作品开头字母
            v_director: '',//制作人
            v_lang: '',//语种（作品语类）
        }])
        // 挂载完成后
        onMounted(() => {
            axios.get("http://localhost:8080/randomVideo").then((response) => {
                randomVideo.length = 0; // 清空数组，以便重新填充
                randomVideo.push(...response.data);
                console.log(randomVideo[0].vpic);
            })

        })
        const handleError = () => {
            randomVideo.forEach((item, index) => {
                // 直接修改数组元素以触发响应
                randomVideo[index] = { ...item, vpic: "../assets/load.jpg" };
            });
        }


        return {
            input,
            randomVideo,
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

    /*随机推荐*/
    .randomVideo {
        margin-top: 1rem;
        width: 80%;

        .random_content {
            display: flex;
            flex-wrap: wrap;
            background: rgba(00, 00, 00, 0.7);

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


            color: #fff;
        }

        h3 {
            color: white;
            margin: 0 auto;
            text-align: center;
        }
    }

}</style>