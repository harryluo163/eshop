<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import store from './store'
export default {
  name: 'app',
  components: {
  },
  //无刷新加载数据
//   provide :function() {
//     return {
//       reload:this.reload
//     }
// },
  data(){
    return{
      resdata:''
    }

  },
  methods:{
    test: function () {
       this.resdata = store.getters.name
    }
  },
  mounted() {
    this.test();
  },
}
</script>

<style>
  @import "./assets/css/main.css";
  @import "./assets/css/color-dark.css";/* 深色主题 */
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif, "microsoft yahei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    background-color: #f8f8f8;
    min-width: 1024px;
    overflow: inherit;
  }
</style>
