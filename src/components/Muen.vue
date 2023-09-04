<template>
    <div id="Muen">
        <div class="Muen_content">
            <a href="" class="one">首页</a>
            <a href="">新番表</a>
            <a href="">剧场版</a>
            <a href="">分类</a>
        </div>

    </div>
</template>

<script>


export default {
    name: 'Muen',

}
</script>

<style scoped>
#Muen {
    background: skyblue;
}

.Muen_content{
    width: 75%;
    margin: 0 auto;
    height: 0.5rem;

}
a {
    width: 2rem;
    height: 0.5rem;
    display: block;
    float: left;
    border-left: 1px solid purple;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.5rem;
    color: white;
    text-decoration: none;
}
a:hover{
    background: rgb(26, 0, 26);
}
.one{
    margin-left: 1.5rem;
}
</style>