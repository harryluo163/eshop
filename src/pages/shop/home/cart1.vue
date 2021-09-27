<template>
  <el-main>
    <div class="top1">
      <ul class="top-right">
        <!--登陆状态信息显示start-->
        <!-- <li class="site">
          <a href="#">您好，请登录</a>
          <a href="#" rel="nofollow">注册</a>
        </li>

        <li class="site">|</li>
        <li class="site">
          <a href="#" target="_blank" rel="nofollow">订单查询</a>
        </li>
        <li class="site">|</li>

        <li class="site">
          <span class="cart0"></span>
          <a href="http://localhost:8080/cart" class="cart">购物车</a>
        </li>

        <li class="site site0">|</li>
        <li class="site site2">
          <a href="#" target="_blank" class="cart">用户订单</a>
        </li>-->
      </ul>
    </div>
    <div class="store-content page-cart">
      <div class="gray-box">
        <div class="timu">
          <a href="http://localhost:8080/" style="color:red">hua.com鲜花铺</a>
        </div>
        <!--        header部分，包括搜索框-->
        <el-form :inline="true" class="form-inline" @submit.native.prevent>
          <div class="sousuo">
            <el-form-item class="sousuo">
              <el-input v-model="keywords" placeholder="关键字搜索" style="width:100%,margin-top: 60px"></el-input>
            </el-form-item>
            <el-form-item style="float:left">
              <el-button type="primary" @click="handlesearch" icon="el-icon-search">查询</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:80%,padding-left: 100px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="img" label="商品图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.image" min-width="70" height="70" />
            </template>
          </el-table-column>
          <el-table-column prop="info" label="商品信息" width="180"></el-table-column>
          <el-table-column prop="price" label="单价" width="180"></el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                v-model="scope.row.num"
                controls-position="right"
                :min="1"
                :max="100"
                @change="changeNum(scope.row.id,$event)"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="sum" label="小计"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleDel(scope.row)"
                type="text"
                size="small"
                icon="el-icon-delete"
                style="color:red"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="delSelection(rows)" style="float:left">删除选中商品</el-button>
        </div>
        <!-- <div class="cart-bottom-bg fix-bottom">
            <div class="fix-bottom-inner">
              <div class="cart-bar-operation">
                <div>
                  <div class="choose-all">
                    <span :class="{'checkbox-on':checkAllFlag}" class="blue-checkbox-new" @click="editCheckAll"></span>
                    <span @click="editCheckAll">全选</span>
                  </div>
                  <div class="delete-choose-goods">删除选中的商品
                  </div>
                </div>
              </div>
              <div class="shipping">
                <div class="shipping-box">
                  <div class="shipping-total shipping-num"><h4
                    class="highlight">已选择 <i v-text="checkNum"></i> 件商品</h4>
                    <h5>共计 <i v-text="totalNum"></i> 件商品</h5></div>
                  <div class="shipping-total shipping-price"><h4
                    class="highlight">应付总额：<span>￥</span><i v-text="checkPrice"></i>
                  </h4>
                    <h5 class="shipping-tips ng-scope">应付总额不含运费</h5>
                  </div>
                </div>
                <y-button :classStyle="checkNum > 0 && submit?'main-btn':'disabled-btn'"
                          class="big-main-btn"
                          style="margin: 0;width: 130px;height: 50px;line-height: 50px;font-size: 16px"
                          :text="checkoutNow" @btnClick="checkout"></y-button>
              </div>
            </div>
        </div>-->
      </div>
    </div>
  </el-main>
</template>

<script>
import { getcarts, delcartrByID } from "../../../server/shop";
//import store from "../../../store"

export default {
  data() {
    return {
      num: 1,
      tableData: [
        {
          info: "ww"
        }
      ],
      tableDatatmp: [],
      keywords: "",
      multipleSelection: []
    };
  },

  methods: {
    //获取购物车
    getList(param = {}) {
      // 发送请求
      getcarts(param).then(response => {
        // 将获取到的数据赋值给当前组件，用于展示
        this.tableData = response;
        this.tableDatatmp = response;
        this.tableDatatmp.map((v, i) => {
          v.id = i;
          // v.num=0   刚开始这样赋值，不可行
          this.$set(v, "num", 0); //必须要这样赋值
          v.sum = v.num * v.price;
        });
        // this.testTable = response;
      });
    },

    //搜索按钮
    handlesearch(keywords) {
      return this.tableDatatmp.filter(item => {
        if (item.info.includes(keywords)) {
          return item;
        }
      });
    },

    //删除购物车商品
    handleDel(row) {
      delcartrByID({
        usrename: this.$store.state.name,
        productid: row.productid
      }).then(response => {
        if (response) {
          this.$message({
            message: "商品删除成功",
            type: "success"
          }),
            // 删除后刷新数据
            this.getList();
        }
      });
    },

    //批量删除购物车商品
    delSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          delcartrByID({
            usrename: this.$store.state.name,
            productid: row.productid
          }).then(response => {
            if (response) {
              this.$message({
                message: "商品删除成功",
                type: "success"
              }),
                // 删除后刷新数据
                this.getList();
            }
          });
        });
      } else {
        //...无选中商品操作
      }
    },

    //选中某行商品
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //计数器
    changeNum(id, val) {
      this.tableDatatmp.map(v => {
        if (id === v.id) {
          v.sum = v.price * val;
        }
      });
    }

    //end
  },

  watch: {
    keywords(newKeywords) {
      this.tableData = this.handlesearch(newKeywords);
    }
  },

  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.timu {
  height: 80px;
  width: 400px;
  float: left;
  font-family: FZShuTi;
  font-weight: 500;
  font-size: 36px;
  color: #ff4d51;
  text-align: center;
  line-height: 80px;
  margin-top: -60px;
  margin-left: 100px;
}

