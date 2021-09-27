<template>

    <el-main style="padding-top: 0">

        <div class="top1">
            <ul class="top-right">
                    <!--登陆状态信息显示start-->
                    <li class="site" ><a href="http://localhost:8080/shop/login" >您好，请登录</a><a href="http://localhost:8080/shop/register" rel="nofollow">注册</a></li>
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
                <div class="tou">全部商品导购</div>
            </div>
            <div class="anniu"><input type="text" name="shuru" class="in1" placeholder="  商品关键字"/>
               <a href="#"><input type="button" value="搜索" name="sou" class="in2"/> </a>
            </div>

        </div>
        <div id="box" class="box">
            <div class="daogou">
                <ul class="lei">
                    <li class="lei1"><a href="#" @click="clickmenu(0)">爱情鲜花</a></li>
                    <li class="lei1"><a href="#" @click="clickmenu(1)">生日鲜花</a></li>
                    <li class="lei1"><a href="#" @click="clickmenu(2)">友情鲜花</a></li>
                    <li class="lei1"><a href="#" @click="clickmenu(3)">问候长辈</a></li>
                    <li class="lei1"><a href="#" @click="clickmenu(4)">探病慰问</a></li>
                </ul>
            </div>
            <ul class="lb">
                <li v-for="(item,index) in nav_imgs" :key="index"><img :src="item.imgpath"/></li>
<!--                <li><img src="../../../assets/images00/lb1.jpg" /></li>-->
<!--                <li><img src="../../../assets/images00/lb2.jpg" /></li>-->
<!--                <li><img src="../../../assets/images00/lb3.png" /></li>-->
<!--                <li><img src="../../../assets/images00/lb4.jpg" /></li>-->
            </ul>
            <ul class="list" id="list">
                <li></li>
                <li></li>
                <li></li>
                <li></li>

            </ul>
        </div>
<!--        搜索内容出现-->
        <div class="zhan">商品展现</div>
        <div class="hua">
            <ul class="hua1">
               <li class="hua11" v-for="(item,index) in products" :key="index">
                   <div class="tu">
                       <img class="picture" :src="item.imgpath" height="295" width="240"/>
                   </div>
                   <div class="money">
                       <span class="price-sign">¥ </span>
                       <span class="price-num" data-pp="9012177"> {{item.price}}</span>
                       <a href="#" class="xq">
                           <div class="details">
                           {{item.xiangqing}}
                           </div>
                           <div class="jian">{{item.tuijian}}</div>
                       </a>
                       <a class="add-cart" style="margin-left: -5px;" >
                           <span class="ico"></span>
                           加入购物车
                       </a>
                   </div>
               </li>

                <div class="clear"></div>
            </ul>
           <!-- <ul class="hua2">
                <li class="hua12"></li>
                <li class="hua12"></li>
                <li class="hua12"></li>
                <li class="hua12"></li>
            </ul>-->
        </div>
    </el-main>
</template>

