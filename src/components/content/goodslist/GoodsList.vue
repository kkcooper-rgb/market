<template>
    <div class="goods-list">
        <goods-list-item v-for="(item,index) in goods" :itemData="item" :key="index"/>
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
        components:{
            GoodsListItem
        },
        props:{
            goods:Array,
            default(){
                return []
            }
        }
    }
</script>

<style scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-top: 15px;
    }
</style>
