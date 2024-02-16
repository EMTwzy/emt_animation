<template>
  <div class="footer">
    <div class="emilia_Q">
        <img src="../assets/emilia_Q.png" alt="emiliaQ" style="width:5rem;margin-right:1rem">
    </div>
    <div class="content">
        <p>请勿相信视频内中的一切广告，如有损失，请恕本人概不负责</p>
        <p>本站仅供娱乐、学习，一切资源来源于网络，若有冒犯，还请见谅</p>
        <p>有什么建议可向emt1731041348@outlook.com传达</p>
        <a href="https://beian.miit.gov.cn/" target="_blank" style="color:white;">赣ICP备2024023067号</a>
    </div>
  </div>
</template>

<script>
export default {
    name:'footerComponents',
    setup(){

    }
}
</script>

<style lang="less" scoped>
    .footer{
        margin-top: 2rem;
        background-color: black;
        color: white;
        height: 9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .content{
            text-align: center;
        }
    }
</style>