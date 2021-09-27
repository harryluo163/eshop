<template>
    <div style="height:500px">
    <div id="header" style="height:50px; ;text-align:center;border:2px;background-color: #bfcbd9;"><h1 style="color: #242f42;align:center">添加商品</h1></div>
        <div id="content">
            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" style="border:10px;margin:0 auto">
                <el-form-item label="商品名称" style="width:40%;margin:0 auto">
                    <el-input v-model="sizeForm.name" style="line-height:40px"></el-input>
                </el-form-item>
                <el-form-item label="价格" style="width:40%;margin:0 auto">
                    <el-input v-model="sizeForm.price" style="line-height:40px"></el-input>
                </el-form-item>
                <el-form-item label="库存" style="width:40%;margin:0 auto">
                    <el-input v-model="sizeForm.stock" style="line-height:40px"></el-input>
                </el-form-item>
                <el-form-item label="类别" style="width:40%;margin:0 auto">
                    <el-select v-model="sizeForm.categoryid" placeholder="请选择类别" style="line-height:40px">
                        <el-option v-for="item in categorylist" :label="item.name" :value="item.categoryid" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上架状态" style="width:40%;margin:0 auto">
                    <el-radio-group v-model="sizeForm.status" size="medium" style="line-height:40px">
                        <el-radio border label="1" style="width:100px" >上架</el-radio>
                        <el-radio border label="0" style="width:100px">暂不上架</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图片" style="width:40%;margin:0 auto;text-align:center;">          <!--margin:0 auto表示横竖居中-->
                    <el-image class="flowerImage" v-for="(pic,index) in pictures" :src="pic" @click="deleteImage(index)" :key="index"></el-image>
                    <el-image class="flowerImage" :src="require('@/assets/images/add.jpg')" @click="openFile"></el-image>
                    <input id="image" style="display: none" type="file"   @change="changePicture" multiple>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="uploadFiles" >立即添加</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {getCategoryList} from "../../../server/admin";
    export default {


        data()
        {
            return{
                categorylist:[],
                pictures:[],
                files:[],
                sizeForm:{
                    name:'',
                    price:'',
                    stock:'',
                    categoryid:'',
                    status:'',
                }
            };
        },
        methods:{
            openFile(){
                document.getElementById('image').click()
            },

            uploadFiles(){
                if(this.files.length === 0) return;

                let param = new FormData()
                for(var item in this.sizeForm){
                    param.append(item, this.sizeForm[item]);
                    if(this.sizeForm[item].length === 0) {
                        this.$alert(item+'不能为空')
                        return;
                    }
                }

                if(!this.sizeForm.stock.match('^\\d+$')){
                    this.$alert('库存必须是一个非负整数')
                    return
                }

                if(!this.sizeForm.price.match('^\\d+(\\.\\d+)?')){
                    this.$alert('价格必须是一个非负数')
                    return;
                }

                for(var i = 0; i < this.files.length; i++){
                    param.append('file', this.files[i])
                }



                console.log(param)

                let config = {
                    withCredentials:true,
                    headers:{'Content-Type':'multipart/form-data'}
                }

                let instance = axios.create({
                    withCredentials:true
                })
                instance.post('http://localhost:8088/Handler/products/addProduct.ashx', param, config).then(res=>{
                    const response = res.data
                    if(response.code === 200){
                        this.$message({
                            type: 'success',
                            message: response.msg,
                        });
                    }else{
                        this.$message({
                            type: 'success',
                            message: response.msg,
                        });
                    }
                })
            },

            deleteImage(index){
              this.files.splice(index, 1);
              this.pictures.splice(index, 1);
            },

            changePicture (obj) {
                //没选或取消则不做改变
                if(obj.target.files.length === 0)return;
                let that = this;
                const files = obj.target.files;
                that.pictures.splice(0, that.pictures.length)
                that.files.splice(0, that.files.length)
                for(var i = 0; i < files.length; i++){
                    //限制选择文件大小大于2MB的文件
                    if(files[i].size > 2 << 20) continue
                    that.files.splice(0, 0, files[i])
                    const reader = new FileReader();
                    reader.readAsDataURL(files[i]);
                    reader.onload = function () {
                        that.pictures.splice(0, 0, this.result)
                    }
                }
            },

            initCategoryList(){
                this.categorylist = getCategoryList()
            }
        },

        mounted(){
            this.initCategoryList()
        },
    }
</script>

<style scoped>
    #content{
        margin-top:2px;
        padding: 10px 0;
        background: #bfcbd9;
        background-image:url("../../../assets/images/bei.jpg");
    }

    .h{
        height:500px;

    }

    .flowerImage {
        text-align: center;
        width: 180px;
        height: 150px;
    }

</style>