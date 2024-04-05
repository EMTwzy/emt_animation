<template>
    <div class="header">
        <!-- 莉亚 -->
        <el-tooltip class="item" effect="dark" content="emilia~" placement="right-end">
            <img src="../assets/emilia.png" id="emilia">
        </el-tooltip>
        <!-- 网站主题 -->
        
        <el-tooltip class="item" effect="dark" content="主页" placement="right-end">
            <h3>
                <router-link to="/home" style="text-decoration:none">EMT</router-link>
            </h3>
        </el-tooltip>
        
        <!-- 个人 -->
        <el-tooltip class="item" effect="dark" content="手机端" placement="bottom">
            <a href="https://apps.seepine.com/app/533159022497861"><img src="../assets/default_user.jpg" alt="user" id="user"></a>
        </el-tooltip>
        
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
    margin-bottom: 4rem;
    display: flex;
    flex: auto;
    justify-items: center;
    align-items: center;
    width: 100%;
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
    .item{
        a{
            list-style: none;
            border-bottom: none;
        }
    }
    @media (max-width:600px) {
        #emilia{
            width: 11rem;
            height: 15rem;
            top: 0rem;
        }
        h3{
            margin-left: 1rem;
            font-size: 3rem;
            
        }
        #user{
            margin-left: 0rem;
        }
        
    }
}

</style>