<template>
  <div id="app" class="appCss">
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'App',
  components: {
    loading: VueLoading,
  }, 
  data() {
    return {
      isLoading: false,
      fullPage: true,
    };
  },   
}
</script>

<style lang="scss">
@import "sass/main";
.appCss{
    padding-left: 0%;
    padding-right: 0%;
    background-color: #ffffff;
    -webkit-appearance: none;  /* Safari 和 Chrome，常用於iOS下移除內建樣式 */
    -moz-appearance: none;     /* FireFox */
    appearance: none;    
    @media (max-width:1024px){
      padding-left: 0%;
      padding-right: 0%;
      padding-top: 0%;    
    }    
}
:root{
  background-color: #fff;
}
</style>
