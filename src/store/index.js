import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
 import action from './action'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const state = {
    login: false,   // 是否登录
    userInfo: null, // 用户信息
    cartList: [],   // 加入购物车列表
    showMoveImg: false, // 显示飞入图片
    elLeft: 0,
    elTop: 0,
    moveImgUrl: null,
    cartPositionT: 0, // 购物车位置
    cartPositionL: 0,
    receiveInCart: false, // 是否进入购物车
    showCart: false // 是否显示购物车
  }

// const store = new Vuex.Store({
//     modules,
//     getters
// })

// export default store

export default new Vuex.Store({
  state,
  action,
  mutations,
  modules,
  getters
})
