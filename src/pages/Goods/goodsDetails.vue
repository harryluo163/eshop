<!--商品详情-->
<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li v-for="item in small" :key="item.i" :class="{on:big===item}" @click="big=item" style="list-style:none">
                <img :src="serverimagepath+item" :alt="product.name">
              </li>
              <!-- <li  @click="big=small">
                    <img :src="serverimagepath+(this.small||'').split(';')[0]" :alt="product.name">
              </li> -->
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <!-- <img :src="serverimagepath+(big||'').split(';')[0]" :alt="product.name"> -->
                 <img :src="serverimagepath+big" >
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{product.name}}</h4>
          <h6>
            <span>{{product.name}}</span>
            <span class="price">
              <em>¥</em><i>{{product.price}}</i></span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num :v-model="num" @change="handleChange" :limit="Number(product.stock)"></buy-num>
    
        </div>
        <div class="buy">
          <y-button text="加入购物车"
                    @btnClick="addCart(product.productid,product.price,product.name,product.pictureurl)"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px"></y-button>
          <y-button text="现在购买"
                    @btnClick="checkout(product.productid)"
                    style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <y-shelf title="产品信息">
        <div slot="content">
          <div class="img-item" v-if="product.msg">
            <div v-html="product.msg">{{ product.msg }}</div>
          </div>
          <div class="no-info" v-else>
            <img src="../../../static/images/no-data.png">
            <br>
            该商品暂无内容数据
          </div>
        </div>
      </y-shelf>
    </div>
  </div>
</template>
<script>
  import { productHome, addCart } from '../../server/shop'
  import { mapMutations, mapState } from 'vuex'
  import YShelf from '../../components/shelf'
  import BuyNum from '../../components/buynum'
  import YButton from '../../components/YButton'
  // import { getStore } from '../../../utils/storage'
  import config from '../../libs/config'
  export default {
    data () {
      return {
        serverimagepath:config.serverimagepath,
        productMsg: {},
        small: [],
        big: '',
        product: {},
        productNum: 1,
        userId: '',
        num:1
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart']),
       login() {
        return this.$store.state.login
      },
      userid() {
        return this.$store.state.userInfo.userid
      }
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      _productDet (productid) {
        productHome({productid}).then(res => {
          console.log(productid)
          console.log(res)
          let data = res.data
          this.product = JSON.parse(data)[0]
          this.productMsg = res.msg || ''
          //samll存放图片地址字符串
          this.small = JSON.parse(data)[0].pictureurl.split(";")
          //big将图片放大显示
          this.big = this.small[0]
        })
      },
      addCart (id, price, name, pictureurl) {
        if(this.login){
        if (!this.showMoveImg) {     // 动画是否在运动
          if (this.login) { // 登录了 直接存在用户名下
            addCart({userid: this.userid, productid: id, count: this.productNum}).then(res => {
              if(res)console.log('')
              // 并不重新请求数据
              this.ADD_CART({
              productid: id,
               price: price,
               name: name,
              pictureurl: pictureurl,
              count: this.productNum
              })
            })
          } 
          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: this.big})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
        }else{
          this.$router.push('/login')
        }
      },
      checkout (productid) {
        //  console.log(productid)\
        if(this.login){
        console.log(this.productNum)
        this.$router.push({path: '/checkout', query: {productid, num: this.productNum}})
        }else{
          this.$router.push('/login')
        }
      },

       handleChange({value}) {
        this.productNum = value
        // console.log( this.productNum)
      }
    },
    components: {
      YShelf, BuyNum, YButton
    },
    created () {
      let id = this.$route.query.productid
      this._productDet(id)
      // this.userId = getStore('userId')
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }

  .gray-box {
    background-color: white;
    display: flex;
    padding: 60px;
    margin: 20px 0;
    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
          }
          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }
    // 右边
    .banner {
      width: 450px;
      margin-left: 50px;
      h4 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .num {
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }

  .item-info {

    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      width: 1220px;
      // padding: 1vw;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }
</style>
