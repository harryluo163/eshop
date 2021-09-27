<template>
    <el-main>
        <div class="top1">
            <ul class="top-right">
                <!--登陆状态信息显示start-->
                <li class="site" ><a href="#" >您好，请登录</a><a href="#" rel="nofollow">注册</a></li>
                <!--登陆状态信息显示end-->
                <li class="site">|</li>
                <li class="site">
                    <a href="#" target="_blank" rel="nofollow">订单查询</a>
                </li>
                <li class="site">|</li>
                <!--购物车信息显示start-->
                <li class="site">
                    <span class="cart0"></span><a href="http://localhost:8080/cart" class="cart">  购物车</a>
                </li>
                <!--购物车信息显示end-->
                <li class="site site0">|</li>
                <li class="site site2">
                    <a  href="#" target="_blank" class="cart" >用户订单</a>
                </li>
            </ul>
        </div>
        <!--        header部分，包括搜索框-->
        <div class="sousuo">
            <div class="timu">hua.com鲜花铺
            </div>
            <!--<div class="anniu"><input type="text" name="shuru" class="in1" placeholder="  商品关键字"/>
                <a href="#"><input type="button" value="搜索" name="sou" class="in2"/> </a>
            </div>-->

        </div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 970px;margin: 0 auto;background-color: red;border: 1px solid #ebebeb;"
                :header-cell-style="getRowClass"
                @selection-change="handleSelectionChange"
                :row-class-name="tableRowClassName"
                header-cell-class-name="headerstyle"
                header-align="center">
            <el-table-column
                    type="selection"
                    width="55"
            >
            </el-table-column>
            <el-table-column
                    prop="pictures"
                    label="商品图片"
                    width="100px"
                    show-overflow-tooltip
            >
                <template scope="scope">
                   <img :src="scope.row.pictures" width="80" height="80" class="head_pic"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="details"
                    label="商品详情"
                    width="360px"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="scprice"
                    label="市场价"
                    width="100px"
                    class="pc"
                    >
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="订购价"
                    width="100px"
                    slot-scope="tab0"
                    v-model="tableData[tab0.$index].price"
                    show-overflow-tooltip
                    >
                {{}}
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="数量"
                    width="150px"
                    show-overflow-tooltip
            >
                <template slot-scope="tab" >
                    <div class="box">
                        <ul id="car">
                            <li><button v-on:click="subtract(tab.$index)" class="jian">-</button></li>
                            <li><input type="text" value="5" size="1" v-model="tableData[tab.$index].number" class="shu"></li>
                            <li><button v-on:click="add(tab.$index)" class="jia">+</button></li>
                        </ul>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="action"
                    label="操作"
                    width="100px"
                    show-overflow-tooltip
                    >
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px" class="jisuan">
            <a class="back" href="/" style="width:90px;"><span class="ico ico-back"></span>继续挑选</a>
            <div class="set-stat">
                应付金额:
                <div class="price">
                    <span class="price-sign">¥</span>
                    <span class="price-num" id="totalMoney">{{money}}</span>
                </div>
                <button class="btn" type="button" id="jiesuan">去结算</button>
            </div>

        </div>
    </el-main>

</template>

<script>

    export default {

        data() {
            return {

                tableData: [{
                    pictures:require('../../../assets/images00/xiangq.jpg'),
                    details: '鲜花',
                    scprice: 343,
                    price: 66,
                    number:2,
                    action:'发的是多少'
                }, {
                    pictures:require('../../../assets/images00/xiangq.jpg'),
                    details: '鲜花',
                    scprice: 343,
                    price: 665,
                    number:2,
                    action:'发的是多少'
                },
                    {
                        pictures:require('../../../assets/images00/xiangq.jpg'),
                        details: '鲜花',
                        scprice: 343,
                        price: 65,
                        number:2,
                        action:'发的是多少'
                    },
                    {
                        pictures:require('../../../assets/images00/xiangq.jpg'),
                        details: '鲜花',
                        scprice: 343,
                        price: 665,
                        number:2,
                        action:'发的是多少'
                    },
                    {
                        pictures:require('../../../assets/images00/xiangq.jpg'),
                        details: '鲜花',
                        scprice: 343,
                        price: 665,
                        number:2,
                        action:'发的是多少'
                    }],
                multipleSelection: [],
            }
        },

        methods: {


            add:function(index)
             {
                this.tableData[index].number++;
            },
            subtract:function(index){
                if (this.tableData[index].number<=0){
                    alert('受不了啦，宝贝不能再减少啦')
                    this.tableData[index].number++;
                }else {
                    this.tableData[index].number--;
                }
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },



            getRowClass({rowIndex}) {
                //obj = {row, column, rowndex, columnIndexI}
                var style = {background:'#ebebeb',fontsize:'30px',height:'40px'};
                if (rowIndex== 0) {
                    return style;
                } else {
                    return ''
                }
            },
            money: function () {

            },
           /*cellStyle({row,column,rowIndex,columIndex})
           {
               return "text-align:center";
           },
            rowClass({row,rowIndex})
            {
                return "text-align:center;";
            },*/

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }

        }
    }

   </script>

