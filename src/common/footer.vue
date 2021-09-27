<!--
<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo">
        <ul class="c0">
          <h3 class="c1">支付方式</h3>
          <ul>
            &lt;!&ndash; <li class="c2"><router-link to="/thanks"><a class="c3">购买指南</a></router-link></li> &ndash;&gt;
            <li class="c2"><a class="c3" @click="open4">支付方式</a></li>
            <li class="c2"><a class="c3" @click="open5">送货方式</a></li>
          </ul>
        </ul>
        &lt;!&ndash; <ul class="c0">
        <ul class="c0">
          <h3 class="c1">友情链接</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="http://218.197.101.24/Login.htm">研究生管理系统</a></li>
            <li class="c2"><a class="c3" target="_blank" href="http://www.baidu.com">百度</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://cn.vuejs.org/">Vue</a></li>
          </ul>
        </ul>
      </div>
      <div class="copyright">
        <h4 class="content-c2">Copyright ©2019, 开发小组</h4>
      </div>     
     </div> &ndash;&gt;
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>
<style></style>
-->
<template>
  <footer>
    <div class="auth">
      <a href="https://ss.knet.cn/verifyseal.dll?sn=e15041744030058395oqbo000000&amp;ct=df&amp;a=1&amp;pa=0.8817607406526804" target="_blank"><img style="height: 40px;" src="//img02.hua.com/pc/assets/img/cxwz.png"></a>
      <img width="212" height="50" src="../assets/images00/footlogo.jpg"> <a href="/profile/about.htm" target="_blank"><img width="150" height="49" src="//img02.hua.com/pc/assets/img/100.jpg"></a>
      <a href="/profile/ICP.htm" target="_blank" rel="nofollow"><img width="35" height="46" alt="ICP" src="//img02.hua.com/pc/assets/img/bico1.jpg"></a>
    </div>
    <p>Copyright ©2019, 开发小组！</p>
  </footer>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
    display: block;
  }
  body {
    margin: 0;
  }
  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  a {
    background-color: transparent;
  }
  b, strong {
    font-weight: bold;
  }
  img {
    border: 0;
  }
  *::before, *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  footer {
    font-size: 12px;
    padding-bottom: 20px;
    text-align: center;
    width: 1200px;
    margin: 0 auto;
  }
  body {
    font-family: tahoma, arial, "Hiragino Sans GB", "宋体", sans-serif;
    font-size: 14px;
    line-height: 1.4285;
    color: #737373;
    background-color: #ffffff;
  }
  body {
    min-width: 1200px;
  }
  html {
    font-size: 10px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  footer .auth {
    margin: 20px 0 30px;
  }
  p {
    margin: 0 0 10px;
  }
  a {
    color: #737373;
    text-decoration: none;
  }
  footer b {
    font-weight: normal;
    color: #d9d9d9;
  }
  .ico {
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
  }
  .beian {
    width: 16px;
    height: 16px;
    background: url(//img02.hua.com/pc/pimg/beian.png) no-repeat;
    background-size: 16px;
    margin: -3px 2px 0;
  }
  img {
    vertical-align: middle;
  }
  .auth img {
    vertical-align: inherit;
  }
  footer .auth img {
    margin: 0 5px;
  }
</style>