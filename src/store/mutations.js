import {
  INIT_BUYCART,
  ADD_CART,
  GET_USERINFO,
  RECORD_USERINFO,
  ADD_ANIMATION,
  SHOW_CART,
  REDUCE_CART,
  EDIT_CART,
  LOGOUT
} from './mutation-types'
// import { setStore, getStore } from '../../utils/storage'
export default {
  //获取购物车数据
  [INIT_BUYCART] (state,{productid, price, name, pictureurl, productNum}) {
    let cart = state.cartList // 购物车
    let flag = true
    let goods = {
      productid,
      price,
      name,
      pictureurl,
      productNum,
    }
    if (flag) {
      goods.checked = '0'
      cart.push(goods)
    }
    state.cartList = cart
  },
  // 加入购物车
  [ADD_CART] (state, {productid, price, name, pictureurl, productNum=1}) {
    let cart = state.cartList // 购物车
    let flag = true
    let goods = {
      productid,
      price,
      name,
      pictureurl
    }
    if (cart.length) {        // 有内容
      cart.forEach(item => {  
        if (item.productid === productid) {
          if (item.productNum >= 0) {
            flag = false
            item.productNum += productNum
          }
        }
      })
    }
    if (!cart.length || flag) {
      goods.productNum = productNum
      goods.checked = '0'
      cart.push(goods)
    }
    state.cartList = cart
    // 存入localStorage
    // setStore('buyCart', cart)
  },
  // 加入购物车动画
  [ADD_ANIMATION] (state, {moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart}) {
    state.showMoveImg = moveShow
    if (elLeft) {
      state.elLeft = elLeft
      state.elTop = elTop
    }
    state.moveImgUrl = img
    state.receiveInCart = receiveInCart
    if (cartPositionT) {
      state.cartPositionT = cartPositionT
      state.cartPositionL = cartPositionL
    }
  },
  // 是否显示购物车
  [SHOW_CART] (state, {showCart}) {
    // let timer = null
    state.showCart = showCart
    // clearTimeout(timer)
    // if (showCart) {
    //   timer = setTimeout(() => {
    //     state.showCart = false
    //   }, 5000)
    // }
  },
  // 移除商品
  // [REDUCE_CART] (state, {productid}) {
  //   let cart = state.cartList
  //   cart.forEach((item, i) => {
  //     if (item.productid === productid) {
  //       if (item.productNum > 1) {
  //         item.productNum--
  //       } else {
  //         cart.splice(i, 1)
  //       }
  //     }
  //   })
  //   state.cartList = cart
  //   // 存入localStorage
  //   // setStore('buyCart', state.cartList)
  // },
  [REDUCE_CART] (state) {
    let cart = state.cartList
    // let cart1=cart
    // cart.forEach((item, i) => {
    //   if (item.checked === '1') {             
    //     cart.splice(i, 1) 
    //     i=0
    //   }
    // })
    var i=0
    for(i=0;i<cart.length;i++){
      if(cart[i].checked=='1'){
        cart.splice(i,1)
        i=-1
      }
    }
    state.cartList = cart
    // 存入localStorage
    // setStore('buyCart', state.cartList)
  },
  // 修改购物车
  [EDIT_CART] (state, {productid, productNum, checked}) {
    let cart = state.cartList
    if (productNum) {
      cart.forEach((item) => {
        if (item.productid === productid) {
          item.productNum = productNum
          item.checked = checked
        }
      })
    } else if (productid) {
      cart.forEach((item, i) => {
        console.log('下标',i)
        if (item.productid === productid) {
          cart.splice(i, 1)
        }
      })
    } else {
      cart.forEach((item) => {
        item.checked = checked ? '1' : '0'
      })
    }
    state.cartList = cart
    // 存入localStorage
    // setStore('buyCart', state.cartList)
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    // setStore('userInfo', info)
  },
  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },
  //退出登录
  [LOGOUT](state){
    state.login = false
  }
}
