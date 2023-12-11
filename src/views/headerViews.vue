<template>
    <div class="header">
        <!-- 莉亚 -->
        <img src="../assets/emilia.png" id="emilia">
        <!-- 网站主题 -->
        <h3>EMT</h3>
        <!-- 个人 -->
        <img src="../assets/default_user.jpeg" alt="user" id="user">
    </div>
</template>

<script>
export default {
    name:'HeaderViews',
    setup(){

    }
}
</script>

<style scoped lang="less">
.header{
    height: 7rem;
    background-color:rgba(202, 140, 202, 0.5);
    margin-top: 4rem;
    margin-bottom: 5rem;
    display: flex;
    flex: auto;
    justify-items: center;
    align-items: center;
    #emilia{
        width: 16rem;
        height: 22rem;
        position: relative;
        top: 4rem;
    }
    h3{
        color: purple;
        margin-left: 22rem;
        font-size: 7rem;
        font-style: italic;
        letter-spacing: 5rem;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9); /* 添加阴影效果 */
    }
    #user{
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        margin-left: 25rem;
    }
}

</style>