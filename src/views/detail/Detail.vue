<template>
    <div class="detail">
        <detail-nav-bar @itemClick="itemClick" ref="navbar"/>
        <common-scroll ref="scroll" @getPosition="getPosition">
            <!-- 轮播图 传递数据-->
            <common-swiper :banner="banner" :padding-bottom="'80%'"/>
            <!-- 商品信息 -->
            <detail-goods-info :goods-info="goodsInfo"/>
            <!-- 商家信息 遵循风格指南烤串形式-->
            <detail-shop-info :shop-info="shopInfo" />
            <!-- 商品图片信息 -->
            <detail-img-info :detail-img-info="detailImgInfo" @imgLoad="imgLoad"/>
            <!-- 尺寸信息 -->
            <detail-params :params-info="paramsInfo" ref="params" />
            <!-- 评论信息 -->
            <detail-comment-info :comment-info="commentInfo" ref="comment" />
            <!-- 推荐 -->
            <goods-list :goods="recommendInfo" ref="recommend" />
        </common-scroll>
        <!-- 底部导航组件 -->
        <detail-bottom-bar @addMarket="addMarket"/>
        <!--返回-->
        <back-top @backTop="backTop" v-show="isShow"/>
    </div>
</template>

<script>
import {reqDetails, GoodsInfo,ShopInfo,CommentInfo,reqRecommends} from "../../api/detail";
import DetailNavBar from "./base/DetailNavBar";
import CommonSwiper from "../../components/common/swiper/CommonSwiper";
import DetailGoodsInfo from "./base/DetailGoodsInfo";
import DetailShopInfo from "./base/DetailShopInfo";
import CommonScroll from "../../components/common/myScroll/CommonScroll";
import DetailImgInfo from "./base/DetailImgInfo";
import DetailParams from "./base/DetailParams";
import DetailCommentInfo from "./base/DetailCommentInfo";
import GoodsList from "../../components/content/goodslist/GoodsList";
import DetailBottomBar from "./base/DetailBottomBar";
import BackTop from "../../components/content/backtop/BackTop";
    export default {
        name: "Detail",
        components:{
            DetailNavBar,
            CommonSwiper,
            DetailGoodsInfo,
            DetailShopInfo,
            CommonScroll,
            DetailImgInfo,
            DetailParams,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            BackTop
        },
        data(){
          return{
              banner:[],
              goodsInfo: {}, // 存放good组件的数据
              shopInfo: {}, // 商家信息
              detailImgInfo: {}, // 商品图片信息
              paramsInfo: {}, // 尺寸信息
              commentInfo:{},// 评论信息
              recommendInfo: [], // 推荐信息
              offsetTopList: [0], // 存放商品参数评论推荐组件距离定位父级的值
              isShow:false
          }
        },
        created() {
            this.getDetails(this.$route.params.iid);
            this.getRecommends()
        },
        methods:{
            async getDetails(iid){
              const {result}= await reqDetails(iid);
                this.banner = result.itemInfo.topImages;
                // 商品信息
                this.goodsInfo = new GoodsInfo(
                    result.itemInfo,
                    result.columns,
                    result.shopInfo.services
                );
                // 商家信息
                this.shopInfo = new ShopInfo(result.shopInfo);
                // 商品图片信息
                this.detailImgInfo = result.detailInfo;
                // 商品尺寸衣服来源信息
                this.paramsInfo = result.itemParams;
                // 评论信息
                if (result.rate.cRate !== 0) {
                    // 放置没有评论信息cRate
                    this.commentInfo = new CommentInfo(result.rate.list[0]);
                }
            },
            // 推荐的组件
            async getRecommends() {
                const result = await reqRecommends();
                this.recommendInfo = result.data.list;
            },
            // 绑定事件 获取子组件的数据
            itemClick(index){
                // console.log(index);
                //如何获取  不同index对应的高度
                this.$refs.scroll.scroll.scrollTo(0,-this.offsetTopList[index],300);
            },
            imgLoad(count){
                // 等图片加载完后获取到可滚动区域（距离父级的高度）的offsetTop值
                this.offsetTopList = [0]; // 每次点击都为最初值
                this.offsetTopList.push(
                    this.$refs.params.$el.offsetTop,
                    this.$refs.comment.$el.offsetTop,
                    this.$refs.recommend.$el.offsetTop
                );
                // console.log(`加载了${count}张图片`,this.offsetTopList)
            },
            getPosition(position){
                //监听滚动的高度
                const positionY = -position.y;
                //返回顶部按钮显示与隐藏
                this.isShow = positionY > 1000;
                // console.log(positionY);
                //navbar跳转的组件高度进行结构赋值
                const [zero,paramsOffsetTop,commentOffsetTop,goodsOffsetTop] = this.offsetTopList
                if(positionY>=zero&&positionY<paramsOffsetTop){
                    this.$refs.navbar.currentIndex=0
                }else if(positionY>=paramsOffsetTop&&positionY<commentOffsetTop){
                    this.$refs.navbar.currentIndex=1
                }else if(positionY>=commentOffsetTop&&positionY<goodsOffsetTop){
                    this.$refs.navbar.currentIndex=2
                }else if(positionY>=goodsOffsetTop){
                    this.$refs.navbar.currentIndex=3
                }
            },
            backTop(){
                //回到顶部
                this.$refs.scroll.scroll.scrollTo(0,0,1000)
            },
            addMarket(){

            }
        }
    }
</script>

<style scoped lang="less">
    // 设置myScroll组件的样式 可以获取myScroll的第一个类名
    .wrapper {
    // 设置滚动内容
    position: fixed;
        top: 44px;
        bottom: 48px;
        left: 0;
        right: 0;
    }
</style>
