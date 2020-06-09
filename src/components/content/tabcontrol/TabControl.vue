<template>
    <ul class="tab-control">
        <li
            v-for="(item,index) in titles"
            @click="handleClick(index)"
            :class="{active:currentIndex === index}">
            <span>{{item}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data(){
            return{
                currentIndex:0
            }
        },
        methods:{
            handleClick(index){//记录点击的索引
                this.currentIndex = index;
                //告诉父组件 点击哪个li
                this.$emit("tabClick",index)
            }
        }
    }
</script>

<style scoped lang="less">
    // 引入主题颜色
    @import "~assets/css/varible.less";

    .tab-control {
        position: relative;
        z-index: 1;
        background-color: #fff;
        // 以上解决再次使用这个组件层级关系
        display: flex;
        text-align: center;
        line-height: 40px;

        li {
            flex: 1;
        }

        .active {
            span {
                padding: 5px;
                color: @themeColor;
                border-bottom: 3px solid @themeColor;
            }
        }
    }
</style>
