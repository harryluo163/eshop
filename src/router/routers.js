const Index = () => import('../pages/index.vue')
const Login = () => import('../pages/login/login.vue')
const Register = () => import('../pages/login/register.vue')
const Home = () => import('../pages/Home/home.vue')
const GoodS = () => import('../pages/Goods/goods.vue')
const goodsDetails = () => import('../pages/Goods/goodsDetails.vue')
const Cart = () => import('../pages/Cart/cart.vue')
const order = () => import('../pages/Order/order.vue')
const user = () => import('../pages/User/user.vue')
const orderList = () => import('../pages/User/children/order.vue')
// const information = () => import('../pages/User/children/information.vue')
// const addressList = () => import('../pages/User/children/addressList.vue')
const checkout = () => import('../pages/Checkout/checkout.vue')
const payment = () => import('../pages/Order/payment.vue')
const paysuccess = () => import('../pages/Order/paysuccess.vue')
const Search = () => import('../pages/Search/search.vue')
const RefreshSearch = () => import('../pages/Refresh/refreshsearch.vue')
const orderDetail = () => import('../pages/User/children/orderDetail.vue')


const routes = [
    //用户路由
    {
        path: '/',
        component: Index,
        name: 'index',
        redirect: '/goods',
        children: [
          {path: '/home',component: Home },
          {path: '/goods', component: GoodS},
          {path: '/goodsDetails', name: 'goodsDetails',  component: goodsDetails},
        //   {path: 'thanks', name: 'thanks', component: Thanks}
        ]
      },
      {path: '/login', name: 'login', component: Login},
      {path: '/register', name: 'register', component: Register},
      {path: '/cart', name: 'cart', component: Cart},
      {path: '/refreshsearch', name: 'refreshsearch', component: RefreshSearch},
      {
        path: '/order',
        name: 'order',
        component: order,
        children: [
          {path: '/paysuccess', name: 'paysuccess', component: paysuccess},
          {path: '/payment', name: 'payment', component: payment},
          {path: '/search', name: 'search', component: Search},
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: user,
        redirect: '/orderList',
        children: [
          {path: '/orderList', name: '订单列表', component: orderList},
          {path: '/orderDetail', name: '订单详情', component: orderDetail},
        ]
      },
      {path: '/checkout', name: 'checkout', component: checkout},
    //   {path: '*', redirect: '/home'},


    //管理员路由
    {
        path: '/admin',
        redirect: '/admin/home',
        component: () => import('../layouts/admin/base.vue'),
        meta: {
            title: 'admin base',
            roles: ['admin']
        },
        children: [{
            path: '/admin/home',
            component: () => import('../pages/admin/home'),
            meta: {
                title: '首页',
                //roles:['admin']
            },
        },
        {
                path:'/admin/product',
                component: () => import('../pages/admin/product'),
                meta: {
                    title: '商品管理',
                    //roles:['admin']
                }
            },
            {
                path: '/admin/product/index',
                component: () => import('../pages/admin/product/index.vue'),
                meta: {
                    title: '商品信息'
                }
            },{
                path: '/admin/product/addproduct',
                component: () => import('../pages/admin/product/addproduct.vue'),
                meta: {
                    title: '添加商品'
                }
            },{
                path:'/admin/ordermanage/index',
                component: () => import('../pages/admin/ordermanage/index.vue'),
                meta: {
                    title: '订单管理',
                    //roles:['admin']
                },
            },{
                path:'/admin/client',
                component: () => import('../pages/admin/client'),
                meta: {
                    title:'用户信息',
                    //roles:['admin']
                },
            }]
    },
    {
        path: '/admin/login',
        component: () => import('../pages/login1/adminlogin')
    } ,
    {
        path: '/404',
        component: () => import('../components/404')
    }, {
        path: '/401',
        component: () => import('../components/401')
    }, {
        path: '*',
        redirect: '/404'
    }
]

export default routes