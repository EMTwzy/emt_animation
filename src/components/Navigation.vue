<template>
    <div id="Navigation">
        <div class="Navigation_content">
                <div class="emt">Emilia Maji Tenshi</div>
            <input type="text" placeholder="愿精灵保佑你~" id="Search">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navigation',
}
</script>

<style scoped>
/*      设置导航栏整体        */
#Navigation {
    width: 100%;
    height: 0.8rem;
    color: white;
}
/**     设置导航栏内部        */
.Navigation_content{
    width: 75%;
    height: 0.8rem;
    margin: 0 auto;
    position: relative;
}
.emt{
    width: 5rem;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.4rem;
    padding-top: 0.2rem;
    padding-left: 0.68rem;
}

#Search {
    height: 0.3rem;
    width: 2.4rem;
    font-size: 0.15rem;
    position: absolute;
    top: 0.2rem;
    right: 1.71rem;
}
</style>