.sousuo {
  width: 35%;
  float: left;
  /* margin-left: 30px; */
}

.store-content {
  clear: both;
  width: 1220px;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
}
.gray-box {
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
.title {
  padding-left: 30px;
  position: relative;
  z-index: 10;
  height: 60px;
  padding: 0 10px 0 24px;
  border-bottom: 1px solid #d4d4d4;
  border-radius: 8px 8px 0 0;
  box-shadow: rgba(0, 0, 0, 0.06) 0 1px 7px;
  background: #f3f3f3;
  background: -webkit-linear-gradient(#fbfbfb, #ececec);
  background: linear-gradient(#fbfbfb, #ececec);
  line-height: 60px;
  font-size: 18px;
  color: #333;
}

.ui-cart {
  padding-bottom: 91px;
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
}
.name {
  float: left;
  text-align: left;
}
span {
  width: 137px;
  float: right;
  text-align: center;
  color: #838383;
}

/* .cart-group.divide {} */

.cart-items {
  border-top: 1px dashed #eee;
}

.cart-items {
  position: relative;
  height: 140px;
  margin-left: 74px;
}
/*删除*/
.operation {
  padding: 58px 0 0;
  font-size: 12px;
  line-height: 24px;
}
/* .items-delete-btn {
            background-image: url(../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg);
          } */
/* &:hover {
              background-position: 0 -36px;
            }
           */
.items-delete-btn {
  display: block;
  width: 24px;
  height: 24px;
  margin: 0 auto;
  color: #c2c2c2;
  /* background: url(../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg); */
  -webkit-background-size: 100% auto;
  background-size: 100% auto;
  -moz-transition: none;
  -webkit-transition: none;
  -o-transition: none;
  transition: none;
}

.subtotal {
  font-weight: 700;
}
.item-cols-num,
.operation,
.price1,
.subtotal {
  overflow: hidden;
  float: right;
  width: 137px;
  text-align: center;
  color: #666;
  line-height: 140px;
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
img {
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
  width: 380px;
  margin-left: 20px;
  color: #323232;
  display: table;
}
a {
  color: #333;
  font-size: 16px;
}

.name-table {
  display: table-cell;
  vertical-align: middle;
  height: 140px;
}
.attribute,
.name p {
  color: #999;
  font-size: 12px;
  padding-top: 4px;
  line-height: 17px;
}

.page-cart {
  padding-top: 40px;
}
.fix-bottom {
  height: 90px;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 1;
  background-position: center;
  background: #fdfdfd;
  background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
  background: linear-gradient(#fdfdfd, #f9f9f9);
  border-top: 1px solid #e9e9e9;
  box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
}
.cart-bottom-bg {
  height: 80px;
  /*background: url(../img/store/library/cart-wrapper-bg_4c8003c76e.jpg) repeat-x;*/
  border-top: 1px solid #d9d9d9;
  border-radius: 0 0 8px 8px;
}

.cart-bar-operation {
  float: left;
  padding: 0px 0px;
  font-size: 12px;
}
.blue-checkbox-new {
  float: left;
  margin-right: 9px;
}
.choose-all,
.delete-choose-goods,
.selected-count {
  float: left;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  position: relative;
}
.blue-checkbox-new,
.blue-checkbox-new.checkbox-disable,
.blue-checkbox-new.checkbox-on {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  /* background: url(../../../static/images/checkbox-new_631a56a4f6.png) no-repeat 0 -20px; */
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
}

/* .blue-checkbox-new.checkbox-on, .choose-checkbox-on .blue-checkbox-new {
      background: url(../../../static/images/checkbox-new_631a56a4f6.png) no-repeat 0 0;
    } */
.delete-choose-goods {
  position: relative;
  margin-left: 21px;
  color: #bbb;
}
.shipping {
  float: right;
  padding: 20px 30px;
}
.shipping-box {
  display: inline-block;
  padding-top: 1px;
  margin-right: 10px;
}
.shipping-total {
  display: inline-block;
  border-left: 1px solid #e1e1e1;
  padding: 0 20px;
}
.shipping-price {
  width: 155px;
  padding-right: 0;
}
.shipping-num i {
  width: 28px;
  display: inline-block;
  text-align: center;
}
h4 {
  color: #323232;
  /* > i {
          font-size: 18px;
          font-weight: 700;
        } */
  /* i, span {
          color: #d44d44;
        } */
}
h5 {
  color: #959595;
  /* > i {
          font-size: 16px;
          font-weight: 700;
        }  */
}

.shipping-total.shipping-num {
  text-align: right;
}
.shipping-total:first-child {
  border: none;
}
.big-main-btn {
  float: right;
  height: 48px;
}

.cart-e {
  margin: 0 auto;
  /* background: url("/static/images/cart-empty_@2x.png") no-repeat; */
  width: 275px;
  height: 300px;
  color: #8d8d8d;
}
</style>