<script>
    export default {


        data(){
            return {
                storage:[
                    [],
                    [],
                ],
                products:[
                    {
                        imgpath:require('../../assets/images00/aiqing1.jpg'),
                        price:539,
                        xiangqing:'鲜花/不变的承诺-99枝红玫瑰',
                        tuijian:'经典99支，鼎力推荐！'
                    },
                    {
                        imgpath:require('../../assets/images00/aiqing2.jpg'),
                        price:298,
                        xiangqing:'鲜花/忘情巴黎-33枝红玫瑰',
                        tuijian:'浪漫唯美 女生挚爱！'


                    },
                    {
                        imgpath:require('../../assets/images00/aiqing3.jpg'),
                        price:239,
                        xiangqing:'鲜花/一往情深-精品玫瑰礼盒：19枝红玫瑰',
                        tuijian:'经典爆款，年销售冠军！'
                    },
                    {
                        imgpath:require('../../assets/images00/aiqing4.jpg'),
                        price:368,
                        xiangqing:'鲜花/甜美公主-白玫瑰22枝，粉佳人粉',
                        tuijian:'甜美设计 清新典雅！'
                    },
                    {
                        imgpath:require('../../assets/images00/aiqing5.jpg'),
                        price:139,
                        xiangqing:'鲜花/一心一意-玫瑰11枝，粉色勿忘我',
                        tuijian:'经典款式 精选爆款！'
                    },
                    {
                        imgpath:require('../../assets/images00/aiqing6.jpg'),
                        price:129,
                        xiangqing:'鲜花/你的香气-戴安娜粉玫瑰9枝',
                        tuijian:'温馨搭配 舒适百搭！'
                    },
                   /* {
                        imgpath:require('../../../assets/images00/aiqing7.jpg'),
                        price:162,
                        productid:'鲜花/爱在心头-玫瑰50枝：戴安娜粉玫瑰',
                        tuijian:'双色搭配 赏心悦目！'
                    },
                    {
                        imgpath:require('../../../assets/images00/aiqing8.jpg'),
                        price:356,
                        productid:'鲜花/忘情巴黎+德芙心语巧克力98克装',
                        tuijian:'表白送礼必备'
                    },
                    {
                        imgpath:require('../../../assets/images00/aiqing9.jpg'),
                        price:165,
                        productid:'鲜花/甜蜜相伴-粉佳人玫瑰9枝，白色洋',
                        tuijian:'创意包装 高端大气！'
                    },*/
                    {
                        imgpath:require('../../assets/images00/sh1.jpg'),
                        price:165,
                        xiangqing:'香槟玫瑰9枝',
                        tuijian:'香妃'
                    },
                    {
                        imgpath:require('../../assets/images00/sr2.jpg'),
                        price:180,
                        xiangqing:'粉雪山玫瑰9枝',
                        tuijian:'爱意满杯'
                    },
                    {
                        imgpath:require('../../assets/images00/sr3.jpg'),
                        price:298,
                        xiangqing:'33枝红玫瑰',
                        tuijian:'忘情巴黎'
                    },
                    {
                        imgpath:require('../../assets/images00/sr4.jpg'),
                        price:198,
                        xiangqing:'雪山玫瑰11枝，深紫色勿忘我',
                        tuijian:'真爱如初'
                    },
                    {
                        imgpath:require('../../assets/images00/sr5.jpg'),
                        price:165,
                        xiangqing:'19枝香槟玫瑰',
                        tuijian:'阳光海岸'
                    },
                    {
                        imgpath:require('../../assets/images00/sr6.jpg'),
                        price:345,
                        xiangqing:'99枝红玫瑰',
                        tuijian:'不变的承诺'
                    },
                    {
                        imgpath:require('../../assets/images00/youqing.jpg'),
                        price:567,
                        xiangqing:'鲜花/甜美公主-白玫瑰22枝，粉佳人粉酒',
                        tuijian:'甜美设计 清新典雅'
                    },
                    {
                        imgpath:require('../../assets/images00/youqing2.jpg'),
                        price:125,
                        xiangqing:'鲜花/恋恋情怀-11枝香槟玫瑰，白色多梦',
                        tuijian:'经典款式 简约设计'
                    },
                    {
                        imgpath:require('../../assets/images00/youqing3.jpg'),
                        price:267,
                        xiangqing:'鲜花/语笑嫣然-粉佳人玫瑰9枝、粉色玫瑰',
                        tuijian:'温柔相伴 笑容常在'
                    },
                    {
                        imgpath:require('../../assets/images00/youqing4.jpg'),
                        price:234,
                        xiangqing:'鲜花/阳光海岸-19枝香槟玫瑰',
                        tuijian:'98%好评 热销推荐'
                    },
                    {
                        imgpath:require('../../assets/images00/youqing5.jpg'),
                        price:345,
                        xiangqing:'玫雪山玫瑰',
                        tuijian:'热销推荐'
                    },
                    {
                        imgpath:require('../../assets/images00/zb.jpg'),
                        price:267,
                        xiangqing:'鲜花/留住好时光-粉绣球1枝，粉雪山玫瑰',
                        tuijian:'精选昆明A级花材'
                    },
                    {
                        imgpath:require('../../assets/images00/zb2.jpg'),
                        price:378,
                        xiangqing:'鲜花/向日葵之歌-向日葵6枝',
                        tuijian:'心向暖阳 快乐相伴'
                    },
                    {
                        imgpath:require('../../assets/images00/zb3.jpg'),
                        price:156,
                        xiangqing:'鲜花/一缕青香-向日葵3枝，白色杨桔梗',
                        tuijian:'清新向日葵 夏日专属'
                    },
                    {
                        imgpath:require('../../assets/images00/ww1.jpg'),
                        price:156,
                        xiangqing:'鲜花/抱抱我/自然风抱桶花-向日葵1枝',
                        tuijian:'抱抱桶新款'
                    },
                    {
                        imgpath:require('../../assets/images00/ww2.jpg'),
                        price:156,
                        xiangqing:'鲜花/留住好时光-粉绣球1枝，粉雪山玫瑰',
                        tuijian:'精选昆明A级花材'
                    },
                    {
                        imgpath:require('../../assets/images00/ww3.jpg'),
                        price:156,
                        xiangqing:'鲜花/圆满-粉百合2枝、红红玫瑰9枝',
                        tuijian:'花篮设计 送礼百搭'
                    },
                    {
                        imgpath:require('../../assets/images00/ww4.jpg'),
                        price:156,
                        xiangqing:'鲜花/幸福满忆-多头百合2枝，卡拉枝建级化',
                        tuijian:'畅销节日花篮'
                    },


                ],

                nav_imgs:[
                    {imgpath: require('../../assets/images00/lb1.jpg')},
                    {imgpath: require('../../assets/images00/lb2.jpg')},
                    {imgpath: require('../../assets/images00/lb3.png')},
                    {imgpath: require('../../assets/images00/lb4.jpg')},

                ]
            }
        },
        methods:{
            clickmenu: function(i) {
                console.log(i);
            },
            cart(){
                this.$router.push('/cart')
            }

        },


        mounted(){
            var count =0;
            var wrap = document.querySelector('.lb');
            var liDom = document.querySelector('.list').getElementsByTagName('li');
            var times = null;



            function fun(){
                if(count == 4){
                    wrap.style.marginLeft = '0px';
                    count = 0;
                }
                for(let i = 0 ; i < liDom.length; i++){
                    liDom[i].style.background = '#ffF';

                }
                liDom[count].style.background = 'orange';
                wrap.style.marginLeft = count * (-1355) + 'px';
                count++;
            }

            times = setInterval(fun,1500);


            for(let i = 0 ; i < liDom.length ; i++){
                liDom[i].onmouseover = function()
                {
                    wrap.style.marginLeft = i * (-1355) + 'px';

                    liDom[i].style.background = 'orange';
                    liDom[count].style.background = '#ffF';
                }
                liDom[i].onmouseout = function()
                {

                    liDom[i].style.background = '#fff';
                    liDom[count].style.background = '#fff';
                }
            }

            document.getElementById("box").onmouseover=function()
            {

                clearInterval(times);
            }
            document.getElementById("box").onmouseout=function()
            {

                times=setInterval(fun,1000);
            }

        }
    }
