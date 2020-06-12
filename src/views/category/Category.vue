<template>
    <div class="category">
        <common-nav-bar>
            <template #middle>分类</template>
        </common-nav-bar>
        <!-- 左侧导航栏 + 滚动区 -->
        <common-scroll class="container1">
            <category-left-nav :categorys="category" @itemClick="itemClick"/>
        </common-scroll>
    </div>
</template>

<script>
    import {reqCategory,reqSubcategory}from "../../api/category"
    import CommonNavBar from "../../components/common/navbar/CommonNavBar";
    import CategoryLeftNav from "./base/CategoryLeftNav";
    import CommonScroll from "../../components/common/myScroll/CommonScroll";
    export default {
        name: "Category",
        components:{
            CommonNavBar,
            CategoryLeftNav,
            CommonScroll
        },
        data(){
            return{
                category:[],// 存储左侧滚动区域的数据
                currentIndex:0,  // 记录leftnav点击的index值
            }
        },
        created() {
            // 初始化时候获取数据
            this.getCategory()
        },
        methods:{
            // 初始化时候获取数据
            async getCategory(){
                const result = await reqCategory();
                // console.log(result);
                // 请求左侧导航栏的数据 给leftNav渲染
                this.category= result.data.category.list
            },
            itemClick(index){

            }
        }
    }
</script>

<style lang="less" scoped>

    @import '~assets/css/varible.less';
    // 在使用该组件是可以获取common-nav-bar的第一个类名的
    .common-nav-bar {
        background-color: @themeColor;
        color: #fff;
        z-index: 1;
    }

    // 当使用了两个相同的better-scroll组件的时候 那么类名会重复  所以需要给他们不同的类名
    // 在本组件中重新给定类名

    // 设置滚动区域的高度
    .container1{
        position: fixed;
        top: 44px;
        bottom: 48px;
        width: 100px;
    }

    .container2{
        position: fixed;
        top: 44px;
        bottom: 48px;
        // 让盒子的left值距离左侧100px  然后right铺满值最右边
        left: 100px;
        right: 0;
    }

</style>
