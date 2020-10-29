<template>
  <div>
    <vuestic-widget  class="no-v-padding sampleNavCss">  
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>    
      <div  class="row justify-content-center" style="text-align: center;margin-left: 0px;margin-right: 0px;width: 100%;padding: 10px;"> 
        <h2 class="col-md-6" style="margin-bottom: 0rem;">購物車清單</h2>
      </div>  
      
      <div  class="row justify-content-center" v-for="(item, i) in cartInfo"  :key="i" style="margin-left: 0px;margin-right: 0px;margin-top: 15px;width: 100%">
        <div class="col-md-3 " style="padding-left: 10px;padding-right: 10px;display: flex;align-items: center;">
          <i class="fa fa-trash-alt" style="font-size: 20px;margin-left: 10px;" @click="delItem(i)"></i>
          <img class="smallImg" :src="item.productItem.headerImg[0]" style="margin-left: 15px;"> 
          <span style="color: #333;font-size: medium;margin-left: 10px;">{{item.productItem.title}}</span>
        </div>
        <div class="col-md-2" style="padding-left: 10px;padding-right: 10px;display: flex;align-items: center;justify-content: flex-end;"> 
          <span style="color: #333;font-size: medium;margin-left: 5px;">單價 NT${{item.productItem.realPrice}}</span>  
        </div>           
        <div class="col-md-3" style="padding-left: 51px;padding-right: 10px;display: flex;align-items: center;justify-content: flex-start;"> 
          
          <button v-on:click="productCountCounter(productCount, 'sub')" class="icon-add" style="outline: none;border-style: solid;border-color: rgba(0, 0, 0, 0.125);border-width: 1px;"><i class="fa fa-minus" style="font-size: 16px;"></i></button>
          <span style="color: #333;font-size: medium;border-style: solid;border-color: rgba(0, 0, 0, 0.125);border-width: 1px;width: 30px;text-align: center;">{{item.count}}</span> 
          <button v-on:click="productCountCounter(productCount, 'add')" class="icon-add" style="outline: none;border-style: solid;border-color: rgba(0, 0, 0, 0.125);border-width: 1px;"><i class="fa fa-plus" style="font-size: 16px;"></i></button>    
        </div>          
      </div>    
      <div  class="row justify-content-center" style="margin-top: 20px;margin-left: 0px;margin-right: 0px;width: 100%;">
        <span style="color: #c0392b;font-size: large;margin-left: 10px;">小計 NT${{price}}</span>  
      </div>
      
      <div  class="row justify-content-center" style="margin-left: 0px;margin-right: 0px;width: 100%;padding: 10px;">    
        <div class="col-md-4" style="padding-right: 0px;padding-left: 0px;margin-top: 20px;">  
          <!--<h2 style="margin-bottom: 0rem;text-align: center;">總計</h2>-->
          <div class="card" style="">
            <span class="card-header" style="font-family:微軟正黑體;background:#fff;">配送資訊</span>
            <div class="card-body" style="height: 270px;">     
              <label class="label">配送方式:</label>       
              <select class="col-md-12" style="outline: none;margin: 10px;" @change="changeSort(sort)" v-model="sort">
                <option >7-11貨到付款60元</option>
                <option>全家貨到付款60元</option>
              </select>   
              <label class="label">縣市:</label>       
              <select class="col-md-12" style="outline: none;margin: 10px;" @change="changeSort(sort)" v-model="sort">
                <option >7-11貨到付款60元</option>
                <option>全家貨到付款60元</option>
              </select>   
              <label class="label">店家:</label>       
              <select class="col-md-12" style="outline: none;margin: 10px;" @change="changeSort(sort)" v-model="sort">
                <option >7-11貨到付款60元</option>
                <option>全家貨到付款60元</option>
              </select>                             
            </div>
          </div>  
        </div>       
        <div class="col-md-4" style="margin-left: 5px;margin-top: 20px;padding-right: 0px;padding-left: 0px;">
          <div class="card" style="">
            <span class="card-header" style="font-family:微軟正黑體;background:#fff;">訂單資訊</span>
            <div class="card-body" style="height: 270px;">     
              <div class="col-md-12" style="margin-top: 30px;padding-right: 0px;padding-left: 0px;">
                <fieldset>
                  <div
                    class="form-group with-icon-right"
                  >
                    <div class="input-group">
                      <input name="nameInput" v-model="nameInput" v-validate="'required'" />
                      <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                      <i class="fa fa-check valid-icon icon-right input-icon"></i>
                      <label
                        class="control-label"
                        for="nameInput"
                        style="font-size: 1 rem;"
                      >收件人大名</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>      
              <div class="col-md-12" style="margin-top: 0px;padding-right: 0px;padding-left: 0px;">
                <fieldset>
                  <div
                    class="form-group with-icon-right"
                  >
                    <div class="input-group">
                      <input name="nameInput" v-model="nameInput" v-validate="'required'" />
                      <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                      <i class="fa fa-check valid-icon icon-right input-icon"></i>
                      <label
                        class="control-label"
                        for="nameInput"
                        style="font-size: 1 rem;"
                      >收件人電話</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div> 
              <div class="col-md-12" style="margin-top: 0px;padding-right: 0px;padding-left: 0px;">
                <fieldset>
                  <div
                    class="form-group with-icon-right"
                  >
                    <div class="input-group">
                      <input name="nameInput" v-model="nameInput" v-validate="'required'" />
                      <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                      <i class="fa fa-check valid-icon icon-right input-icon"></i>
                      <label
                        class="control-label"
                        for="nameInput"
                        style="font-size: 1 rem;"
                      >Email</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>                                                     
            </div>
          </div>                                   
        </div>
                             
      </div>  
      <div class="row justify-content-center" style="margin-left: 0px;margin-right: 0px;width: 100%;padding: 10px;">    
        <span class="" style="font-family:微軟正黑體;color: rgb(192, 57, 43);">小計{{price}}元 + 運費60元 = NT${{allPay}}元</span>         
      </div>          
      <div class="row justify-content-center" style="margin-left: 0px;margin-right: 0px;width: 100%;padding: 10px;">    
        <a class="checkout-button" @click="checkout()">
          <span>送出訂單</span>
        </a>            
      </div>                         
    </vuestic-widget>
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios'
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import JwPagination from 'jw-vue-pagination';
import Apis from '@/util/Apis'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '@/components/swiper/css/swiper.css'
Vue.component('jw-pagination', JwPagination);
Vue.use(axios)
let self = {};

