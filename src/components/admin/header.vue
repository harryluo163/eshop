<template>
    <el-header class="a-header">
        <div class="a-collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <span class="a-title">后台管理系统</span>
        <div class="a-header-right">
            <div class="header-user-con">
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                    {{username}}
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-header>
</template>
<script>
    import bus from "./bus";
    export default {
        data() {
            return {
                collapse: true,
                fullscreen: false,
                name: "admin"
            };
        },
        computed: {
            username() {
                let username = this.$store.getters.name
                return username ? username : this.name;
            }
        },
        methods: {
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                return command;
            },
            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                bus.$emit("collapse", this.collapse);
            },
            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            }
        }
    };
</script>
<style scoped>
    .a-header {
        position: relative;
        background-color: #242F42;
        color: #fff;
        padding: 0;
    }
    .a-collapse-btn {
        float: left;
        cursor: pointer;
        padding: 0 24px;
        font-size: 18px;
        line-height: 60px;
    }
    .a-title {
        font-size: 22px;
        line-height: 60px;
        float: left;
    }
    .a-header-right {
        float: right;
        padding-right: 24px;
    }
    .header-user-con {
        display: flex;
        height: 60px;
        align-items: center;
    }
    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell {
        color: #fff;
    }
    .user-name {
        margin-left: 10px;
    }
    .user-avator {
        margin-left: 20px;
    }
    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
