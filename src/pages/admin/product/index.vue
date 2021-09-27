<template>
    <el-main style="margin: 0px; padding: 0px">
        <el-row style="margin:10px 0px;background-color: #FCFCFC;height:60px;line-height: 60px;border:1px solid #e6e6e6">
            <el-col :span="16" style="padding-left:15px">
                <span style="font-size: 15px;margin-left: 10px">商品名称:</span>
                <el-input size="small" style="width:120px" v-model="queryname" placeholder="请输入商品名"></el-input>
                <span style="font-size: 15px;margin-left: 10px">商品分类:</span>
                <el-select v-model="categoryid" style="color:#000; width: 120px" placeholder="--未选择--">
                    <el-option v-for="item in categorylist" :label="item.name" :value="item.categoryid" :key="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="26">
                <el-button round size="small" type="primary" icon="el-icon-search" @click="getProductList">搜索</el-button>
                <el-button round size="small" type="success" icon="el-icon-refresh" @click="handleReset">重置</el-button>
                <el-button round size="small" type="warning" icon="el-icon-plus" @click="handleAddProduct">添加</el-button>
<!--                <el-button round size="small" type="danger" icon="el-icon-delete" @click="deleteProducts">删除</el-button>-->
            </el-col>
        </el-row>
        <el-table
                :row-style="getRowStyle"
                v-loading="loadingproductlist"
                element-loading-text="正在拼命加载，请稍等片刻 ~o( =∩ω∩= )m"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                style="width:100%"
                :data="tableData"
                :default-sort="{prop:'date',order:'descending'}"
                @selection-change="checkChanged"
        >
            <el-table-column align="center" type="selection" prop="productid"></el-table-column>
            <el-table-column
                    prop="productid"
                    label="编号"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商品名称">
            </el-table-column>
            <el-table-column
                    prop="pictureurl"
                    label="图片"
                    align="center">
                <template slot-scope="scope">
                    <img  :src="serverimagepath+scope.row.pictureurl.split(';')[0]" width="80" height="80">
                </template>
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="stock"
                    sortable
                    label="库存">
            </el-table-column>
            <el-table-column
                    prop="sale"
                    label="销量"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="createdate"
                    label="上架时间"
                    width="140"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="categoryid"
                    label="类别">
                <template slot-scope="scope">{{scope.row.categoryid|categoryFliter}}</template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
                <template slot-scope="scope">{{scope.row.status|statusFliter}}</template>
            </el-table-column>
            <el-table-column
                    width="100"
                    label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" :type=" scope.row.status+'' === '1' ?'primary':'warning'" icon="el-icon-edit" @click="handleEdit(scope.row)" circle title="编辑"></el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteProduct(scope.row)" circle></el-button>
                </template>
                <!--编辑弹出框-->
            </el-table-column>
        </el-table>
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.visible"
                width="630px"
        >
            <el-form ref="formData" :model="dialog.formData" label-width="80px" style="text-align:left;width: 580px">
                <el-form-item label="编号" v-if="dialog.formData.productid">
                    <el-input v-model="dialog.formData.productid" :disabled="true" placeholder="系统自动生成，无需输入"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="dialog.formData.name"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-image style="width: 80px; height: 80px" v-for="item in dialog.formData.pictureurl" :key="item" :src="serverimagepath + item"></el-image>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="dialog.formData.price"></el-input>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="dialog.formData.stock"></el-input>
                </el-form-item>
                <el-form-item label="销量" v-if="dialog.formData.sale">
                    <el-input v-model="dialog.formData.sale" :disabled="true" placeholder="销量不可改"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-select v-model="dialog.formData.categoryid" style="color:#000;">
                        <el-option v-for="item in categorylist" :label="item.name" :value="item.categoryid" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="dialog.formData.status" size="medium" style="line-height:40px">
                        <el-radio border label="1">上架</el-radio>
                        <el-radio border label="0">暂不上架</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-row >
                <el-col style="width:144px;float:right">
                    <el-button @click="dialog.visible = false">取 消</el-button>
                    <el-button type="primary" @click="editProduct(dialog.formData)">确 定</el-button>
                </el-col>
            </el-row>
        </el-dialog>
        <el-pagination
             @size-change="handlePagesizeChange"
             @current-change="handleCurrentpageChange"
             :current-page="currentpage"
             :page-sizes="pagesizelist"
             :page-size="pagesize"
             layout="total, sizes, prev, pager, next, jumper"
             :total="productlist.length">
        </el-pagination>
    </el-main>
</template>

