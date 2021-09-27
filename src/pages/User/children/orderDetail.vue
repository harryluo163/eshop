<template>
  <div>
    <y-shelf v-bind:title="orderTitle">
      <div slot="content">
        <div class="detail" v-if="orderList.length">
          <div class="orderStatus" v-if="orderStatus !== -1">
            <el-steps :space="1000" :active="orderStatus">
              <el-step title="下单" v-bind:description="createTime"></el-step>
              <el-step title="付款" description=""></el-step>
              <el-step title="待发货" description=""></el-step>
              <el-step title="待收货" description=""></el-step>
              <el-step title="交易成功" description=""></el-step>
            </el-steps>
          </div>
          <div class="orderStatus-close" v-if="orderStatus === -1">
            <el-steps :space="780" :active="2">
              <el-step title="下单" v-bind:description="createTime"></el-step>
              <!-- <el-step title="交易关闭" v-bind:description="closeTime"></el-step> -->
              <el-step title="交易关闭" description=""></el-step>
            </el-steps>
            
          </div>
          <div class="status-now" v-if="orderStatus === 1">
            <ul>
              <li class="status-title"><h3>订单状态：待付款</h3></li>
              <li class="button">
                <el-button @click="orderPayment()" type="primary" size="small">现在付款</el-button>
                <el-button @click="_cancelOrder()" size="small">取消订单</el-button>
              </li>
            </ul>
            <!-- <p class="realtime">
              <span>您的付款时间还有 </span>
              <span class="red"><countDown v-bind:endTime="finishTime" endText="已结束"></countDown></span>
              <span>，超时后订单将自动取消。</span>
            </p> -->
          </div>
          <div class="status-now" v-if="orderStatus === -1">
            <ul>
              <li class="status-title"><h3>订单状态：已关闭</h3></li>
            </ul>
            <p class="realtime">
              <span>您的订单已关闭。</span>
            </p>
          </div>
           <div class="status-now" v-if="orderStatus === 2">
            <ul>
              <li class="status-title"><h3>订单状态：已支付，等待发货</h3></li>
            </ul>
            <!-- <p class="realtime">
              <span>您的订单已交易成功，感谢您的惠顾！</span>
            </p> -->
          </div>
           <div class="status-now" v-if="orderStatus === 3">
            <ul>
              <li class="status-title"><h3>订单状态：已支付，等待收货</h3></li>
              <li class="button">
                <el-button @click="_confirmOrder()" type="primary" size="small">确认收货</el-button>
                <!-- <el-button @click="_cancelOrder()" size="small">取消订单</el-button> -->
              </li>
            </ul>
          </div>
          <div class="status-now" v-if="orderStatus === 5">
            <ul>
              <li class="status-title"><h3>订单状态：已完成</h3></li>
            </ul>
            <p class="realtime">
              <span>您的订单已交易成功，感谢您的惠顾！</span>
            </p>
          </div>
          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">商品名称</span>
              </div>
              <div class="f-bc">
                <span class="price price11">单价</span>
                <span class="num num11">数量</span>
                <span class="operation">小计</span>
              </div>
            </div>
          </div>

          <!--商品-->
          <div class="goods-table">
            <div class="cart-items" v-for="(item,i) in orderList" :key="i">
              <a @click="goodsDetails(item.productid)" class="img-box"><img :src="serverimagepath+(item.pictureurl||'').split(';')[0]" alt=""></a>
              <div class="name-cell ellipsis">
                <a @click="goodsDetails(item.productid)" title="" target="_blank">{{item.name}}</a>
              </div>
              <div class="n-b">
                <div class="price">¥ {{item.price}}</div>
                <div class="goods-num">{{item.sale}}</div>
                <div class="subtotal"> ¥ {{item.price * item.sale}}</div>
              </div>
            </div>
          </div>
          <!--合计-->
          <div class="order-discount-line">
            <p style="font-size: 14px;font-weight: bolder;"> <span style="padding-right:47px">商品总计：</span>
              <span style="font-size: 16px;font-weight: 500;line-height: 32px;">¥ {{orderTotal}}</span>
            </p>
            <p><span style="padding-right:30px">运费：</span><span style="font-weight: 700;">+ ¥ 0.00</span></p>
            <p class="price-total"><span>应付金额：</span><span class="price-red">¥ {{orderTotal}}</span></p>
          </div>

          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">收货信息</span>
              </div>
            </div>
          </div>
          <div style="height: 155px;padding: 20px 30px;">
            <p class="address_name address">姓名：{{ userName }}</p>
            <p class="address_tel address">联系电话：{{ tel }}</p>
            <p class="address_ address">详细地址：{{ streetName }}</p>
          </div>
        </div>
        <div v-else>
          <div style="padding: 100px 0;text-align: center">
            获取该订单信息失败
          </div>
        </div>
      </div>
    </y-shelf>

  </div>
