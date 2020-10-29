<template>
  <div class="mainLayout" > 
    <div class="fixed-top">
      <div class="row justify-content-end menuDiv">
        <a class="menu-button" @click="clickCart()">
          <span class="fa fa-shopping-cart"> </span>
          <span style="margin-left: 3px">{{'menu.cart' | translate}}</span>
          <span v-show="cartCount !== 0" style="color: #c0392b;font-weight: 900;">({{cartCount}})</span>
        </a>
        <a class="menu-button">
          <span class="fa fa-comment"> </span>
          <span style="margin-left: 3px">{{'menu.message' | translate}}</span>
        </a>    
        <a class="menu-button">
          <span class="fa fa-globe-americas"></span>
          <select style="border-style: none;outline: none;background: #fff;margin-left: 3px;" @change="setLanguage(languageType)" v-model="languageType">
            <option >{{'language.chineseC' | translate}}</option>
            <option>{{'language.chineseT' | translate}}</option>
            <option>{{'language.english' | translate}}</option>
          </select>
        </a>       
      </div>         
    </div>
    <div class="row justify-content-center" style="padding-top: 50px;">
      <img class="logoImg" src="/static/img/logo.png">   
    </div>       
    <div class="row justify-content-center headerDiv" style="">
      <a class="headerCss" @click="chooseMenu('home')" ><span>{{'header.home' | translate}}</span> </a>  
      <a class="headerCss" @click="chooseMenu('productList')" ><span>Products</span></a>  
      <a class="headerCss" @click="chooseMenu('productList')" ><span>Q&A </span></a> 
      <a class="headerCss" @click="chooseMenu('productList')" ><span>{{'header.knowledge' | translate}}</span></a> 
    </div>     
    <hr size="8px" align="center" width="100%" style="padding-top: 10px;">  
    <div class="mainContent">
      <router-view></router-view>      
    </div>            
    <div class="row justify-content-center" >
      <footer class="footerCss">
      </footer>
    </div>
    <vuestic-modal
      v-bind:force="true"
      v-bind:large="true"
      ref="ModalCheckout"
      @cancel="cancelModal()"
    >
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
      <div slot="title">{{modalTitle}}</div>
      <div v-if="cartInfo.length > 0" > 
        <div  class="row justify-content-center" v-for="(item, i) in cartInfo"  :key="i" style="margin-left: 0px;margin-right: 0px;margin-top: 15px;width: 100%">
          <div class="col-md-6" style="padding-left: 0px;padding-right: 0px;display: flex;align-items: center;">
            <i class="fa fa-trash-alt" style="font-size: 20px;margin-left: 10px;" @click="delItem(i)"></i>
            <img class="smallImg" :src="item.productItem.headerImg[0]" style="margin-left: 10px;">
            <span style="color: #333;font-size: medium;margin-left: 10px;">{{item.productItem.title}}</span>
            <!--<div class="col-md-3">
              <button v-on:click="productCountCounter(item.count, 'sub', item.productItem.title)" class="icon-add" style="outline: none;"><i class="fa fa-minus" style="font-size: 16px;margin-left: 10px;"></i></button>
              <input readonly="readonly" ref="productCount" name="productCount" v-model="item.count" v-validate="'required|min_value:10'" maxlength="5" required style="width: 10%;outline: none;">
              <button v-on:click="productCountCounter(item.count, 'add', item.productItem.title)" class="icon-add" style="outline: none;"><i class="fa fa-plus" style="font-size: 16px;"></i></button>  
            </div>-->
          </div>
          <div class="col-md-6" style="padding-left: 0px;padding-right: 0px;display: flex;align-items: center;justify-content: center;"> 
            <span style="color: #333;font-size: medium;margin-left: 10px;">{{item.count}} * </span>
            <span style="color: #333;font-size: medium;margin-left: 5px;">NT${{item.productItem.realPrice}}</span> 
          </div>
          <hr size="8px" align="center" width="100%" style="padding-top: 10px;">          
        </div> 
        <span style="color: #c0392b;font-size: large;margin-left: 10px;">小計 NT${{price}}</span>                                                                
      </div> 
      <div v-else style="text-align: center;"> 
        <span style="color: #c0392b;font-size: large;margin-left: 10px;">尚未購入任何商品</span>                                                                
      </div>          
      <div slot="footer" style="margin: 20px;">
        <a v-show="cartInfo.length > 0" class="checkout-button" @click="checkout()">
          <span>前往結帳</span>
        </a>  
        <a class="checkout-button" @click="cancelModal()">
          <span>繼續購物</span>
        </a>             
      </div>
    </vuestic-modal>     
  </div>
</template>

<script>
import Vue from "vue";
import RMMGlobal from '@/util/RMMGlobal'
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Apis from '@/util/Apis'


