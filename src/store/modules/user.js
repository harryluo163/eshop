import {login} from "../../server/user";


const  state = {
    name:'',
    roles:[],
}

const mutations = {
    SET_NAME:(state, name) => {
        state.name = name
    },
    SET_ROLES:(state, roles) => {
        state.roles = roles
    },
}


const  actions = {
    login({commit}, userinfo){
        return new Promise(resolve => {
            login(userinfo).then(res =>{
                if(res.code === 200){
                    const data = res.data;
                    commit('SET_NAME', data.name)
                    commit('SET_ROLES', data.roles)
                    resolve()
                }
            })

        })
    },
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}