</script>

<style scoped>

    ul,li
    {
        list-style: none;
    }

    *{
        margin: 0px;
        padding: 0px;

    }
    a {
        color: #737373;
        text-decoration: none;
        cursor: pointer;
    }
    a:hover{
        color:#e6a23c;
    }

    .top1 {

        font-size: 15px;
        width: 1355px;
        heigth:35px;
        position:relative;
        overflow: hidden;
        background-color: #8c939d;
        background: rgba(242, 242, 242, 1);


    }

    .el-main div{
        margin: 0 auto;
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
        background: url("../../assets/images00/duolei.png");
        background-position: -340px -284px;
        background-repeat: no-repeat;
    }
.cart{
     position: absolute;
 }
.sousuo{
    position:relative;
    width: auto;
    height:120px;
    width: 1355px;
    border-bottom: 3px solid #e6a23c;
}
    .timu{
        height:120px;
        width: 400px;
        float:left;
        font-family:FZShuTi;
        font-width: 500;
        font-size: 36px;
        color:#ff4d51;


    }
    .anniu{
        height:120px;
        width: 400px;
        position: relative;
        left: 460px;

    }
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
       top:50px;
       border-radius: 10px;
       border:1px solid #ff6a00;
       padding-left:8px;

    }
    .in2{
        float: left;
        width:80px;
        height: 35px;
        position: absolute;
        left:320px;
        top:50px;
        background: rgba(255, 106, 0, 1);
        border:1px solid #ff6a00;
        color: #edf2fc;
        font-size: 15px;
       }
    .box
    {
        position:relative;
        overflow: hidden;
        height:440px;
        width: 1355px;
    }
    .lb li
    {
        height:440px;
        width: 1355px;
        float: left;
    }
    .lb
    {
        width: 400%;
        height: 100%;
        z-index: 1;
        /*transition: .5s;*/
        margin-left: 0;
    }
    .list
    {
        width: 250px;
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 622px;
        text-align: center;

    }
    .list li
    {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        float: left;
        margin-left: 5px;
        cursor: pointer;
    }

    .list li:first-of-type{
        background: red;
    }
    .tou{
        z-index: 2;
        height: 40px;
        width:150px;
        position: absolute;
        left:90px;
        top:80px;
        color: #fff;
        font-family: tahoma, arial, "Hiragino Sans GB", "微软雅黑", sans-serif;
        font-size: 15px;
        font-weight: bold;
        display: block;
        color: #fff;
        background-color: #ff6a00;
        text-align: center;
        line-height:40px;

    }
    .daogou{

        height:440px;
        width:150px;
        position: absolute;
        left:90px;
        border-bottom: 3px solid #ff6a00;
        background: rgba(255, 255, 255, 1);

    }
    .lei li{
        width: 150px;
        height: 88px;
        text-align: center;
        line-height:88px;
        color: #ff6a00;
        border-bottom: 1px solid #e9e9e9;

    }
    .zhan{
        width: 1355px;
        position: relative;
        text-align: center;
        line-height: 40px;
        background: rgba(255, 192, 187, 1);
        color: #ffffff;
        font-size: 20px;
    }
    .hua{
        width: 1188px;
        height: 700px;
        position: relative;

    }
    .hua1 li{
        float: left;
        width:295px;
        height: 350px;

        overflow:hidden;

    }
   /* .hua2 li{
        float: left;
        width:295px;
        height: 350px;
        border: 1px solid #e6a23c;
    }*/
    .tu{
        width: 295px;
        height: 240px;
        overflow: hidden;


    }
    .money{
        float: left;
        width: 295px;
        height: 110px;

        top: 240px;

    }
    .price-sign {
        font-family: arial;
        position: relative;
        left:  -96px;
        top: 5px;
        display: inline-block;
        text-align: center;
        line-height: 35px;
        height: 35px;
        color: #ff6a00;
    }
     .price-num {
        font-weight: 700;
         text-align: center;
        line-height: 35px;
         position: relative;
         left: -96px;
         top: 5px;
         font-family: arial,Verdana,Arial;
         display: inline-block;
         height: 35px;
         color: #ff6a00;

    }
    .picture:hover{
        opacity: 0.8;
        transform: scale(1.2,1.2);
        cursor: pointer;
        transition: all 0.8s;
    }
    .details{
        position: relative;
        top: 5px;
        left:27px ;
        height: 15px;
        width: 295px;
        font-size: 12px;
        display: block;
        max-width: 220px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;


    }
    .jian{
        position: relative;
        top: 5px;
        left:27px;
        height: 18px;
        width: 295px;
        font-size: 14px;
        display: block;
        max-width: 220px;
        overflow: hidden;
        color: #ff6a00;
        text-align: left;

    }
    .add-cart {
         width: 295px;
         height: 25px;
         display: block;
         position: relative;
         top: 0px;
         margin-left: -1px;
         color: #000000;
         text-align: center;
        line-height: 25px;
         padding-top: 2px;

     }
    .ico{
        float: left;
        width: 16px;
        height: 16px;
        background-image: url("../../assets/images00/che.png");
        overflow: hidden;
        position: relative;
        left:88px ;
        top:5px;

    }
    .add-cart:hover .ico{
        background-position-y: -16px;
    }
    .add-cart:hover{
        color: #ff6a00;
    }
   .clear{
       clear: both;
   }
    .xq:hover{
        color: #ff6a00;
        text-decoration: underline;
    }

</style>