<template>
    <div class="TabBar">
        <tab-bar-item path="/home">
            <template #item-icon>
                <img src="~/assets/img/tabbar/home.svg" alt="">
            </template>
            <template #item-active-icon>
                <img src="~/assets/img/tabbar/home-pink.svg" alt="">
            </template>
            <template #item-msg>
                <p>首页</p>
            </template>
        </tab-bar-item>
        <tab-bar-item path="/category">
            <template #item-active-icon>
                <img src="~/assets/img/tabbar/category-pink.svg" alt="">
            </template>
            <template #item-icon>
                <img src="~/assets/img/tabbar/category.svg" alt="">
            </template>
            <template #item-msg>
                <p>分类</p>
            </template>
        </tab-bar-item>
        <tab-bar-item path="/market">
            <template #item-icon>
                <img src="~/assets/img/tabbar/shopcart.svg" alt="">
            </template>
            <template #item-active-icon>
                <img src="~/assets/img/tabbar/shopcart-pink.svg" alt="">
            </template>
            <template #item-msg>
                <p>购物车</p>
            </template>
        </tab-bar-item>
        <tab-bar-item path="/profile">
            <template #item-icon>
                <img src="~/assets/img/tabbar/profile.svg" alt="">
            </template>
            <template #item-active-icon>
                <img src="~/assets/img/tabbar/profile-pink.svg" alt="">
            </template>
            <template #item-msg>
                <p>个人</p>
            </template>
        </tab-bar-item>
    </div>
</template>

<script>
    import TabBarItem from "./CommonTabBarItem"
    export default {
        name: "TabBar",
        components:{
            TabBarItem
        }
    }
</script>

<style scoped lang="less">
    .TabBar{
        display: flex;
        position: fixed;
        z-index: 1;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f8f8f8;
        box-shadow: 0 -2px 1px rgba(100,100,100,0.3);
    }
</style>
