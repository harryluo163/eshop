<template>
  <div class="checkout">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="w" style="padding-top: 40px;">
      <!-- 收货地址 -->
      <y-shelf title="收货信息">
        <div slot="content">
          <div class="info">
            <el-form :inline="true" :model="msg" class="demo-form-inlinne">
              <el-form-item label="收件人">
                <el-input type="text" v-model="msg.userName"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input type="text" v-model="msg.tel"></el-input>
              </el-form-item>
              <el-form-item label="收件地址">
                <el-input type="text" v-model="msg.streetName" style="width:350px"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </y-shelf>
      <!-- 购物清单 -->
      <y-shelf title="购物清单">
        <div slot="content">
          <div class="box-inner ui-cart">
            <div>
              <!--标题-->
              <div class="cart-table-title">
                <span class="name">商品信息</span>
                <span class="subtotal">小计</span>
                <span class="num">数量</span>
                <span class="price">单价</span>
              </div>
              <!--列表-->
              <div class="cart-table" v-for="(item,i) in cartList" :key="i" > 
                <div class="cart-group divide pr" :data-productid="item.productid">
                  <div class="cart-top-items">
                    <div class="cart-items clearfix">
                      <!--图片-->
                      <div class="items-thumb fl" >
                        <img :alt="item.name" :src="item.pictureurl" />
                        <a @click="goodsDetails(item.productid)" :title="item.name" target="_blank"></a>
                      </div>
                      <!--信息-->
                      <div class="name hide-row fl">
                        <div class="name-table">
                          <a
                            @click="goodsDetails(item.productid)"
                            :title="item.name"
                            target="_blank"
                            v-text="item.name"
                          ></a>
                        </div>
                      </div>
                      <!--商品数量-->
                      <div>
                        <!--总价格-->
                        <div
                          class="subtotal"
                          style="font-size: 14px"
                        >¥ {{item.price * item.productNum}}</div>
                        <!--数量-->
                        <div class="item-cols-num">
                          <span v-text="item.productNum"></span>
                        </div>
                        <!--价格-->
                        <div class="price">¥ {{item.price}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 合计 -->
            <div class="cart-bottom-bg fix-bottom">
              <div class="fix-bottom-inner">
                <div class="shipping">
                  <div class="shipping-box" style="padding: 0 40px;">
                    <div class="shipping-total shipping-price">
                      <h4 class="highlight">
                        应付总额：
                        <em>￥{{checkPrice}}</em>
                      </h4>
                    </div>
                  </div>
                  <y-button
                    class="big-main-btn"
                    :classStyle="submit?'disabled-btn':'main-btn'"
                    style="margin: 0 100px;width: 130px;height: 50px;line-height: 50px;font-size: 16px;"
                    :text="submitOrder"
                    @btnClick="_submitOrder"
                  ></y-button> 
                </div>
              </div>
            </div>
          </div>
        </div>   
      </y-shelf>
    </div>
    <y-footer></y-footer>
  </div>
</template>
<script>
 import config from '../../libs/config'
import { productHome, submitOrder } from "../../server/shop";
import { mapMutations } from 'vuex'
import YShelf from "../../components/shelf";
// import {  mapState } from 'vuex'
import YButton from "../../components/YButton";
// import YPopup from "../../components/popup";
import YHeader from "../../common/header";
import YFooter from "../../common/footer";
// import { getStore } from "../../../utils/storage";
export default {
  data() {
    return {
      serverimagepath:config.serverimagepath,
      cartList: [],
      addList: [],
      addressId: "0",
      num: "", // 立刻购买
      productid: "",
      msg: {
        userName: this.$store.state.userInfo.username,
        tel: "",
        streetName: "",
      },
      // userName: "",
      // tel: "",
      // streetName: "",
      userId: "",
      orderTotal: 0,
      submit: false,
      submitOrder: "提交订单",
      cart1:[],
    };
  },
    created() {
    // this.userid = getStore("userid");
    let query = this.$route.query;
    if (query.productid && query.num) {
      this.productid = query.productid;
      this.num = query.num;
      this._productDet(this.productid);
      // console.log(query.productid)
    } else {
      this._getCartList();
      // console.log('other one',this.cartList)
    }
    // this._addressList();
  },
  computed: { 
    // ...mapState(
    //     ['cartList']
    //   ), 
    cart(){
      return this.$store.state.cartList
      
    },
      username() {
        return this.$store.state.userInfo.username
      },
    userid() {
        return this.$store.state.userInfo.userid
      },
    btnHighlight() {
      let msg = this.msg;
      return msg.userName && msg.tel && msg.streetName;
    },
    // 选中的总价格
    checkPrice (){
      let totalPrice = 0
      this.cartList && this.cartList.forEach(item => {
        // if (item.checked === '1') {
          totalPrice += (item.productNum * item.price)
        // }
      })
      // this.orderTotal = totalPrice
      return totalPrice
    }
  },
  mounted(){
    console.log('mounted',this.cart)
  },
  methods: {
     ...mapMutations([
         'REDUCE_CART'  
      ]),
    message(m) {
      this.$message.error({
        message: m
      });
    },
    goodsDetails(id) {
      // window.open(window.location.origin + "#/goodsDetails?productid=" + id);
       this.$router.push({path: '/goodsDetails', query: {productid:id}})
      //  console.log(id)
    },
    _getCartList() {
      // getcarts({ userid: this.userid }).then(res => {
      //   this.cartList = JSON.parse(res.data);
      //    this.cartList.forEach(item => {
      //      item.pictureul=(item.pictureurl||'').split(";")[0]
      //    })
      // });
      // this.cartList=this.cartList
      console.log('获取购物车列表 created',this.cart)
      this.cart.forEach(item=>{
        // console.log('购物车',item)
        if(item.checked==='1'){
          this.cartList.push(item)
        }
      })
    },
  
    // 提交订单后跳转付款页面
    _submitOrder() {
      this.submitOrder = "提交订单中...";
      this.submit = true;
      var array = [];
      if (this.msg.userName==""|| this.msg.tel==""|| this.msg.streetName==""||this.cartList.length === 0  ) {
        this.message("非法操作");
        this.submitOrder = "提交订单";
        this.submit = false;
        return;
      }
      if(!this.$route.query.productid){
        // console.log('执行购物车数据')
        //购物车里的数据
      for (var i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].checked === "1") {
          array.push(this.cartList[i]);
        }
      }
      submitOrder({userid:this.userid,ordername: this.msg.userName,address: this.msg.streetName,tel:this.msg.tel}).then(res => {
        console.log(this.userid)
        console.log('执行购物车数据', res)
        console.log(this.cart)
        if (res.code === 200) {
          this.REDUCE_CART()
          // console.log('提交购物车数据',this.userid,res)
          this.$message({
          message: '生成订单成功',
          type: 'success'
        })
          console.log('删除购物车数据',this.cart)
          this.to_orderList();
        } else { 
          this.submitOrder = "提交订单";
          this.submit = false;
        }
      })
      }else{
        //未加入购物车直接下单，仅一件商品
        let params={
          userid:this.userid,productid:this.cartList[0].productid,count:this.cartList[0].productNum,price:this.cartList[0].price,
          ordername: this.msg.userName,address: this.msg.streetName,tel:this.msg.tel,lx:"direct"
        }
        console.log('11111',params)
        console.log('22222',this.cartList)
        submitOrder(params).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$message({
          message: '生成订单成功',
          type: 'success'
        })
          this.to_orderList();
        } else {
          this.submitOrder = "提交订单";
          this.submit = false;
        }
        })
      }
    },
    // 去订单页面
    to_orderList() {
      this.$router.push({
        path: "/orderList",
        // query: {
        //   orderid: orderid
        // }
      });
    },
    _productDet(productid) {
      // console.log(productid)
      let cart11=[]
      productHome({productid}).then(res => {
        let item = JSON.parse(res.data)[0];
        // console.log(item)
        // console.log(res)
        item.checked = "1";
        item.pictureurl = this.serverimagepath+(item.pictureurl||'').split(";")[0];
        item.productNum = this.num;
        this.cartList.push(item);
        cart11=item
      });
      // this.cartList=cart1
      this.cart1=cart11
    }
  },

  components: {
    YShelf,
    YButton,
    // YPopup,
    YHeader,
    YFooter
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.highlight{
 margin-right: -20px;
}
.w{
  margin:5px 200px;
}
.info{

  margin: 25px 0px 10px 0;
}
.demo-form-inline{
      margin-left: -450px;
}
.address-item-list {
  padding: 30px 13px 0;
  .address {
    padding: 19px 14px 0 19px;
    p {
      line-height: 26px;
    }
  }
  li.checked {
    border-color: #6a8fe5;
    position: relative;
    background: #fff;
    .pa {
      right: 15px;
      top: 18px;
    }
    &:hover {
      background: #fff;
    }
  }
  li {
    position: relative;
    overflow: hidden;
    float: left;
    width: 276px;
    height: 158px;
    margin: 0 0 30px 16px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background: #fafafa;
    line-height: 14px;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
    color: #626262;
    cursor: pointer;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
    &:hover {
      background: #f2f2f2;
      .operation-section {
        visibility: visible;
        transform: translate(0, 0);
      }
    }
    &.add-address-item {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      p {
        margin-top: 5px;
      }
    }
    .operation-section {
      visibility: hidden;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 28px;
      background: #e1e1e1;
      border-top: 1px solid #e1e1e1;
      transition: all 0.2s ease;
      transform: translate(0, 29px);
      border-top: 1px solid #e1e1e1;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 11;
      span {
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 100%;
        &:hover {
          background: #f2f2f2;
        }
      }

      span + span {
        border-left: 1px solid #e1e1e1;
      }
    }
  }
}

.s-content {
  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
      > input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
          -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
        line-height: 46px;
      }
    }
  }

  .btn {
    margin: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 48px;
  }
}

