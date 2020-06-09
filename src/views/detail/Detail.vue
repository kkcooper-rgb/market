<template>
    <div class="detail">
        <detail-nav-bar @itemClick="itemClick"/>
        <common-scroll>
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
            GoodsList
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
          }
        },
        created() {
            this.getDetails(this.$route.params.iid);
            this.getRecommends()
        },
        methods:{
            async getDetails(iid){
              const {result}= await reqDetails(iid);
                console.log(result);

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
            itemClick(){
                console.log("6666");
            },
            imgLoad(){
                console.log("0000");
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
