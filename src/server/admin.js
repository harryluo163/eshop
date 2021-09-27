import {fetch, postForm} from "./http";
import store from "../store";
export function getProducts(params){
    return fetch('/products/queryProducts.ashx',params)
}

export function deleteProduct(params){
    return fetch('/products/deleteProduct.ashx',params)
}

export function  getCategoryList() {
    if(store.getters.categorylist.length === 0){
        store.dispatch('product/initCategoryList')
    }
    return store.getters.categorylist
    //return fetch('', null)
}

export function getOrderList(params) {
    return fetch('/order/getOrderList.ashx', params)
}

export function updateOrderProduct(params) {
    return fetch('/order/updateOrderProduct.ashx', params)
}

export function deleteOrder(params) {
    return fetch('/order/deleteOrder.ashx', params)
}

export function editProduct(params) {
    return fetch('/products/editProduct.ashx', params)
}

export function addProduct(params) {
    return postForm('/products/addProduct.ashx', params)
}
