import {  fetch} from "./http";
// import store from "../store";

//1.首页接口,商品信息查询操作
export function productHome(params){
    return fetch('/products/queryProducts.ashx',params)
}

//2.添加商品到购物车
export function addCart(params){
    return fetch('/shopcart/addShopcart.ashx',params)
}   
//3.获取购物车列表
export function getcarts(params){
    return fetch('/shopcart/queryShopcart.ashx',params)
}

//4.删除购物车商品
export function cartDel(params){
    return fetch('/shopcart/deleteShopcart.ashx',params)
}

// 5.修改购物车
export function cartEdit(params){
    return fetch('/shopcart/editShopcart.ashx',params)
}

//6.订单提交
export function submitOrder(params){
    return fetch('/shopcart/submitOrder.ashx',params)
}

//7.获取所有订单
export function orderList(params){
    return fetch('/order/getOrderList.ashx',params)
}

//8.订单删除
export function delOrder(params){
    return fetch('/order/updateOrderProduct.ashx',params)
}

//9.取消订单
export function cancelOrder(params){
    return fetch('/order/updateOrderProduct.ashx',params)
}

//10.关键字搜索
export function getQuickSearch(params){
    return fetch('/products/queryProducts.ashx',params)
}

//11.查询
export function getSearch(params){
    return fetch('/products/queryProducts.ashx',params)
}

//获取订单详情
export function getOrderDet(params){
    return fetch('/products/getOrderDet.ashx',params)
}


//获取商品列表
export function getCartList(params){
    return fetch('/carts/getCartList.ashx',params)
}

//全选购物车
export function editCheckAll(params){
    return fetch('/carts/editCheckAll.ashx',params)
}



//获取所有商品
export function getAllGoods(params){
    return fetch('/products/allGoods.ashx',params)
}



//商品详情
export function productDet(params){
    return fetch('/products/productDet.ashx',params)
}



//支付
export function payMent(params){
    return fetch('/products/payMent.ashx',params)
}

  
//地址信息
export function addressList(params){
    return fetch('/user/addressList.ashx',params)
}

//地址更新
export function addressUpdate(params){
    return fetch('/user/addressUpdate.ashx',params)
}

//地址添加
export function addressAdd(params){
    return fetch('/user/addressAdd.ashx',params)
}

//地址删除
export function addressDel(params){
    return fetch('/user/addressDel.ashx',params)
}


 


