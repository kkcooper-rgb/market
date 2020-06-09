import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//全局引入awesome-swiper 轮播插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
//懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  preLoad: 1.3,
  // loading:'~assets/img/common/placeholder.png',
  loading:require("assets/img/common/loading.jpg")//配置占位图片 需要的是base64字符串位格式即可
});
Vue.use(VueAwesomeSwiper, /* { default global options } */);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
