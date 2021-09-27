import { fetch} from "./http";


export function login(params={}) {
    return fetch('User.ashx', params)
}

export function userInfo(params) {
    return fetch('User.ashx',params)
}

export function register(params) {
    return fetch('User.ashx',params)
}

export function loginOut() {
    return fetch('User.ashx')
}

//上传图片
export function upload() {
    return fetch('User.ashx')
}

// 修改头像
export function updateheadeimage(params){
    return fetch('User.ashx',params)
}

//地址信息
export function addressList(params){
    return fetch('User.ashx',params)
}

//更新
export function addressUpdate(params){
    return fetch('User.ashx',params)
}

//添加
export function addressAdd(params){
    return fetch('User.ashx',params)
}
//删除
export function addressDel(params){
    return fetch('User.ashx',params)
}