<!--<template>-->
<!--   <el-main>test</el-main>-->
<!--</template>-->
<template>
    <el-main style="margin: 0px; padding: 10px">
        <el-row style="margin:10px 0px;background-color: #FCFCFC;height:60px;line-height: 60px;border:1px solid #e6e6e6">
            <el-col :span="16" style="padding-left:15px">
                <span style="font-size: 15px;margin-left: 10px">创建时间:</span>
                <el-date-picker size="small"
                                v-model="queryParam.start"
                                align="right"
                                type="date" value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                style="width:130px;position: relative">
                </el-date-picker>
                到
                <el-date-picker
                        style="width:130px"
                        size="small"
                        v-model="queryParam.end"
                        align="right"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col :span="26">
                <el-button round size="small" type="primary" icon="el-icon-search" @click="getOrderList">搜索</el-button>
                <el-button round size="small" type="success" icon="el-icon-refresh" @click="ResetOrderList">重置</el-button>
                <el-button round size="small" type="danger" icon="el-icon-delete" @click="deleteOrders">删除</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData"
                  v-loading="loadingorderlist"
                  element-loading-text="正在拼命加载，请稍等片刻 ~o( =∩ω∩= )m"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  @expand-change="expandChange"
                  @selection-change="selectionChange"
                  @row-click="openDetail"
                  ref="ordertable"
                  style="width:100%">
            <el-table-column align="center" type="selection" prop="orderid"></el-table-column>
            <el-table-column
                    prop="orderid"
                    label="订单号">
            </el-table-column>
            <el-table-column prop="{products,orderid}" label="" width="100" type="expand">
                <template slot-scope="scope1">
                    <el-table
                            class="table-expand"
                            style="width: 100%"
                            :data="scope1.row.products">
                        <el-table-column
                                prop="productid"
                                label="商品编号"
                                sortable>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="商品名称">        <!--:formatter="formatter"   使用这个可以传回该列的值-->
                        </el-table-column>
                        <el-table-column
                                prop="pictureurl"
                                label="图片">
                            <template slot-scope="scope">
                                <el-image  :src="config.serverimagepath+scope.row.pictureurl.split(';')[0]" class="detail-image"/>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="价格">
                        </el-table-column>
                        <el-table-column
                                prop="sale"
                                label="数量">
                            <template slot-scope="scope">
                                <el-button style="padding: 5px" :disabled="scope.row.sale <= 1 || scope.row.createdate.indexOf('edit') < 0" icon="el-icon-minus" @click="scope.row.sale--"></el-button>
                                <el-input style="padding: 5px; width:80px" :disabled="scope.row.createdate.indexOf('edit') < 0" class="el-input-text-center" v-model="scope.row.sale" @change="saleChange(scope.row)"></el-input>
                                <el-button style="padding: 5px" :disabled="scope.row.createdate.indexOf('edit') < 0" icon="el-icon-plus" @click="scope.row.sale++"></el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="{price,sale}"
                                label="总价">
                            <template slot-scope="scope">{{scope.row.price * scope.row.sale}}</template>
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态">
                            <template slot-scope="scope">{{scope.row.status|orderstatusFilter}}</template>
                        </el-table-column>
                        <el-table-column
                                width="140"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini"
                                           :type="banAssign(scope.row)?'message':'warning'"
                                           icon="el-icon-goods"
                                           style="padding: 4px"
                                           :disabled="banAssign(scope.row)"
                                           circle
                                           title="发货"
                                           @click="assignOrder(scope.row, scope1.row.orderid)">
                                </el-button>
                                <el-button size="mini"
                                           :type="banSave(scope.row)?'message':'success'"
                                           icon="el-icon-check"
                                           style="padding: 4px"
                                           :disabled="banSave(scope.row)"
                                           circle
                                           title="保存"
                                           @click="saveOrder(scope.row, scope1.row.orderid)">
                                </el-button>
                                <el-button size="mini"
                                           :type="banEdit(scope.row)?'message':'primary'"
                                           icon="el-icon-edit"
                                           style="padding: 4px"
                                           :disabled="banEdit(scope.row)"
                                           circle
                                           title="编辑"
                                           @click="editOrder(scope.row)">
                                </el-button>
                                <el-button size="mini"
                                           :type="banDelete(scope.row)?'message':'danger'"
                                           icon="el-icon-delete"
                                           style="padding: 4px"
                                           :disabled="banDelete(scope.row)"
                                           circle
                                           title="删除"
                                           @click="deleteOrderProduct(scope.row, scope1.$index,scope.$index, )">
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                    prop="userid"
                    label="用户">
            </el-table-column>
            <el-table-column
                    prop="createdate"
                    label="日期">
            </el-table-column>
            <el-table-column
                    prop="products"
                    label="数量">
                <template slot-scope="scope">{{scope.row.products|saleFliter}}</template>
            </el-table-column>
            <el-table-column
                    prop="products"
                    label="金额">
                <template slot-scope="scope">{{scope.row.products|priceFliter}}</template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="danger"
                               icon="el-icon-delete"
                               @click="deleteOrder(scope.row, scope.$index)">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentpage"
                :page-sizes="pagesizelist"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="orderlist.length">
        </el-pagination>
    </el-main>
