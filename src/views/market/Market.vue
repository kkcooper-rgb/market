<template>
    <div class="market">
        <common-nav-bar>
            <template #middle>购物车({{$store.getters.productsLength}})</template>
        </common-nav-bar>
        <common-scroll>
            <market-product-list/>
        </common-scroll>
        <market-bottom-bar/>
    </div>
</template>

<script>
    import CommonNavBar from "../../components/common/navbar/CommonNavBar";
    import CommonScroll from "../../components/common/myScroll/CommonScroll";
    import MarketProductList from "./base/MarketProductList";
    import MarketBottomBar from "./base/MarketBottomBar";
    export default {
        name: "Market",
        components:{
            CommonNavBar,
            CommonScroll,
            MarketProductList,
            MarketBottomBar
        }
    }
</script>

<style scoped lang="less">
    @import '~assets/css/varible.less';
    // 在使用该组件是可以获取common-nav-bar的第一个类名的
    .common-nav-bar {
        background-color: @themeColor;
        color: #fff;
        z-index: 1;
    }

    .wrapper{
        position: fixed;
        top:44px;
    // bottom:48px;
        bottom: 99px;
        left:0;
        right:0;
    }
</style>
