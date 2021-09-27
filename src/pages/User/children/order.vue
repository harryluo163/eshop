<template>
  <div>
    <y-shelf title="我的订单">
      <div slot="content">
        <div v-if="orderList.length">
          <div v-for="(item,i) in orderList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="date" v-text="item.createdate"></span>
                  <span class="order-id"> 订单号： <a @click="orderDetail(item.orderid)">{{item.orderid}}</a> </span>
                </div>
                <div class="f-bc">
                  <span class="price">单价</span>
                  <span class="num">数量</span>
                  <span class="operation">商品操作</span>
                </div>
              </div>
              <div class="last">
                <span class="sub-total">实付金额</span>
                <span class="order-detail"> <a @click="orderDetail(item.orderid)">查看详情 ><em class="icon-font"></em></a> </span>
              </div>
            </div>
            <div class="pr">
              <div class="cart" v-for="(good,j) in item.products" :key="j">
                <div class="cart-l" :class="{bt:j>0}">
                  <div class="car-l-l">
                    <div class="img-box"><a @click="goodsDetails(good.productid)" style="cursor: pointer;"><img :src="serverimagepath+(good.pictureurl||'').split(';')[0]" alt=""></a></div>
                    <div class="ellipsis"><a style="color: #626262;cursor: pointer;" @click="goodsDetails(good.productid)">{{good.name}}</a></div>
                  </div>
                  <div class="cart-l-r">
                    <div>¥ {{good.price}}</div>
                    <div class="num">{{good.sale}}</div>
                    <div class="type">
                      <el-button style="margin-left:20px" @click="_delOrder(item,i,)" type="danger" size="small" v-if="j<1" class="del-order">删除此订单</el-button>
                      <!-- <a @click="_delOrder(item.orderId,i)" href="javascript:;" v-if="j<1" class="del-order">删除此订单</a> -->
                    </div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="prod-operation pa" style="right: 0;top: 0;">
                <!-- <div class="total">¥ {{item.price*22}}</div> -->
                <div class="total">¥ {{checkPrice(item)}}</div>
                <div v-if="item.products[0].status === '11'">
                  <el-button @click="orderPayment(item)" type="primary" size="small">现在付款</el-button>
                </div>
                <div class="status" v-if="item.products[0].status !== '11'"> {{getOrderStatus(item.products[0].status)}}  </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 100px 0;text-align: center">
            你还未创建过订单
          </div>
        </div>
      </div>
    </y-shelf>
    <div style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { orderList, delOrder } from '../../../server/shop'
  import config from '../../../libs/config'
  import YShelf from '../../../components/shelf'
  // import { getStore } from '../../../../utils/storage'
  export default {
    data () {
      return {
        serverimagepath:config.serverimagepath,
        orderList: [],
        // userId: '',
        orderStatus: '',
        currentPage: 1,
        pageSize: 5,
        total: 0,
      }
    },
     created () {
      // this.userId = getStore('userId')
      this._orderList()
    },
    computed:{
      userid() {
      return this.$store.state.userInfo.userid;
    },
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
       // 订单总价格
    checkPrice (list){
      let goods=list.products
      // console.log('dingdan',list)
      let totalPrice = 0
      goods.forEach(item => {
        // if (item.checked === '1') {
          totalPrice += (item.sale * item.price)
        // }
      })
      // this.orderTotal = totalPrice
      return totalPrice
    },
      // orderPayment (orderid) {
      //   this.$router.push('/payment?orderid=' + orderid)
      // },
      orderPayment (list){
        this.$confirm('确认支付, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // let sign=true
        list.products.forEach(element =>{
           delOrder({orderid:list.orderid,productid:element.productid,status:'12'}).then(res => {
          // console.log(res)
          if (res.code === 200) {     
            // sign=true 
            this._orderList()
          } else {
            // sign=false
            this.$message({
            type: 'info',
            message: '支付失败' })
          }
        })
        })
          this.$message({
            type: 'success',
            message: '支付成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消支付'
          });          
        });
      },
      goodsDetails (id) {
        this.$router.push('/goodsDetails?productid=' + id)
      },
      orderDetail (orderid) {
        this.$router.push({
          path: '/orderDetail',
          query: {
            orderid: orderid
          }
        })
      },
      getOrderStatus (status) {
        if (status === '12') {
          return '待发货'
        } else if (status === '13') {
          return '待收货'
        } else if (status === '14') {
          return '交易成功'
        } else if (status === '10') {
          return '交易关闭' 
        }
      },
      handleSizeChange (val) {
        this.pageSize = val
        this._orderList()
        this.loading = true
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._orderList()
        this.loading = true
      },
      _orderList () {
        orderList().then(res => {
          // console.log('所有订单',res.data)
          let result=res.data
          let list=[]
          this.total=0
          // this.total=result.length
          // console.log('所有订单',result)
          result.forEach(item => {
            if(item.userid==this.userid && item.products[0].status!='00'){
              //  console.log('这里是符合id的订单',item)
                list.push(item)
                this.total++
            }
          })
           while(this.currentPage != 1 && this.pageSize*(this.currentPage-1) >= list.length){
                            this.currentPage--
            }
            this.orderList = list.slice(this.pageSize*(this.currentPage-1), this.pageSize*this.currentPage)
        })
      },
      _delOrder (list, i) {
        let sign=true
        list.products.forEach(element =>{
        delOrder({orderid:list.orderid,productid:element.productid,status:'00'}).then(res => {
          // console.log(res)
          if (res.code === 200) {      
            sign=true
          } else {
            sign=false
            this.message('删除失败')
          }
        })
        })
        if(sign){
        this.orderList.splice(i, 1)
        }
      }
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";
  .total{
        padding: 0px 40px 0px 30px;
            min-inline-size: max-content;
        // margin-right:60px;
  }
  .order-detail{
    >a{
      color:#5079d9;
      cursor: pointer;
    }
  }
  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    >a{
      color:#5079d9;
      cursor: pointer;
    }
    margin-left: 25px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      float:none;
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    float:right;
    margin-top:-112px;
    align-items: center;
    justify-content: center;
    width: 254px;   
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }
</style>