<script>

    import {
        getProducts,
        deleteProduct,
        getCategoryList, editProduct
    } from "../../../server/admin"
    import config from "../../../libs/config";
    import store from "../../../store";
    export default {
        filters:{
            categoryFliter(val){
                for(var i in store.getters.categorylist){
                    if(store.getters.categorylist[i].categoryid+'' === val+'')
                        return store.getters.categorylist[i].name
                }
                return '未知'
            },
            statusFliter(val){
                if(val+'' === '1'){
                    return '上架'
                }
                return '下架'
            },
        },

        methods: {

            checkChanged(val){
                this.checks = val
                console.log(this.checks)
            },

            handlePagesizeChange(val){
                this.pagesize = val
                this.getProductList()
            },

            handleCurrentpageChange(val){
                this.currentpage = val
                this.getProductList()
            },

            formatter(column,row){
                return row.name;
            },

            handleReset(){
                this.categoryid =''
                this.queryname=''
                this.currentpage = 1
                this.getProductList()
            },

            //获取表格数据
            getProductList(){
                //发送请求
                this.loadingproductlist = true;
                getProducts({categoryid:this.categoryid, name:this.queryname}).then(response=>{
                    //将获取到的数据赋值给当前组件
                    if(response.code === 200){
                        this.productlist=JSON.parse(response.data);
                        while(this.currentpage != 1 && this.pagesize*(this.currentpage-1) >= this.productlist.length){
                            this.currentpage--
                        }
                        this.tableData = this.productlist.slice(this.pagesize*(this.currentpage-1), this.pagesize*this.currentpage)
                    }
                    else{
                        this.$message.warning(response.msg)
                    }
                    this.loadingproductlist = false;
                }).catch(err =>{
                    this.$message.error(err.response.status)
                    this.loadingproductlist = false;
                });
            },
            handleEdit(row) {
                this.dialog.title="编辑商品";
                this.dialog.formData={
                    ...row
                };
                this.dialog.formData.pictureurl = row.pictureurl.split(';')
                this.dialog.formData.status = row.status+''
                this.editrow = row
                this.dialog.visible=true;
            },

            handleAddProduct() {
                this.$router.push('/admin/product/addProduct');
            },
            //修改商品信息
            editProduct(data){
                //数据校验
                if(data.productid+'' === ''){
                    this.$message.warning('商品编号不能为空')
                    return
                }
                if(data.name+'' === ''){
                    this.$message.warning('商品名称不能为空')
                    return
                }
                if(data.price+'' === '' || !(data.price+'').match('^\\d+(.\\d+)?$')){
                    this.$message.warning('请检查价格的格式是否正确')
                    return
                }
                if(data.stock+'' === '' || !(data.stock+'').match('^\\d+$')){
                    this.$message.warning('请检查库存的格式是否正确')
                    return;
                }
                //未做修改则不做操作
                var flag = false
                for(var key in data){
                    if(data[key]+'' != this.editrow[key]+'')
                        flag = true
                }
                if(!flag) return
                editProduct({productid: data.productid, name:data.name, price:data.price,stock:data.stock,categoryid:data.categoryid, status:data.status}).then(res =>{
                    if(res.code === 200){
                        this.editrow.name = data.name
                        this.editrow.price = data.price
                        this.editrow.stock = data.stock
                        this.editrow.categoryid = data.categoryid
                        this.editrow.status = data.status
                        this.dialog.visible = false
                        this.$message.success('修改成功')
                    }
                    else{
                        this.$message.warning(res.msg)
                    }
                }).catch(err =>{
                    this.$message.error(err.response.status)
                })
            },

            deleteProduct(row) {
                this.$confirm('此操作将删除该商品，是否继续？', '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    deleteProduct({productid:row.productid, name:row.name}).then(response=>{
                        console.log(response)
                        if(response.code === 200){
                            this.getProductList()
                            this.$message.success('删除成功')
                        }else{
                            this.$message.warning(response.msg)
                        }
                    }).catch(err=>{
                        this.$message.error(err.response.status)
                    })
                });
            },

            //批量删除
            deleteProducts(){
                let list = []
                for(var i in this.checks)
                    list.push(this.checks[i].productid)
                this.$confirm('此操作将删除选中商品，是否继续？', '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    deleteProduct({productid:list.join(';')}).then(response=>{
                        if(response.code === 200){
                            this.getProductList()
                            this.$message.success('删除成功')
                        }else{
                            this.$message.warning(response.msg)
                        }
                    }).catch(err=>{
                        this.$message.error(err.response.status)
                    })
                });
            },

            initCategoryList(){
                this.categorylist = getCategoryList()
            },

            getRowStyle({row}){
                if(row.status+'' === '0'){
                    return {background: 'oldlace'}
                }
                return ''
            },

        },
        mounted(){
            this.initCategoryList();
            this.getProductList();
        },

        data(){
            return{
                loadingproductlist:false,
                checks:[],
                serverimagepath:config.serverimagepath,
                productlist: [],
                categorylist:[],        //商品类别信息列表
                categoryid:'',
                queryname:'',
                currentpage:1,
                pagesize:5,
                pagesizelist:[5, 10, 20, 50],
                dialog:{
                    title:"",
                    visible:false,
                    formData:{}
                },
                editrow:{},
                tableData:[]
            }
        }
    }

   </script>

<style scoped>
    /*.tb {*/
    /*    position:relative;*/
    /*    left: 10px;*/
    /*    width: 95%;*/
    /*    height: 60%;*/
    /*    font-size: 16px;*/
    /*    margin-top:1px;*/
    /*    border:1px solid;*/
    /*    mso-cellspacing:1px;*/

    /*}*/
    .operate-container {
        width: 120px;
        height: 30px;
        float: left;
        padding-left: 20px;
    }
    .bg {
        width: 100%;
        background: #bfcbd9;
    }
    .el-select {
        width:150px;
    }
    .el-input{
        width:500px;
    }
    .input-with-select .el-input-group__prepend
    {
        background-color:#fff;
        width: 100px;
        float:right;
        margin-top:15px;
    }

    .block{
        margin-top: 10px;
    }
    </style>