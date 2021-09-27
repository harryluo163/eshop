<template>

  <div class="good-item">
    <div  style="">
      <div class="good-img">
        <router-link :to="'goodsDetails?productid='+msg.productid">
          <img :src="this.serverimagepath+(msg.pictureurl||'').split(';')[0]" :alt="msg.name">
        </router-link>
      </div>
      <h6 class="good-title" v-html="msg.name">{{msg.name}}</h6>
      <!-- <h3 class="sub-title ellipsis">{{msg.sub_title}}</h3> -->
      <h3 class="sub-title ellipsis"></h3>
      <div class="good-price pr">
        <div class="ds pa">
          <router-link :to="'goodsDetails?productid='+msg.productid">
            <y-button text="查看详情" style="margin: 0 5px"></y-button>
          </router-link>
          <y-button text="加入购物车"
                    style="margin: 0 5px"
                    @btnClick="addCart(msg.productid,msg.price,msg.name,(msg.pictureurl||'').split(';')[0])"
                    classStyle="main-btn"
          ></y-button>
        </div>
        <p><span style="font-size: 16px">￥</span>
          {{msg.price}}</p>
      </div>
    </div>
  </div>

</template>
<script>
  import YButton from '../components/YButton'
  import { addCart } from '../server/shop'
  import { mapMutations, mapState } from 'vuex'
  // import { getStore } from '../../utils/storage'
  
  import config from "../libs/config"
  export default {
    props: {
      msg: {}
    },
    data () {
      return {
        serverimagepath:config.serverimagepath,
      }
    },
    computed: {
      ...mapState([ 'showMoveImg', 'showCart']),
      login() {
        return this.$store.state.login
      },
      userid() {
        return this.$store.state.userInfo.userid
      },
       cartList() {
        return this.$store.state.cartList
      }
    },
    mounted () {
    },
    components: {
      YButton
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART','GET_USERINFO']),
      goodsDetails (id) {
        this.$router.push({path: 'goodsDetails/productid=' + id})
      },
      addCart (id, price, name, img) {
        if (!this.showMoveImg) {     // 动画是否在运动
          if (this.login) { // 登录了 直接存在用户名下
            img=this.serverimagepath+img
            addCart({userid: this.userid, productid: id,count:1}).then(res => {
              if(res)console.log(res)  
              this.ADD_CART({productid: id, price: price, name: name, pictureurl: img})
              // console.log(this.cartList)
            })
          } else { // 未登录 vuex
            // this.ADD_CART({productId: id, salePrice: price, productName: name, productImg: img})
            this.$router.push("/login")
          }
          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
      }
    },
    
    
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";

// .goods-box w{
//   margin: 10px 100px 10px 100px;
// }
  .good-item {
    // border: 1px solid #efefef;
    background: #fff;
    width: 24%;
    transition: all .5s;
    height: 384px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .good-price p {
        display: none;
      }
      .ds {
        display: flex;
      }
    }
    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }

    .good-img {
      img {
        margin: 50px auto 10px;
        @include wh(206px);
        display: block;
        
      }
    }
    .good-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #e4393c;
      font-size: 20px;
    }
    .good-title {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }
    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 10px;
    }

  }
</style>
