<template>
    <div class="home">
        <!-- 顶部导航栏 -->
        <common-nav-bar>
            <template #middle>购 物 街</template>
        </common-nav-bar>
        <tab-control ref="tabControl1" :titles='Object.values(this.type)' @tabClick="tabClick" v-show="isShowTabControl"/>
        <!-- 使用封装的滚动组件 -->
        <common-scroll @loadMore="loadMore" ref="scroll" @getPosition="getPosition">
            <!--轮播图组件 将获得到的banner传递给子组件-->
            <common-swiper :banner="banner"/>
            <!-- 推荐组件 将获得到的recommend传递给子组件 -->
            <recommend :recommend="recommend"/>
            <!-- 流行组件 -->
            <popular/>
            <!--切换显示内容的组件-->
            <!--<tab-control :titles='["流行","新款","精选"]' @tabClick="tabClick"/>-->
            <tab-control ref="tabControl2" :titles='Object.values(this.type)' @tabClick="tabClick"/>
            <!--商品列表组件 -->
            <goods-list :goods="goods[currentType].list"/>
        </common-scroll>
        <!-- 返回首页 -->
        <!-- <back-top @click.native="backTop" /> -->
        <back-top @backTop="backTop" v-show="isShow" />
    </div>
</template>

<script>
    import {reqHomeMultidata, reqHomeGoods} from "../../api/home"
    import CommonNavBar from "../../components/common/navbar/CommonNavBar";
    import CommonSwiper from "../../components/common/swiper/CommonSwiper";
    import Recommend from "./base/Recommend";
    import Popular from "./base/Popular";
    import CommonScroll from "../../components/common/myScroll/CommonScroll";
    import TabControl from "../../components/content/tabcontrol/TabControl";
    import GoodsList from "../../components/content/goodslist/GoodsList";
    import BackTop from "../../components/content/backtop/BackTop";

    export default {
        name: 'Home',
        components: {
            CommonNavBar,
            CommonSwiper,
            Recommend,
            Popular,
            CommonScroll,
            TabControl,
            GoodsList,
            BackTop
        },
        data() {
            return {
                banner: [],// 轮播图数据
                recommend: [],// 推荐数据
                currentType:"pop",//记录tab切换的类型
                isShowTabControl:false,//初始不显示第一个TabControl组件
                isShow:false,//初始的返回顶部按钮不显示
                // typeList:["pop","new","sell"],//父组件传递的数据类型
                type:{
                  pop:"流行",
                  new:"新款",
                  sell:"精选"
                },
                goods: {        // 存放商品数据
                    pop: {
                        list: [],   // 流行选项  对应的数据
                        page: 1     // 记录请求了第几页的流行数据
                    },
                    new: {
                        list: [],   // 新款的数据
                        page: 1
                    },
                    sell: {
                        list: [],   // 精选的数据
                        page: 1
                    }
                }
            }
        }

        ,
        created() {
            this.getHomeMultidata();
            //传递type参数  请求初始的分类的不同数据
            // this.getHomeGoods("pop");
            // this.getHomeGoods("new");
            // this.getHomeGoods("sell");
            Object.keys(this.type).forEach(type=>this.getHomeGoods(type))
        },
        methods: {
            //获取首页的数据
            async getHomeMultidata() {
                const result = await reqHomeMultidata();
                // console.log(result);
                //轮播图数据
                this.banner = result.data.banner.list.map(item=>item.image);
                //推荐数据
                this.recommend = result.data.recommend.list
            },
            //获取goods中分类的pop new sell 数据
            async getHomeGoods(type,) {
                //获取goods中分类的页数
                const page = this.goods[type].page;
                const result = await reqHomeGoods(type, page);
                //把数组展开丢进对应type数据数组中
                this.goods[type].list.push(...result.data.list);
            },
            tabClick(index){
                // 保持两个TabControl组件的行为一致 父组件修改子组件数据
                this.$refs.tabControl1.currentIndex = this.$refs.tabControl2.currentIndex = index
                // this.currentType = this.typeList[index]
                this.currentType = Object.keys(this.type)[index]
            },
            // 加载更多对应类型的数据 这个函数是在scroll触发的 那么就要在scroll组件上绑事件
            loadMore(){
                // 加载额外的30条数据
                this.getHomeGoods(this.currentType);
                // 让page数+1
                this.goods[this.currentType].page++
            },
            //吸顶效果
            getPosition(position){
                //滚动tab吸顶
                const positionY = -position.y;
                this.isShowTabControl = positionY>=this.$refs.tabControl2.$el.offsetTop;
                //返回顶部按钮的数据
                positionY>=600?this.isShow = true:this.isShow = false
            },
            backTop(){
                //回到顶部
                this.$refs.scroll.scroll.scrollTo(0,0,1000)
            }
        }
    }
</script>
<style scoped lang="less">
    @import '~assets/css/varible.less';

    .home {
        // 在使用该组件是可以获取common-nav-bar的第一个类名的
        .common-nav-bar {
            background-color: @themeColor;
            color: #fff;

        }

        // 设置myScroll组件的样式 可以获取myScroll的第一个类名
        .wrapper {
            position: fixed;
            top: 44px;
            bottom: 48px;
            left: 0;
            right: 0;
        }
    }
</style>
