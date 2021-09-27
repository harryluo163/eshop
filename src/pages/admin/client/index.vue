<template>

    <div>
        <div><h1>用户信息</h1></div>
    <el-table
        :data="tableData"
        style="width: 100%;"
        max-height=400px>
    <el-table-column
            fixed
            prop="login"
            label="登录信息"
            width="200">
        <el-table-column
        prop="username"
        label="账号"
        width="100"
        >
        </el-table-column>
        <el-table-column
        prop="password"
        label="密码"
        width="100"
        >
        </el-table-column>
    </el-table-column>
    <el-table-column label="配送信息">
        <el-table-column
                prop="name"
                label="姓名"
                width="120">
        </el-table-column>
        <el-table-column label="地址">
            <el-table-column
                    prop="province"
                    label="省份"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="市区"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    width="300">
            </el-table-column>
        </el-table-column>
        <el-table-column
        prop="contact"
        label="联系方式"
        fixed="right">
            <el-table-column
            prop="telephone"
            label="电话"
            >
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
        </el-table-column>
    </el-table-column>
</el-table>
    <div>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="50">
        </el-pagination>
    </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [{
                    username: '1067455112',
                    password:'123456',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    telephone: '17876227833',
                    email:'1067455@qq.com'
                }, {
                    username: '1067455112',
                    password:'123456',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    telephone: '17876227833',
                    email:'1067455@qq.com'
                }, {
                    username: '1067455112',
                    password:'123456',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    telephone: '17876227833',
                    email:'1067455@qq.com'
                }, {
                    username: '1067455112',
                    password:'123456',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    telephone: '17876227833',
                    email:'1067455@qq.com'
                }, {
                    username: '1067455112',
                    password:'123456',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    telephone: '17876227833',
                    email:'1067455@qq.com'
                }, {
                    username: '1067455112',
                    password:'123456',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    telephone: '17876227833',
                    email:'1067455@qq.com'
                }, {
                    username: '1067455112',
                    password:'123456',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    telephone: '17876227833',
                    email:'1067455@qq.com'
                }]
            }
        }
    }
</script>

<style scoped>

</style>