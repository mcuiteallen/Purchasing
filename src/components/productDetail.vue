<template>
  <div>
    <vuestic-widget  class="no-v-padding sampleNavCss">  
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>    
      <div class="row justify-content-center" style="margin-left: 0px;margin-right: 0px;">
        <div class="col-md-2 mainContent" >
          <div class="card text-start m-3" style="border: unset;">
            <div class="card-body" style="padding: 0rem">               
              <div class="row justify-content-start" style="margin-top: 20px;margin-left: 0px;margin-right: 0px;">
                  <a class="liCss" @click="chooseMenu('productList')" ><span>CATEGORIES </span></a> 
              </div>
              <ul style="margin-top: 20px;">
                <li>
                  <a class="liCss" @click="chooseMenu('productList')" >精選商品<span class="numberCss">37</span></a>  
                </li>
                <li v-for="(item, i) in pdList"  :key="i" >
                  <a class="liCss" >{{item}}<span class="iconCss" @click="showSubListDetail(item)"><i class="fa fa-angle-right" style="font-size: 16px;"></i></span></a>  
                  <ul v-show="showSubList === item">
                    <li style="list-style: none;">
                      <a class="liCss" href="#"  >主機<span class="numberCss">2</span></a>                  
                    </li>     
                    <li style="list-style: none;">
                      <a class="liCss" href="#"  >煙彈<span class="numberCss">12</span></a>                  
                    </li>                      
                  </ul>               
                </li>                                                                                                                         
              </ul>              
            </div> 
          </div>                           
        </div>                     
        <div class="col-md-6 mainContent">
          <div class="card text-start m-3" style="border: unset;">
            <div class="card-body" style="padding: 0rem">       
              <div class="row justify-content-start" style="">
                <a class="liCss col-md-4" @click="chooseMenu('productList')" ><span style="margin: 10px;">全部商品 / RELX </span></a>                                      
              </div>                
              <div class="row listCss">
                <div class="row justify-content-center" style="width: 100%;margin-left: 0px;margin-right: 0px;">
                  <div class="col-md-6">
                    <div class="row " style="margin-left: 0px;margin-right: 0px;">                
                      <swiper ref="mySwiper" :options="swiperOption">
                        <swiper-slide  v-for="item in productDetail.headerImg" :key="item.id" style="margin-top: 0%">
                          <img style="width: 100%;padding: 0px 40px 40px;" :src="item">
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination" style=""></div>
                      </swiper>  
                    </div>                                                                
                  </div>                  
                  <div class="col-md-6">
                    <div class="row " style="margin-left: 0px;margin-right: 0px;">
                      <a class="titleCss"><span>{{productDetail.title}}</span></a>
                    </div>                   
                    <div class="row" style="margin-top: 20px;margin-left: 0px;margin-right: 0px;">
                      <a><span style="color: #333;"><s>NT${{productDetail.orgPrice}}</s></span></a>
                    </div> 
                    <div class="row" style="margin-left: 0px;margin-right: 0px;">
                      <a><span style="color: #c0392b;">NT${{productDetail.realPrice}}</span></a>
                    </div>     
                    <div v-for="(item, i) in productDetail.kind"  :key="i"  class="row" style="margin-top: 40px;margin-left: 0px;margin-right: 0px;">
                      <div class="row" style="width: 100%;margin-left: 0px;margin-right: 0px;">
                        <a><span style="color: #333;font-size: 10px">{{item.name}}</span></a>
                      </div>                        
                      <div class="row" style="width: 100%;margin-left: 0px;margin-right: 0px;">
                        <select  style="width: 55%;outline: none;margin: 10px;" @change="changeShowCount(showCount)" v-model="productDetail.kind[i].info[0]">
                          <option v-for="(item2, j) in productDetail.kind[i].info"  :key="j">{{item2}}</option>
                        </select>                         
                      </div> 
                    </div>                                          
                    <div class="row" style="margin-top: 10px;margin-left: 0px;margin-right: 0px;">
                      <a><span style="color: #333;font-size: 10px">數量</span></a>
                    </div>                      
                    <div class="row" style="margin-left: 0px;margin-right: 0px;">
                      <button v-on:click="productCountCounter(productCount, 'sub')" class="icon-add" style="outline: none;"><i class="fa fa-minus" style="font-size: 16px;"></i></button>
                      <input readonly="readonly" ref="productCount" name="productCount" v-model="productCount" v-validate="'required|min_value:10'" maxlength="5" required style="width: 50%;outline: none;">
                      <button v-on:click="productCountCounter(productCount, 'add')" class="icon-add" style="outline: none;"><i class="fa fa-plus" style="font-size: 16px;"></i></button>
                    </div>   
                    <div class="row" style="margin-top: 20px;margin-left: 0px;margin-right: 0px;">
                      <a class="menu-button" @click="addCart()">
                        <span>加入購物車</span>
                      </a>       
                    </div>                                                                
                  </div>                                                 
                </div>  
                <hr size="8px" align="center" width="100%" style="padding-top: 10px;"> 
                <div class="row justify-content-center" style="width: 100%;margin-left: 0px;margin-right: 0px;">
                  <a><span style="color: #333;font-size: medium;font-weight: 900;">{{productDetail.content}}</span></a>
                </div>     
                <div class="row justify-content-center" style="width: 100%;margin-top: 10px;margin-left: 0px;margin-right: 0px;">
                  <a><span style="color: #333;font-size: medium;font-weight: 900;">{{productDetail.commonUse}}</span></a>
                </div>   
                <div class="row justify-content-center" style="width: 100%;margin-top: 10px;margin-left: 0px;margin-right: 0px;">
                  <a><span style="color: #333;font-size: medium;font-weight: 900;">【唯一通過】SGS、歐盟、ROHS、MSDS檢測</span></a>
                </div>  
                <div class="row justify-content-center" style="width: 100%;margin-top: 10px;margin-left: 0px;margin-right: 0px;">
                  <a style="color: rgb(242, 10, 10);font-size: medium;font-weight: 900;"><span style="color: #333;">本店皆為官方授權之</span>正品</a>
                </div>                                  
                <div class="row justify-content-center" style="width: 100%;margin-top: 10px;margin-left: 0px;margin-right: 0px;">
                  <a><span style="color: rgb(242, 10, 10);font-weight: 900;font-size: 1.2rem;">{{productDetail.warranty}}</span></a>
                </div>                                                
                <div style="width: 100%;margin-top: 20px;">
                  <div  v-for="(item, i) in productDetail.detailImg"  :key="i" class="" style="">
                    <div style="margin-top: 10px;margin-right: 0px;">
                      <img :src="item" style="width: 100%">
                    </div>              
                  </div>         
                </div>                
              </div>                                                                                   
            </div>
          </div>              
        </div>
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
      productCount: 1,
      pageOfItems: [],
      customLabels: {
        first: ' ',
        last: ' ',
        previous: ' ',
        next: ' '
      },
      productList: [],
      showCount: '每頁顯示數量',
      sort: '商品排序',
      showSubList: '',
      pdList: ['RELX', 'SP2S', 'LANA', 'WDG', 'VELLK', '888'],
      searchInput: '',
      productDetail: '',
      unit: 'NT$',
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true,
        },

        autoHeight: true,
        slidesPerview: 1,
        autoplay: {
          deplay: 10000,
          disableOnInteraction: false
        },
        spaceBetween: 0,
        loop: true,
      },         
    };
  },
  mounted() {
    self = this
    self.productList = [
        {
          "title": "【Relx】檸檬紅茶3入組",
          "orgPrice": "580",
          "realPrice": "365",
          "type": "菸彈",
          "Brand": "RELX",
          "content": "內容: 主機*1 西瓜冰沙 x1 檸檬可樂 x1",
          "commonUse": "此款與RELX菸彈、主機皆通用",
          "warranty": "此產品享有半年保固",
          "text": "20200707 賀成交",
          "headerImg": [
            "/static/img/RELX/relx_h_1.jpg",
            "/static/img/RELX/relx_h_1.jpg"
          ],          
          "detailImg": [
            "/static/img/RELX/1.jpg",
            "/static/img/RELX/2.jpg",
            "/static/img/RELX/3.jpg",
            "/static/img/RELX/4.jpg"
          ],
          "kind": [
            {
              "name": "顏色",
              "info": [
                "藍色",
                "綠色"
              ]
            }
          ]
        },		
        {
          "title": "【Relx】多汁葡萄口味3入組",
          "orgPrice": "580",
          "realPrice": "365",
          "type": "菸彈",
          "Brand": "RELX",
          "content": "內容: 主機*1 西瓜冰沙 x1 檸檬可樂 x1",
          "commonUse": "此款與RELX菸彈、主機皆通用",
          "warranty": "此產品享有半年保固",          
          "text": "20200629 賀成交",
          "headerImg": [
            "/static/img/RELX/relx_h_2.jpg",
            "/static/img/RELX/relx_h_2.jpg"
          ],          
          "detailImg": [
            "/static/img/RELX/1.jpg",
            "/static/img/RELX/2.jpg",
            "/static/img/RELX/3.jpg",
            "/static/img/RELX/4.jpg"
          ],
          "kind": [
            {
              "name": "顏色",
              "info": [
                "藍色",
                "綠色"
              ]
            }
          ]
        },
        {
          "title": "【Relx】綠豆冰沙3入",
          "orgPrice": "500",
          "realPrice": "365",
          "type": "菸彈",
          "Brand": "RELX",
          "content": "內容: 主機*1 西瓜冰沙 x1 檸檬可樂 x1",
          "commonUse": "此款與RELX菸彈、主機皆通用",
          "warranty": "此產品享有半年保固",          
          "text": "20200707 賀成交",
          "headerImg": [
            "/static/img/RELX/relx_h_3.jpg",
            "/static/img/RELX/relx_h_3.jpg"
          ],          
          "detailImg": [
            "/static/img/RELX/1.jpg",
            "/static/img/RELX/2.jpg",
            "/static/img/RELX/3.jpg",
            "/static/img/RELX/4.jpg"
          ],
          "kind": [
            {
              "name": "顏色",
              "info": [
                "藍色",
                "綠色"
              ]
            }
          ]
        },		
        {
          "title": "【Relx】白桃烏龍3入",
          "orgPrice": "500",
          "realPrice": "365",
          "type": "菸彈",
          "Brand": "RELX",
          "content": "內容: 主機*1 西瓜冰沙 x1 檸檬可樂 x1",
          "commonUse": "此款與RELX菸彈、主機皆通用",
          "warranty": "此產品享有半年保固",          
          "text": "20200629 賀成交",
          "headerImg": [
            "/static/img/RELX/relx_h_4.jpg",
            "/static/img/RELX/relx_h_4.jpg"
          ],          
          "detailImg": [
            "/static/img/RELX/1.jpg",
            "/static/img/RELX/2.jpg",
            "/static/img/RELX/3.jpg",
            "/static/img/RELX/4.jpg"
          ],
          "kind": [
            {
              "name": "顏色",
              "info": [
                "藍色",
                "綠色"
              ]
            }
          ]
        },     
        {
          "title": "【Relx】夏日青芒(3入組)",
          "orgPrice": "500",
          "realPrice": "365",
          "type": "菸彈",
          "Brand": "RELX",
          "content": "內容: 主機*1 西瓜冰沙 x1 檸檬可樂 x1",
          "commonUse": "此款與RELX菸彈、主機皆通用",
          "warranty": "此產品享有半年保固",          
          "text": "20200707 賀成交",
          "headerImg": [
            "/static/img/RELX/relx_h_5.jpg",
            "/static/img/RELX/relx_h_5.jpg"
          ],          
          "detailImg": [
            "/static/img/RELX/1.jpg",
            "/static/img/RELX/2.jpg",
            "/static/img/RELX/3.jpg",
            "/static/img/RELX/4.jpg"
          ],
          "kind": [
            {
              "name": "顏色",
              "info": [
                "藍色",
                "綠色"
              ]
            }
          ]
        }
    ]
    self.getProductByPar(self.$route.params.type, self.$route.params.item) 
  },
  watch: {      
  },
  methods: {
    addCart(){
     // Apis.MessageBox.Normal(
        //self,
        //'已將您的商品加入購物車',
        //'',
        //'success',
        //true,
      //  '前往結帳',
      //  '繼續購物'
      //)          
      this.$bus.$emit('addCart', {
        count: self.productCount,
        productItem: self.productDetail
      })

    },
    getProductByPar(type, item) {
      //get API List from brand
      for(let i = 0 ; i < self.productList.length ; i++ ){
        let tmpData = self.productList[i]
        if(tmpData.title === item){
          self.productDetail = tmpData
        }
      }
    },    
    productCountCounter (val, type) {
      let value = Number(val)
      if (type === 'add') {
        self.productCount = value += 1
        return self.productCount
      } else {
        (value <= 1) ? self.productCount = 1 : self.productCount = value -= 1
        return self.productCount
      }
    },       
    showSubListDetail(goal){
      if(self.showSubList === goal){
        self.showSubList = ''
      }else{
        self.showSubList = goal
      }
    },    
    chooseMenu () {
      this.$bus.$emit('menuChange', {id: self.productCount})   
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
</style>
