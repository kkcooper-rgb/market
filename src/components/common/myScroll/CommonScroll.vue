<template>
    <div class="wrapper" ref="wrapper">
        <!-- 放置滚动的内容插槽 -->
        <div class="content">
            <!--插槽-->
            <slot/>
        </div>
    </div>
</template>

<script>
    //引入官方的组件
    import BScroll from 'better-scroll'

    export default {
        name: "commonScroll",
        data(){
            return{
                scroll:null
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,//允许在滚动区域点击
                pullUpLoad:true,//允许上拉加载更多数据
            });
            // console.log(scroll);
            //监听滚动到滚动区域的最底部
            this.scroll.on("pullingUp",()=>{
                // console.log("1")
                // 获得更多数据 请求是在home组件中的，那么就发射一个事件(执行函数)
                this.$emit("loadMore");
            });
            //只要滚动就会触发该事件
            this.scroll.on("scroll",(position)=>{
                this.$emit("getPosition",position);
            })
        }
    }
</script>

<style scoped>

</style>
