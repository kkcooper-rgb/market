<template>
    <div class="category">
        <common-nav-bar>
            <template #middle>分类</template>
        </common-nav-bar>
        <!-- 左侧导航栏 + 滚动区 -->
        <common-scroll class="container1">
            <category-left-nav :categorys="categorys" @itemClick="itemClick"/>
        </common-scroll>
        <!-- 右侧滚动区 -->
        <common-scroll class="container2">
            <category-grid-view :subcategory="subcategory"  :cols="3"/>
            <tab-control :titles="Object.values(types)" @tabClick="tabClick"/>
            <goods-list :goods="goods[currentType].list"/>
        </common-scroll>
    </div>
</template>

<script>
    import {reqCategory,reqSubcategory,reqCategoryDetail}from "../../api/category"
    import CommonNavBar from "components/common/navbar/CommonNavBar";
    import CommonScroll from "components/common/myScroll/CommonScroll";
    import CategoryLeftNav from "./base/CategoryLeftNav";
    import CategoryGridView from "./base/CategoryGridView";
    import TabControl from "../../components/content/tabcontrol/TabControl";
    import GoodsList from "../../components/content/goodslist/GoodsList";
    export default {
        name: "Category",
        components:{
            CommonNavBar,
            CategoryLeftNav,
            CommonScroll,
            CategoryGridView,
            TabControl,
            GoodsList
        },
        data(){
            return{
                categorys:[],// 存储左侧滚动区域的数据
                subcategory:[], // 储存右侧subcategory(顶部)的数据
                currentIndex:0,  // 记录leftnav点击的index值
                currentType:'pop',
                // typeList:['pop','new','sell'],  // 定义商品类型的数据
                types:{
                    pop:'综合',
                    new:'新品',
                    sell:'精选'
                },
                goods: {        // 存放商品数据
                    pop: {
                        list: [],   // 流行选项  对应的数据
                    },
                    new: {
                        list: [],   // 新款的数据
                    },
                    sell: {
                        list: [],   // 精选的数据
                    }
                }
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
                this.categorys = result.data.category.list;
                //请求右侧格子的数据
                this.getSubcategory();
                //请求右侧下面的数据  用于渲染GoodsList  基于指定商品的miniWallkey
                // this.getSubcategoryDetail("pop");
                // this.getSubcategoryDetail("sell");
                // this.getSubcategoryDetail("new");
                Object.keys(this.types).forEach(type=>this.getSubcategoryDetail(type))
            },
            itemClick(index){
                if(index===this.currentIndex)return ; //  当已经点击了左侧分类的按钮时候，第二次就不再获取数据了
                // 在本组件用以一个值记录着你当前点击左侧导航栏下的categorys数组对应的索引
                this.currentIndex = index;
                // 点击的时候获取上面的数据  CategoryGridView渲染
                this.getSubcategory();
                // 简写 请求右侧下面的数据 渲染goodList组件 基于指定商品的miniWallKey值
                Object.keys(this.types).forEach(type=>this.getSubcategoryDetail(type));//请求右侧下面的数据  用于渲染GoodsList  基于指定商品的miniWallkey

            },
            async getSubcategory(){
                const {maitKey} = this.categorys[this.currentIndex];
                const result = await reqSubcategory(maitKey);
                this.subcategory = result.data.list;

            },
            tabClick(index){
                // 点击的时候改变typeList的值 根据商品类型不同然后显示不同的数据
                // this.currentType = this.typeList[index];
                this.currentType = Object.keys(this.types)[index];
            },
            async getSubcategoryDetail(type){
                const {miniWallkey} = this.categorys[this.currentIndex];
                const result = await reqCategoryDetail(miniWallkey,type);
                this.goods[type].list = result; // 将结果赋值给goods对应的数组中
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
