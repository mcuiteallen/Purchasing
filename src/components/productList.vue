<template>
  <div>
    <vuestic-widget  class="no-v-padding sampleNavCss">  
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>    
      <!--<div class="row justify-content-end">
        <img class="col-md-10" src="/static/img/productListHeader.webp">     
      </div> -->  
      <div class="row justify-content-center" style="margin-left: 0px;margin-right: 0px;">
        <div class="col-md-2 mainContent" >
          <div class="card text-start m-3" style="border: unset;">
            <div class="card-body" style="padding: 0rem">               
              <div v-if="pageType === 'all' || pageType === 'listByBrand'" class="row justify-content-start" style="margin-left: 0px;margin-right: 0px;width: 100%;">
                <fieldset style="width: 100%;">
                  <div
                    class="form-group with-icon-right"
                  >
                    <div class="input-group" >
                      <input name="searchInput" v-model="searchInput" v-validate="'required'" />
                      <i class="fa fa-search icon-right input-icon" style="font-size: 15px;"></i>
                      <i class="bar"></i>
                    </div>
                  </div>                  
                <!--<input class="" name="query" maxlength="100">
                <button class="searchBtn"><i class="fa fa-search icon-right input-icon" style="font-size: 15px;"></i></button>     -->
                </fieldset>
              </div>
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
                  <select v-if="pageType === 'all' || pageType === 'listByBrand'" class="col-md-3" style="outline: none;margin: 10px;" @change="changeSort(sort)" v-model="sort">
                    <option >商品排序</option>
                    <option>上架時間: 由新到舊</option>
                    <option>上架時間: 由舊到新</option>
                    <option>價格: 由高至低</option>
                    <option>價格: 由低至高</option>
                  </select>    
                  <select v-if="pageType === 'all' || pageType === 'listByBrand'" class="col-md-3" style="outline: none;margin: 10px;" @change="changeShowCount(showCount)" v-model="showCount">
                    <option >每頁顯示數量</option>
                    <option>每頁顯示10個</option>
                    <option>每頁顯示20個</option>
                    <option>每頁顯示30個</option>
                  </select>                                       
              </div>              
                
              <div class="row listCss">
                <div class="listDiv" v-for="(item, i) in pageOfItems"  :key="i" style=""  @click="selectAProduct(item)">
                  <div class="row" style="margin-left: 0px;margin-right: 0px;">
                    <a><img :src="item.headerImg[0]" style="width: 100%"></a>
                  </div>                     
                  <div class="row" style="margin-left: 0px;margin-right: 0px;">
                    <a><span style="color: #333;">{{item.title}}</span></a>
                  </div>                   
                  <div class="row" style="margin-left: 0px;margin-right: 0px;">
                    <a><span style="color: #333;"><s>NT${{item.orgPrice}}</s></span></a>
                  </div> 
                  <div class="row" style="margin-left: 0px;margin-right: 0px;">
                    <a><span style="color: #c0392b;">NT${{item.realPrice}}</span></a>
                  </div>                                     
                </div>                   
              </div>                                                                                  
            </div>
            <div v-show="pageType === 'all' || pageType === 'listByBrand'" class="card-footer pb-0 pt-3 " style="background-color: #fff;border-top: 0px;">
              <div class="row justify-content-center" style="margin-left: 0px;margin-right: 0px;">
                <jw-pagination style="" :items="productList" @changePage="onChangePage" :pageSize=100 :labels="customLabels" ></jw-pagination>
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
      pageType: '',
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
    if(self.$route.params.type !== 'all'){
      self.pageType = 'listByBrand'
      self.getProductListByPar(self.$route.params.type)
    }else{
      self.pageType = 'all'
      self.getAllProduct()
    }
  },
  watch: {      
  },
  methods: {
    addCart(){
      Apis.MessageBox.Normal(
        self,
        '已將您的商品加入購物車',
        '',
        'success',
        true,
        '前往結帳',
        '繼續購物'
      ).then(

      )          
      this.$bus.$emit('addCart', {
        count: self.productCount,
        productItem: self.productDetail
      })

    },
    getProductListByPar(type) {
      //get API List from brand
      for(let i = 0 ; i < self.productList.length ; i++ ){
        let tmpData = self.productList[i]
        if(tmpData.title === type){
          self.productDetail = tmpData
        }
      }
    },   
    getAllProduct() {
      //get all 
    },        
    showSubListDetail(goal){
      if(self.showSubList === goal){
        self.showSubList = ''
      }else{
        self.showSubList = goal
      }
    }, 
    onChangePage(pageOfItems) {
      // update page of items
      self.isLoading = true
      self.pageOfItems = pageOfItems;
      setTimeout(function(){
        self.isLoading = false
      }, 1000);
    },
    chooseMenu () {
      this.$bus.$emit('menuChange', {id: self.productCount})   
    }, 
    selectAProduct(item){
      self.$router.push('/productDetail/RELX/' + item.title)     
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
  font-size: 12px;  
}
.menu-button:hover{
  color: rgb(202, 197, 197) !important;
}
.listDiv{
  width: 160px;
  margin-left: 20px;
  @media screen and (max-height: 823px) and (max-width: 483px){  
    margin-left: 10px;
    width: 130px;
  }      
}
</style>
