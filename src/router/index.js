import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../views/home/Home.vue'
import Category from "../views/category/Category";
import Cart from "../views/market/Market";
import Profile from "../views/profile/Profile";
import Detail from "../views/detail/Detail";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {index: 0}
    },
    {
        path: '/category',
        name: 'Category',
        component: Category,
        meta: {index: 1}
    },
    {
        path: '/market',
        name: 'Cart',
        component: Cart,
        meta: {index: 2,requireAuth:true}
        //通过添加requireAuth：true来表示market组件需要进行权限验证
        //验证规则是 如果购物车中有数据 那就可以访问market组件  即通过验证
        //如果购物车中没有数据 那就不可以访问market组件 即没有通过验证
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {index: 3}
    },
    {
        path: '/detail/:iid',
        name: 'Detail',
        component: Detail,
        meta: {index: 4}
    },
];

const router = new VueRouter({
    routes
});
//监听路由的跳转 只要监听到路由跳转了  就会触发回调函数
router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){//如果需要验证  就进行验证
        if(localStorage.getItem("products")){//如果获取到了数据
            next()
        }else {//如果没有通过验证 直接跳转到home
            next("/home");
            alert("您还没添加购物 请先去购物哦")
        }
    }else {//如果不需要验证  就直接next
        next()
    }
});
export default router
