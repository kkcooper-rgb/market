import Vue from 'vue'
import Vuex from 'vuex'
import logger from "less/lib/less/logger";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products:JSON.parse(localStorage.getItem("products"))||[],//存储所有的商品
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || [] // 存储用户信息
  },
  mutations: {//定义修改store数据的方法
    addMarket(state,payload){
      // console.log(state, payload);
      //payload中是没有count值的，我们需要一个count值记录你你购买几次
      //先从products数据中查找有没有这次添加的商品  如果没有则添加count 1 如果找到则count++
      //find用于找出第一个符合条件的数据成员 返回值为true的成员  返回的是原来的对象而不是额外的对象 改变原来的数组
      const product = state.products.find(item=>item.iid ===payload.iid);
      if(product){
        product.count ++ //仓库中的count++
      }else {
        state.products.push({
          ...payload,
          count:1,
          checked:true//按钮默认选中 market中使用
        })
       //方法2
        // state.product.push(Object.assign({count:1,checkout:true},payload))
      }
    },
    // marketItemList中触发该选中按钮
    updateCheck(state,payload){
      const product = state.products.find(item=>item.iid ===payload);
      // console.log(product);
      product.checked = !product.checked
    },
    //点击全选按钮修改商品的checked
    updateProductAllCheck(state,payload){
      // 把商品的checked修改为传递的值
      state.products.forEach(item=>item.checked=payload)
    },
    // 清空仓库的数据
    deleteProducts(state,payload){
      state.products=[]
    }
  },
  getters:{
    count(state, getters) { // 获取指定商品的数量
      return function (iid) { // 函数可以传参 返回的是函数 那么使用该计算属性的时候需要加括号执行
        // 根据商品的iid从state.product使用find方法找，找到了那么就返回数组成员 从而可以获得count值
        const product = state.products.find(item => item.iid === iid)
        return product.count
      }
    },
    //计算state的products的数组长度
    productsLength(state){
      return state.products.length
    },
    //全选按钮是否选中
    isCheckAll(state){
      // every() 检测数组所有元素是否都符合指定条件 满足返回true 不会改变原始数组
      return state.products.every(item=>item.checked === true)
    },
    //计算所有选中商品的价格总和
    total(state){
      return state.products.reduce((pre,next)=>{
        // 计算数组中对象的值必须给0，给了初始值第一圈是0  选中了才计算价格
        // mdn中查看优先级 加括号提升?的优先级
        return pre+(next.checked?next.count*next.price:0)
      },0)
    },
    // 选中商品的种类数量
    selectProductsLength(state) {
      return state.products.filter(item => item.checked === true).length
    },
  },
  actions: {
  },
  modules: {
  },
});
//监听mutations里面方法的执行 因为一旦方法执行了 state数据一定就变了
// 同时就会触发subscribe的回调，回调的第二个参数就是这次mutation修改后仓库的最新数据
// 那么就不会导致仓库的数据在刷新页面被清空
store.subscribe(function (mutations, state) {
  // console.log(mutations, state);
  // 存储数据到本地  数据改变后存储数据
  localStorage.setItem("products",JSON.stringify(state.products));
});
export default store
