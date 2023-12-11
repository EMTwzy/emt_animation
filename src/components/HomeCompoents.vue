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
    </div>
</template>

<script>
import {ref} from 'vue';

export default {
    name: 'homeCompoents',
    setup() {
        const input=ref('');


        return {
            input,
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
    overflow: auto;         /*添加滑轮效果*/
    /*搜索框*/
    .search{
        width: 30%;
        height: 3rem;
        margin-bottom:3rem ;
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

}
</style>