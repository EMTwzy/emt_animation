<template>
    <div class="video_item">
        <div class="pic">
            <slot name="cover">
                <img :src="coverSrc" alt="封面">
            </slot>
            <p style="width:9rem;margin:0 auto">{{ videoName }}</p>
            <p style="margin:0 auto">{{ videoNote }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'video_item',
    setup() {
        return {
            coverSrc: String,
            videoName: String,
            videoNote: String,
        }

    }
}
</script>

<style scoped lang="less">
.video_item {}
</style>