<style scoped>

    /*. table-th{
        text-align: center;
        background:#97a8be;
        height: 40px;
        font-size: 20px;
    }*/
    .jian{
        float: left;
        height: 12px;
        width: 12px;
        margin-top: 7px;
        margin-right: 2px;

    }
    .shu{
        float: left;
        width: 40px;
        height: 25px;
        border: 1px solid #97a8be;
        margin-right: 2px;
    }
    .jia{
        float: left;
        height: 12px;
        width: 12px;
        margin-top: 7px;
        margin-right: 2px;
    }

    ul,li{
        list-style: none;
    }
    .car li{
        float: left;
    }
    input{
        text-align: center;
    }
    .head_pic{
        float: left;
    }
   .xiangqing{
       float: left;
       margin-left: 8px;
       text-align: center;
       line-height: 80px;
   }
    .bghead{
        background: #ff4d51;
    }
    .rowheight{
        height:120px ;
    }
    ul,li
    {
        list-style: none;
    }

    a {
        color:#000000;
        text-decoration: none;
        cursor: pointer;
    }
    a:hover{
        color:#ff4d51;
    }

    .top1 {

        font-size: 15px;
        width: 1355px;
        height:35px;
        position:relative;
        top: -62px;
        left: -85px;
        overflow: hidden;
        background-color: #8c939d;
        background: rgba(242, 242, 242, 1);


    }
    .top-right{
        width: 100%;
        margin-left: 860px;
    }

    .top-right .site{
        display: block;
        list-style: none;
        float: left;
        margin-right: 10px;
        height:35px;
        text-align: center;
        margin-top: 15px;
        display: block;

    }
    .cart0{
        display:  inline-block;
        width: 25px;
        height: 30px;
        display: inline-block;
        background: url("../../../assets/images00/duolei.png");
        background-position: -340px -284px;
        background-repeat: no-repeat;
    }
    .cart{
        position: absolute;
    }
   /* .sousuo{
        position:relative;
        top: -62px;
        left: -85px;
        width: auto;
        height:80px;
        width: 1355px;
        border: 1px solid #0000ff;
    }*/
    .timu{
        height:80px;
        width: 400px;
        float:left;
        font-family:FZShuTi;
        font-weight: 500;
        font-size: 36px;
        color:#ff4d51;
        text-align: center;
        line-height: 80px;
        margin-top: -60px;
        margin-left: 10px;


    }
   /* .anniu{
        height:80px;
        width: 400px;
        position: relative;
        left: 585px;

    }*/
    .site0{
        margin-left: 40px;
    }
    .in1 {
        width: 240px;
        height: 35px;
        float: left;
        margin-right: 0px;
        position: absolute;
        left: 60px;
        top:30px;
        border-radius: 10px;
        border:1px solid #ff6a00;
        padding-left:8px;

    }
    .in2{
        float: left;
        width:80px;
        height: 35px;
        position: absolute;
        left:300px;
        top:30px;
        background: rgba(255, 106, 0, 1);
        border:1px solid #ff6a00;
        color: #edf2fc;
        font-size: 15px;
    }
    .jisuan{
        height: 50px;
        width: 965px;
        border: 1px solid #ff4d51;
        margin: 0 auto;
    }
    .back{
        height: 52px;
        width: 90px;
        float: left;
        font-size:15px;
        text-align: center;
        line-height: 52px;
        
    }
    .ico-back{
        margin-top: 12px;
        margin-left: 5px;
        background-image: url("../../../assets/images00/cartduo.png");
        background-position: -68px -318px;
        background-repeat: no-repeat;
        width: 22px;
        height: 22px;
        display: inline-block;
    }
    .set-stat{
        float: right;
        font-size: 12px;
        line-height: 52px;
        font-family: tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
    }
    .price{
        margin-right:30px;
        font-size: 18px;
        font-weight: bold;
        display: inline-block;
        color: #ff6a00;
    }
    .btn{
        font-family: tahoma, arial, 'Hiragino Sans GB', '\5FAE\8F6F\96C5\9ED1', sans-serif;
        font-weight: bold;
        /* float: right; */
        width: 120px;
        height: 52px;
        color: #ffffff;
        border-color: #f56600;
        background-color: #f56600;
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        display: inline-block;
        margin-bottom: 0;
    }

    </style>