</template>

<script>
    import config from "../../../libs/config";
    import {deleteOrder, getOrderList, updateOrderProduct} from "../../../server/admin";

    export default {
        filters:{
            saleFliter(products){
                var res = 0;
                for(var i in products){
                    res += products[i].sale*1
                }
                return res
            },
            priceFliter(products){
                var res = 0;
                for(var i in products){
                    res += products[i].price*products[i].sale
                }
                return res
            },
            orderstatusFilter(status){
                const list = config.orderstatus
                for(var i in list){
                    if(list[i].code+'' === status+'') return list[i].status
                }
                return '未知'
            }
        },

        methods: {
            //订单表格行点击事件，展开详情
            openDetail(row){
              let $ordertable = this.$refs.ordertable
                $ordertable.toggleRowExpansion(row)
            },

            //订单表格，复选框改变事件
            selectionChange(val){
              this.checks = val;
            },
            //订单表格，点击箭头展开隐藏的订单详情，该函数的目的是为了一次只展开一行
            expandChange(row, expandedRows){
              if(expandedRows.length > 1){
                  expandedRows.shift()
              }
            },
            //分页组件，页容量改变
            handleSizeChange(val){
                this.pagesize = val
                this.getOrderList()
            },
            //分页组件，页序号改变
            handleCurrentChange(val) {
                this.currentpage = val
                this.getOrderList()
            },
            //批量删除订单
            deleteOrders(){
                let list = []
                for(var i in this.checks)
                    list.push(this.checks[i].orderid)
                this.$confirm('此操作将删除选中订单，是否继续？', '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    deleteOrder({orderid:list.join(';')}).then(response=>{
                        if(response.code === 200){
                            this.$message.success('删除成功')
                            this.getOrderList()
                        }else{
                            this.$message.warning(response.msg)
                        }
                    }).catch(err=>{
                        this.$message.error(err.response.status)
                    })
                });
            },

            ResetOrderList(){
               for(var key in this.queryParam)
                   this.queryParam[key] = ''
                this.currentpage = 1
                this.getOrderList()
            },

            //获取订单列表
            getOrderList(){
                this.loadingorderlist = true
                getOrderList(this.queryParam).then(response =>{
                    if(response.code === 200){
                        this.orderlist = response.data
                        while(this.currentpage != 1 && this.pagesize*(this.currentpage-1) >= this.orderlist.length){
                            this.currentpage--
                        }
                        this.tableData = this.orderlist.slice(this.pagesize*(this.currentpage-1), this.pagesize*this.currentpage)
                    }
                    else{
                        this.$message.warning(response.msg)
                    }
                    this.loadingorderlist = false
                }).catch(err =>{
                    this.$message.error(err.response.status)
                    this.loadingorderlist = false
                })
            },
            //数量合法校验
            saleChange(row){
                if(!row.sale.match('^\\d+$') || row.sale*1 < 1){
                    row.sale = row.stock
                }
            },

            banAssign(row){
                //订单处于已支付状态才能发货
                if(row.createdate.indexOf('edit') < 0 && row.status+'' === '12') return false
                else return true
            },

            banEdit(row){
                //订单处于已支付状态才能编辑
                if(row.status+'' === '12' && row.createdate.indexOf('edit') < 0) return false
                else return true
            },

            banDelete(row){
                //只能删除用户已删除的订单
                if(row.status === '00') return false
                else return true
            },

            banSave(row){
                //编辑状态下啊保存可用
                if(row.createdate.indexOf('edit') >= 0) return false
                else return true
            },

            editOrder(row){
                row.createdate = 'edit'
            },

            saveOrder(row, orderid){
                row.createdate = ''
                if(row.sale != row.stock){
                    updateOrderProduct({orderid:orderid,productid:row.productid,count:row.sale}).then(response=>{
                        if(response.code === 200){
                            row.stock = row.sale
                            this.$message.success('保存成功')
                        }
                        else{
                            this.$message.warning(response.msg)
                        }
                    }).catch(err =>{
                        this.$message.error(err.response.status)
                    })
                }
            },

            assignOrder(row, orderid){
                updateOrderProduct({orderid:orderid,productid:row.productid,count:'',status:'13'}).then(response=>{
                    if(response.code === 200){
                        row.status = '13'
                        this.$message.success('发货成功')
                    }
                    else{
                        this.$message.warning(response.msg)
                    }
                }).catch(err =>{
                    this.$message.error(err.response.status)
                })
            },

            //删除单个订单
            deleteOrder(row){
                //这两句是为了处理行点击事件展开和收起详情，我们再触发一次，就相当于没有做更改
                let $ordertable = this.$refs.ordertable
                $ordertable.toggleRowExpansion(row)

                deleteOrder({orderid:row.orderid}).then(response =>{
                    if(response.code === 200){
                        const i =  this.orderlist.findIndex(e => e.orderid === row.orderid)
                        console.log(i)
                        this.orderlist.splice(i, 1)
                        while (this.currentpage != 1 && (this.currentpage-1)*this.pagesize >= this.orderlist.length){
                            this.currentpage--;
                        }
                        this.tableData = this.orderlist.slice((this.currentpage-1)*this.pagesize, this.currentpage*this.pagesize)
                        this.$message.success(response.msg)
                    }
                    else{
                        this.$message.warning(response.msg)
                    }
                }).catch(err =>{
                    this.$message.error(err.response.status)
                })
            },

            //删除订单的单个商品
            deleteOrderProduct(row, parentindex, index){
                const pindex= this.pagesize*this.currentpage+parentindex*1
                deleteOrder({orderid:this.orderlist[pindex].orderid,productid:row.productid}).then(response =>{
                    if(response.code === 200){
                        this.orderlist[pindex].products.splice(index, 1)
                        if(this.orderlist[pindex].products.length===0){
                            this.orderlist.splice(pindex, 1)
                            while(this.currentpage != 1 && this.pagesize*(this.currentpage-1) >= this.orderlist.length){
                                this.currentpage--
                            }
                            this.tableData=this.orderlist.slice((this.currentpage-1)*this.pagesize, this.currentpage*this.pagesize)
                        }
                        this.$message.success(response.msg)
                    }
                    else{
                        this.$message.warning(response.msg)
                    }
                }).catch(err =>{
                    this.$message.error(err.response.status)
                })

            }
        },

        data(){
            return{
                loadingorderlist:false,
                checks:[],
                queryParam:{start:'', end:'', userid:'', status:''},
                config:config,
                currentpage:1,
                pagesize:5,
                pagesizelist:[5, 10, 20, 50],
                orderlist:[],
                tableData:[],
            }
        },

        mounted() {
            this.getOrderList()
        }
    }
</script>

<style scoped>
    .table-expand {

    }

    /*订单详情中商品购买数量块*/
    .el-input-text-center{
        width: 30%;
        margin: 0 4px;
    }
    /*订单详情中的商品购买数量文本居中*/
    .el-input-text-center >>> .el-input__inner{
        text-align: center;
    }

    /*订单详情中的图片样式*/
    .detail-image{
        width: 60px !important;
        height: 60px !important;
    }


</style>