.ui-cart {
  img {
    width: 80px;
    height: 80px;
  }

  .cart-table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 30px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, 0.08);
    .name {
      float: left;
      text-align: left;
    }
    span {
      margin-right: 100px;
      width: 137px;
      float: right;
      text-align: center;
      color: #838383;
    }
  }
  .cart-group.divide {
    .cart-items {
      border-top: 1px dashed #eee;
      display: flex;
    }
  }
  .cart-items {
    position: relative;
    height: 140px;
    margin-left: 74px;
    .subtotal {
      padding-left: 100px;
      font-weight: 700;
    }
    .item-cols-num,
    .price, 
    .subtotal {
      margin-left:75px; 
      overflow: hidden;
      float: right;
      width: 137px;
      text-align: center;
      color: #666;
      line-height: 140px;
    }
    // .price{
    //   margin-top: -228px;
    // }
    /*数量*/
    .subtotal,
    .item-cols-num {
      padding-left:30px;   
      padding-top: 50px;
      line-height: 40px;
    }
    .select {
      width: 112px;
      height: 40px;
      padding-top: 4px;
      margin: 0 auto;
      line-height: 40px;
      .down {
        background-position: 0 -60px;
      }
      .down.down-disabled:hover {
        background-position: 0 -300px;
        cursor: not-allowed;
      }
      .num {
        position: relative;
        overflow: hidden;
        display: inline-block;
        width: 36px;
        height: 18px;
        margin: 7px 0 0;
        border: none;
        border-radius: 3px;
        line-height: 18px;
        text-align: center;
        font-size: 14px;
        transition: all 0.2s ease-out;
      }
    }
  }
  .down.down-disabled {
    background-position: 0 -300px;
    cursor: not-allowed;
  }
}