export default {
  name: "Sample",
  computed:{
    swiper() {
      return this.$refs.mySwiper.$swiper
    }    
  }, 
  components: {
    loading: VueLoading,
    Swiper,
    SwiperSlide    
  },
  data() {
    return {    
      isLoading: false, 
      fullPage: false,    
      cartInfo: '', 
      price: 0,
      allPay: '',
    };
  },
  mounted() {
    self = this
    self.cartInfo = self.$route.params.cartInfo
    self.price = self.$route.params.price
    
    if (!!window.performance && window.performance.navigation.type === 2) {
        //!! 用來檢查 window.performance 是否存在
        //window.performance.navigation.type ===2 表示使用 back or forward
        debugger
        console.log('Reloading');
        //window.location.reload();//或是其他動作
    }

  },
  watch: {  
    cartInfo(data){
      self.price = 0
      for(let i = 0 ; i < data.length ; i++){
        self.price = self.price + Number(data[i].price)
      }
      self.allPay = self.price + 60
    }    
  },
  methods: {
    delItem(index) {
      this.$bus.$emit('delCartItem') 
      self.cartInfo.splice(index, 1)
      
    },                  
  }, 
  beforeDestroy() {}
};
</script>

<style lang="scss">
.sampleNavCss{
  margin-top: 10px;   
}

a:not([href]):not([tabindex]) {
    color: #000000;
    cursor: pointer;
}
.iconCss{
  color: #34495e;
}
.iconCss:hover{
  color: #34495ea6;
}
.mainContent {
  width: 100uw;
  padding-right: 0px;
  padding-left: 0px;
}
.searchBtn{
  font-size: 15px;
  border: unset;
  background-color: #FFFFFF; 
}
.page-link {
  border: unset;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;  
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;   
  color: #333 ;
  opacity: 0.7;  
}
.page-link:hover {
  background-color: #fff !important;
  color: #333 !important;
}
.listCss{
  justify-content: start; 
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 40px;   
  @media screen and (max-height: 823px) and (max-width: 483px){  
    justify-content: center; 
  }     
}
.iconCss{
  float: right;
  margin-left: 10px; 
  color: #333 !important;      
}
.numberCss{
  float: right;
  margin-left: 10px;
  opacity: 0.7;  
  color: #333 !important;    
}
.liCss{
  opacity: 0.7;  
  color: #333 !important;  
}
.liCss:hover{
  color: #333 !important;  
}
.subLiCss{
  opacity: 0.7;  
  color: #333 !important;    
}
.subLiCss:hover{
  color: #333 !important;  
}
.detailImg{
  width: 100%;
}
.titleCss{
  color: #000 !important;    
  font-size: x-large;  
}
.icon-add{
  background: #fff;
  border: #fff;
  outline: none;
}
.menu-button {
  background-color: #333;
  border: 1px solid #aaa;
  padding: 5px 8px;
  width: auto;
  height: auto;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  margin-left: 4px;
  color: #fff !important;
  font-weight: 600;
  font-size: medium;  
}
.menu-button:hover{
  color: rgb(202, 197, 197) !important;
}
.checkoutList{
  width: 70%;  
  @media screen and (max-height: 823px) and (max-width: 483px){  
    width: 100%; 
  }     
}
.smallImg{
  width: 60px;  
  @media screen and (max-height: 823px) and (max-width: 483px){  
    width: 45px; 
  }    
}
.checkout-button{
  background: #333;
  border: 1px solid #aaa;
  padding: 5px 8px;
  width: auto;
  height: auto;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 5px;
  color: #fff !important;
  font-weight: 600;
  font-size: medium;   
}
.checkout-button:hover{
  color: #fff !important;
}
.label{
  font-size: 0.66rem;
}
</style>
