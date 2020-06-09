<template>
    <div class="common-swiper" :style="{paddingBottom}">
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="item in banner">
                <img :src="item" alt="轮播图">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "CommonSwiper",
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                    // 参数选项,显示小点
                    pagination: '.swiper-pagination',
                    //循环
                    loop: true,
                    //每张播放时长3秒，自动播放
                    autoplay: 2000,
                    //滑动速度
                    speed: 1000,
                    // delay:1000
                }
            }
        },
        props: {
            //prop验证要求  对象或数组作为默认值必须是函数的形式
            banner: {
                type: Array,
                default: function () {
                    return [];//如果没有传递那么久返回一个数组
                }
            },
            paddingBottom: {//这个属性用来公职轮播图的高度的
                type: String,
                default: "52%"
            }
        }
    }
</script>

<style scoped lang="less">
    @import '~assets/css/varible.less';
    .common-swiper {
        // 解决抖屏(就是图片还没加载进来,下面的组件或者文字就会网上顶,等图片加载完后高度从0立马变到195px 出现抖屏)
        position: relative;
        overflow: hidden;
        height: 0;
        // padding-bottom: 52%; // 此处的百分比是相对于盒子width值  195(图片的高度)/375(盒子的宽度) = 0.52

        img {
            width: 100%;
        }

        // 让他分页器相对于commom-swiper定位  而不是相对于swiper-container定位
        /deep/ .swiper-container {
            position: static; // 默认不定位
        }

        // 样式穿透   如果需要在当前项目中修改第三方库的样式
        /deep/ .swiper-pagination-bullet-active {
            background: @themeColor;
        }
    }
</style>
