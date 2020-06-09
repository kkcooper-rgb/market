import request from "./request";

// 请求detail组件的数据
export const reqDetails = iid => request('/detail', { iid });
// 请求推荐图片的数据
export const reqRecommends = iid => request('/recommend');

// 整合商品数据 构造函数
export function GoodsInfo(itemInfo, columns, services){
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
}
// 整合商家数据
export function ShopInfo(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
}
//整合评论的数据
export function CommentInfo(commentInfo) {
    this.user = commentInfo.user
    this.content = commentInfo.content
    this.created = commentInfo.created
    this.style = commentInfo.style
    this.images = commentInfo.images
}
