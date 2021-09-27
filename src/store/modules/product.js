
const  state = {
    categorylist:[],
    productlist:[],
}

const mutations = {
    SET_PRODUCTLIST:(state, productlist) => {
        state.productlist = productlist
    },
    SET_CATEGORYlIST:(state, categorylist) => {
        state.categorylist = categorylist
    }
}


const  actions = {
    initCategoryList({commit}) {
        return new Promise(resolve => {
            const categorylist = [{categoryid:1, name:'爱情鲜花'},{categoryid:2, name:'生日鲜花'},{categoryid:3, name:'友情鲜花'},{categoryid:4, name:'问候长辈'},{categoryid:5, name:'探病慰问'}]
            commit('SET_CATEGORYlIST', categorylist)
            resolve()
        })
    },

    queryProductList({commit}){
        return new Promise(resolve => {
            commit('SET_PRODUCTLIST', [])
            resolve()
        })
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}