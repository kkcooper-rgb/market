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
        meta: {index: 2}
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
]

const router = new VueRouter({
    routes
})

export default router
