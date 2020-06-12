<template>
    <div class='market-bottom-bar'>
        <select-box class="bottom-menu" @click.native="selectAll" :checked="isCheckAll"/>
        <span class="all">全选</span>
        <span class="total-price">合计：<span class="price">¥ {{total.toFixed(2)}}</span></span>
        <img src="~assets/img/market/delete.svg" alt="" class="del" @click="handelDel">
        <span class="buy-product" @click="payOut">去计算({{selectProductsLength}})</span>
        <!-- <toast ref="toast"/> -->
    </div>
</template>

<script>
    import SelectBox from "./SelectBox";
    import {mapGetters,mapMutations}from"vuex"
    export default {
        name: "MarketBottomBar",
        components:{
            SelectBox
        },
        methods:{
            ...mapMutations(["updateProductAllCheck","deleteProducts"]),
            selectAll(){
                this.updateProductAllCheck(!this.isCheckAll)
            },
            handelDel(){
                this.deleteProducts()
            },
            payOut(){
                // 插件形式
                this.$toast.show(`商品总和为${this.total.toFixed(2)}`)
            }
        },
        computed:{
            ...mapGetters(["isCheckAll","selectProductsLength","total"])
        }
    }
</script>

<style lang='less' scoped>
    .market-bottom-bar {
        width: 100%;
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 48px;
        line-height: 48px;
        background-color: #fff;
        font-size: 14px;
        box-shadow: 0 -1px 0px rgba(0, 0, 0, .2);
        padding-left: 10px;
        box-sizing: border-box;
        .bottom-menu{
            position: absolute;  // 相对于父级定位
            line-height: 0;
            left: 12px;
            top: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            img{
                width: 20px;
            }
        }
        .all{
            margin-left: 34px;
        }
        .total-price{
            margin-left: 10px;
            .price{
                color: red;
            }
        }
        .buy-product{
            float: right;
            padding: 0 15px;
            text-align: center;
            color: #fff;
            background-color: #faa015;
        }
        .del{
            width: 20px;
            position: relative;
            top: 5px;
            margin-left: 15px;
        }

    }
</style>