let self = {};
export default {
  name: "v-main",
  components: {
    loading: VueLoading,    
  },
  data() {
    return {
      languageType: '繁體中文',
      cartCount: 0,
      cartInfo: [],
      modalType: '',
      modalTitle: '',
      price: 0,
      isLoading: false,
      fullPage: false,
    };
  },
  created () {
    if (document.documentElement.style.getPropertyValue('--baseTheme').trim() !== '') {
      this.options.activeColor = document.documentElement.style.getPropertyValue('--baseTheme').trim()
    }
  },
  mounted() {
    self = this;        
    this.$bus.$on('addCart', async event => {
      let repeat = false
      for(let i = 0 ; i < self.cartInfo.length ; i++){
        if(event.productItem.title === self.cartInfo[i].productItem.title){
          repeat = true
        }          
      }
      if(self.cartInfo.length === 0 || !repeat){
        debugger
        self.cartCount = self.cartCount + 1
        let itemPrice = Number(event.productItem.realPrice) * event.count
        self.price = self.price + itemPrice        
        self.cartInfo.push({count: event.count, productItem: event.productItem, price: itemPrice}) 
        self.clickCart()        
      }else{
        Apis.MessageBox.Normal(
          self,
          '商品重複購入',
          '',
          'success',
          false,
          '繼續購物',
          ''
        ).then(

        )         
      }

    })       
    this.$bus.$on('delCartItem', async event => {
      if(self.cartCount !== 0){
        self.cartCount = self.cartCount - 1
        //self.price = self.price - (self.cartInfo[event.id].count * self.cartInfo[event.id].price)
      }
    })    
  },  
  watch: {  
    cartInfo(data){
      self.price = 0
      for(let i = 0 ; i < data.length ; i++){
        self.price = self.price + Number(data[i].price)
      }
    }    
  },  
  methods: {
    openModal () {
      self.$refs.ModalCheckout.open()
    },   
    cancelModal () {
      //self.clearInput()
      self.$refs.ModalCheckout.close()
    },      
    chooseMenu (path) {
      self.$router.push('/' + path + '/all') 
      
    },
    clickCart() {
      self.modalTitle = '購物車'
      self.modalType = 'cart'
      self.$refs.ModalCheckout.open()
    }, 
    checkout() {
      self.$router.push({
        name: 'checkout',
        params: { cartInfo:  self.cartInfo, price: self.price}
      })      
      self.cancelModal() 
    }, 
    productCountCounter (val, type, itemName) {
      let value = Number(val)
      if (type === 'add') {
        value = value += 1
      } else {
        (value <= 1) ? value = 1 : value = value -= 1
      }
      for(let i = 0 ; i < self.cartInfo.length ; i++){
        let tmpData = self.cartInfo[i]
        if(tmpData.productItem.title === itemName){
          self.cartInfo[i].count = value
          self.price = value * tmpData.productItem.realPrice
        }
      }
    },  
    delItem(index) {
      self.price = self.price - Number(self.cartInfo[index].price)
      self.cartInfo.splice(index, 1)
      if(self.cartCount !== 0){
        self.cartCount = self.cartCount - 1
 
      }      
    },     
    setLanguage (locale) {
      switch(locale) {
        case '简体中文':
          locale = 'cn'
          break
        case '繁體中文':
          locale = 'tw'  
          break       
        default:
          locale = 'gb' 
          break          
      }
      Vue.i18n.set(locale)
    },  
  },
  beforeDestroy() {}
};
</script>

<style scoped lang="scss">
.mainLayout {
  padding: 0rem;
  background-color: #ffffff
}
.mainContent {
  width: 100uw;
  padding-right: 0px;
  padding-left: 0px;
}
.logoImg{
  min-height: auto;
  max-height: 174px;
  width: 10%;  
  @media (max-width: 1024px){  
    width: 10%; 
  }
  @media (max-width: 768px){    
    width: 10%;
  }   
  @media screen and (max-height: 823px) and (max-width: 483px){  
    width: 30%; 
    max-height: 120px;
  }   
}
.headerDiv{
  padding-top: 5px;
}
.headerCss{
  color: #000 !important;
  background-color: #fff;
  padding: 5px;
  padding-right: 10px;
  opacity: 0.7;   
}
.headerCss:hover{
  color: #333 !important;
}
.menuDiv{
  padding-right: 20px;  
  padding-top: 4px;
}
.menu-button {
  background: #fff;
  border: 1px solid #aaa;
  padding: 5px 8px;
  width: auto;
  height: auto;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  margin-left: 4px;
  color: #000 !important;
  font-weight: 600;
  font-size: 12px;   
}
.menu-button:hover{
  color: #333 !important;
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
  margin-left: 4px;
  color: #fff !important;
  font-weight: 600;
  font-size: medium;   
}
.checkout-button:hover{
  color: #fff !important;
}
.footerCss {
  position: relative;
  bottom: 0;
  width: 100%;
  min-height: 250px;
  background-color: #f8f8f8;
  text-transform: capitalize;
}
.icon-add{
  background: #fff;
  border: #fff;
  outline: none;
}
.smallImg{
  width: 60px;  
  @media screen and (max-height: 823px) and (max-width: 483px){  
    width: 45px; 
  }    
}
</style>
