<template>
    <div class="good-list-item" @click="handleClick">
    <!--<img :src="itemData.show.img" alt="" >-->
        <img v-lazy="showImage" alt="" >
        <div class="goods-info">
            <p>{{itemData.title}}</p>
            <span class="price">¥{{itemData.price}}</span>
            <span class="collect">{{itemData.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props:{
            itemData:{
                type:Object,
                default() {
                    return {};
                }
            }
        },
        computed:{
            // 用到的地方有home组件和detail组件
            showImage(){
                return this.itemData.image || this.itemData.img || this.itemData.show.img
            }
        },
        methods:{
            handleClick(){//跳转到detail组件
                // 跳转到详情页面 并且附带着参数 在detail发起请求
                const id = this.itemData.iid;
                // console.log(id)
                // 如果是home组件的goodListitem组件才跳转
                if(this.$route.path.includes('home')){ // 判断一个数组/字符串是否包含一个指定的值
                    this.$router.push(`/detail/${id}`)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .good-list-item {
        position: relative;
        width: 46%;
        padding-bottom: 45px;
    }

    .good-list-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 14px;
        position: absolute;
        bottom: 8px;
        left: 0;
        right: 0;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis; /* 超出那么就...形式展现 */
        white-space: nowrap; /* 不换行 */
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: #f52988;
        margin-right: 30px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: "";
        position: absolute;
        left: -15px;
        top: 2px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") center center/14px 14px;
    }
</style>
