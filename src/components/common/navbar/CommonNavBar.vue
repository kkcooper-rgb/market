<template>
    <div class="common-nav-bar">
        <div class="left">
            <slot name="left" />
        </div>
        <div class="middle">
            <slot name="middle" />
        </div>
        <!-- 占位 使middle css flex：1 保持居中 -->
        <div class="right">
            <slot name="right" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommonNavBar"
    }
</script>

<style scoped lang="less">
    .common-nav-bar{
        display: flex;
        position: relative;
        z-index: 10;
        height: 44px;
        box-shadow: 0 1px 1px rgba(100, 1000, 100, 0.1);
        background-color: #fff;
        text-align: center;
        line-height: 44px;
        font-size: 17px;
        .left,.right{
            width: 60px;
        }
        .middle{
            flex: 1;
        }
    }
</style>