</template>
<script>
  import { orderList, cancelOrder } from '../../../server/shop'
  import YShelf from '../../../components/shelf'
  // import countDown from '../../../components/countDown'
  import config from '../../../libs/config'
  export default {
    data () {
      return {
        order:[],
        serverimagepath:config.serverimagepath,
        orderList: [],
        userid: '',
        orderStatus: 0,
        orderid: '',
        userName: '',
        tel: '',
        streetName: '',
        orderTitle: '',
        createTime: '',
        closeTime: '',
        finishTime: '',
        orderTotal: ''
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
        // 订单总价格
    // checkPrice (list){
    //   let goods=list.products
    //   let totalPrice = 0
    //   goods.forEach(item => {
    //     // if (item.checked === '1') {
    //       totalPrice += (item.count * item.price)
    //     // }
    //   })
    //   // this.orderTotal = totalPrice
    //   return totalPrice
    // },
      // orderPayment () {
      //   window.open('/payment?orderid=' + orderid)
      // },
      orderPayment () {
        let list =this.order
        this.$confirm('确认支付, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        list.products.forEach(element =>{
        cancelOrder({orderid:list.orderid,productid:element.productid,status:'12'}).then(res => {
          // console.log(res)
          if (res.code === 200) {    
            this._getOrderDet()  
          } else {
            this.message('支付失败')
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
        window.open( '/goodsDetails?productid=' + id)
      },
      _getOrderDet () {
        orderList().then(res => {
          // this.finishTime = res.result.finishDate
          res.data.forEach(item => {
            if(item.orderid==this.orderid){
               if (item.products[0].status === '11') {
                 //待支付
                  this.orderStatus = 1
               } else if (item.products[0].status === '14') {
                 //交易成功
                  this.orderStatus = 5  
               } else if (item.products[0].status === '10') {
                 //交易取消
                   this.orderStatus = -1
               }else if (item.products[0].status === '12') {
                 //已支付
                   this.orderStatus = 2
               }else if (item.products[0].status === '13') {
                 //待收货
                   this.orderStatus = 3
               }
              //  console.log('dingdan ',item)
              this.order=item
              this.orderList = item.products
              // this.orderTotal = checkPrice(item)
             this.userName = item.ordername
             this.tel = item.tel
             this.streetName = item.address
             this.createTime = item.createdate
            //  this.closeTime = item.result.closeDate
            let goods=item.products
            let totalprice=0
            goods.forEach(item => {
              totalprice+= Number(item.sale * item.price)
              // console.log('xiaoji',item.sale * item.price)
              // console.log(this.orderTotal)
            })
            this.orderTotal=totalprice
           }
          }); 
        })
      },
      _confirmOrder () {
        let list=this.order
        list.products.forEach(element =>{
        cancelOrder({orderid:list.orderid,productid:element.productid,status:'14'}).then(res => {
          // console.log(res)
          if (res.code === 200) {    
            this._getOrderDet()  
          } else {
            this.message('确认失败')
          }
        })
        }) 
      },
      _cancelOrder () {
        // cancelOrder({orderid: this.orderid}).then(res => {
        //   if (res.success === true) {
        //     this._getOrderDet()
        //   } else {
        //     this.message('取消失败')
        //   }
        // })
        let list=this.order
        list.products.forEach(element =>{
        cancelOrder({orderid:list.orderid,productid:element.productid,status:'10'}).then(res => {
          // console.log(res)
          if (res.code === 200) {    
            this._getOrderDet()  
          } else {
            this.message('取消失败')
          }
        })
        }) 
      }
    },
    created () {
      // this.userid = getStore('userId')
      this.orderid = this.$route.query.orderid
      this.orderTitle = '订单号：' + this.orderid
      this._getOrderDet()
    },
    components: {
      YShelf,
      // countDown
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";
  .price11{
    margin-right:93px;
  }
  .num11{
    margin-right:36px;
  }
  .orderStatus {
    // text-align: initial;
    text-align: -webkit-auto;
    // display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -150px 20px 60px;
  }

  .orderStatus-close {
    // text-align: initial;
       text-align: -webkit-auto;
    // display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -800px 20px 60px;
  }

  .status-now {
   
    background: #F6F6F6;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 22px 30px 20px;
    margin: 0 30px 30px 30px;
    line-height: 38px;
  }

  .status-title {

     list-style: none;
    font-size: 18px;
    color: #666;
  }

  .button {
     list-style: none;
    float: right;
    margin: -37px 0 20px 0;
  }

  .realtime {
    border-top: 1px solid #dcdcdc;
    margin-top: 20px;
    padding-top: 26px;
  }

  .red {
    color: #d44d44;
  }

  .address {
    display:flex;
    line-height: 38px;
    word-wrap: break-word;
    word-spacing: normal;
    word-break: break-all;
    color: #626262;
  }

  .img-box {
    border: 1px solid #EBEBEB;
    margin-left: -80px;
  }
  
  img {
    display: block;
    @include wh(80px);
  }

  .goods-table {
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 150px;
        text-align: center;
      }
    }
    .cart-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      padding: 15px 0 15px 111px;
      border-bottom: 1px solid #EFEFEF;
      a {
        color: #333;
      }
    }
    .price {
      padding-left: 130px;
    }
    .goods-num {
      padding-left: 60px;
    }
  }

  .order-discount-line {
    padding: 22px 30px 20px;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
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
    margin-left: 10px;
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

  .price-total {
    height: 54px;
    line-height: 54px;
    font-size: 18px;
  }

  .price-red {
    font-weight: 700;
    color: #d44d44;
  }
</style>
