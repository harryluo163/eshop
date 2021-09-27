import router from './router'
import store from './store'
router.beforeEach((to, from, next)=>{
    if(to.path === '/login'){
        next({path:'/'});
    }else if(to.meta && to.meta.roles){     //需要权限
        if(store.getters.roles.some(role => to.meta.roles.includes(role))){
            next();
        }
        else {
            next({path:'/401'})
        }
    }else{
        next();
    }

})