.cart-group.divide .cart-top-items:first-child .cart-items {
  border-top: none;
}

.items-choose {
  position: absolute;
  left: -74px;
  top: 0;
  width: 74px;
  height: 20px;
  padding: 60px 0 0 31px;
  font-size: 12px;
  color: #999;
}

.items-thumb {
  position: relative;
  margin-top: 30px;
  overflow: hidden;
  width: 80px;
  height: 80px;
}

.cart-items .items-thumb > a,
.ui-cart .cart-items .items-thumb > i {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 1px solid #fff;
  border-radius: 3px;
  border: 0 solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
}

.name {
  margin-right: 170px;
  width: 380px;
  margin-left: 20px;
  color: #323232;
  display: table;
  a {
    color: #333;
    font-size: 16px;
  }
}

.name-table {
      padding-top: 55px;
  display: table-cell;
  // vertical-align: middle;
  height: 70px;
}

.fix-bottom {
  padding: 22px 29px 19px 30px;
  height: 90px;
  width: 100%;
  z-index: 1;
  background-position: center;
  background: #fdfdfd;
  background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
  background: linear-gradient(#fdfdfd, #f9f9f9);
  border-top: 1px solid #e9e9e9;
  box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
  .cart-bottom-bg {
    height: 80px;
    border-top: 1px solid #d9d9d9;
    border-radius: 0 0 8px 8px;
  }
  .fix-bottom-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .shipping {
    display: flex;
    align-items: center;
  }
  em {
    display: inline-block;
    position: relative;
    top: 3px;
    margin-top: -4px;
    font-size: 24px;
    color: #d44d44;
    font-weight: 700;
  }
}
 
.attribute,
.name p {
  color: #999;
  font-size: 12px;
  padding-top: 4px;
  line-height: 17px;
}
</style>