<template>
  <div id="app">
    <common-slider-transition :name="direction">
      <keep-alive exclude="Detail">
        <router-view class="center" />
      </keep-alive>
    </common-slider-transition>
    <common-tab-bar v-if="!$route.path.includes('detail')"/>
  </div>
</template>
<script>
  import CommonTabBar from "./components/common/tabbar/CommonTabBar";
  import CommonSliderTransition from "./components/common/slidertransition/CommonSliderTransition";
  export default {
    name:"app",
    components:{
      CommonTabBar,
      CommonSliderTransition
    },
    data() {
      return {
        direction: "" // 防止抖屏
      };
    },
    watch: {
      $route(to, from) {
        // 重定向啥类名都不加
        if (from.path === "/") return;

        // 接收两个参数 一个是变化后的值
        if (to.meta.index > from.meta.index) {
          this.direction = "left";
        } else {
          this.direction = "right";
        }
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/css/reset.css";
  .center {
    /* 脱离文档流 */
    position: fixed;
    width: 100%;
    height: calc(100%);    /* 设置盒子的高度 */
  }
</style>
