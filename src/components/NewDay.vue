<template>
    <div id="newDay">
        <div class="newDay_top">
            <span>今日更新</span>
            <a href="" class="day">七</a>
            <a href="" class="day">六</a>
            <a href="" class="day">五</a>
            <a href="" class="day">四</a>
            <a href="" class="day">三</a>
            <a href="" class="day">二</a>
            <a href="" class="day">一</a>
        </div>
        <!-- 内容 -->
        <div class="newDay_content">
            <ul>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewDay',
    data:{
        animation:[
            {id:'001',name:'111',cover:'111'}
        ]
    }

}
</script>

<style scoped>
#newDay {
    font-size: 0.2rem;
}

.newDay_top {
    width: 60%;
    margin: 0 auto;
}

.newDay_top span {
    color: #ccc;
}

.newDay_top a {
    color: #ccc;
    border: 1px solid white;
    float: right;
    margin-left: 0.1rem;
}
</style>