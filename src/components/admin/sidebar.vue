<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-menu-item :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
    import bus from "./bus";
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: "el-icon-setting",
                        index: "/admin/home",
                        title: "首页",
                        url: "admin/home/index",

                    },
                    {
                        icon:'el-icon-goods',
                        index:'/admin/product',
                        title:'商品管理',
                        //url:'admin/product/index',
                        subs:[
                            {
                                icon: "el-icon-setting",
                                index: "/admin/product/index",
                                title: "商品信息",
                                url: "admin/product/index"
                            },
                            {
                                icon: "el-icon-setting",
                                index: "/admin/product/addproduct",
                                title: "添加商品",
                                url: "admin/product/addproduct"
                            }
                        ]
                    },
                    {
                        icon:'el-icon-tickets',
                        index:'/admin/ordermanage/index',
                        title:'订单管理',
                        url:'admin/ordermanage/index'
                    },
                    {
                        icon:'el-icon-view',
                        index:'/admin/client',
                        title:'客户信息',
                        url:'admin/client/index'
                    }
                ]
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path;
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on("collapse", msg => {
                this.collapse = msg;
            });
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 60px;
        bottom: 0;
        overflow-y: scroll;
        text-align: left;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 150px;
    }
    .sidebar > ul {
        height: 100%;
    }
</style>
