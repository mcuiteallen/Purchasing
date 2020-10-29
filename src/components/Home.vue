<template>
  <div>
      <vuestic-widget >
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
        <!--<div class="row justify-content-center">
          <img class="logoImg" src="/static/img/logo.png">     
        </div>-->
        <div class="row justify-content-center">
          <swiper class="col-md-8" ref="mySwiper" :options="swiperOption" v-if="tops.length > 1">
              <swiper-slide  v-for="top in tops" :key="top.id" style="margin-top: 0%;text-align: center;">
                <img class="swiperImg" :src="top.img">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
          </swiper>    
        </div>      
        <div class="row justify-content-center">
          <swiper class="col-md-8" ref="mySwiper" :options="swiperOption" v-if="tops2.length > 1">
              <swiper-slide  v-for="top in tops2" :key="top.id" style="padding-top: 6%;text-align: center;">
                <img class="swiperImg" :src="top.img">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
          </swiper>    
        </div>   
        <div class="row justify-content-center" style="padding-top: 6%;text-align: center;">
          <img  class="col-md-6 adsImg" src="/static/img/mei.jpg" >     
        </div>
        <div class="row justify-content-center">
          <swiper class="col-md-8" ref="mySwiper" :options="swiperOption" v-if="tops3.length > 1">
              <swiper-slide  v-for="top in tops3" :key="top.id" style="padding-top: 6%;text-align: center;">
                <img class="swiperImg" :src="top.img" style="">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
          </swiper>    
        </div>          
      </vuestic-widget>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Apis from '@/util/Apis'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '@/components/swiper/css/swiper.css'
let self = {};
export default {
  name: "Home",
  computed: {},
  components: {
    loading: VueLoading,
    Swiper,
    SwiperSlide    
  },
  data() {
    return {
      isLoading: false,
      fullPage: false,
      clientSource: '',  
      tops: [
        {
          "name": "home1",
          "img": "/static/img/top1.jpg"
        },
        {
          "name": "home2",
          "img": "/static/img/top2.jpg"
        }				
      ], 
      tops2: [
        {
          "name": "home1",
          "img": "/static/img/2top1.jpg"
        },
        {
          "name": "home2",
          "img": "/static/img/2top2.jpg"
        }				
      ],      
      tops3: [
        {
          "name": "home1",
          "img": "/static/img/3top1.jpg"
        },
        {
          "name": "home2",
          "img": "/static/img/3top2.jpg"
        }				
      ],           
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
      topIndex: 1,   
    };
  },
  mounted() {
    self = this
    let href = window.location.href
    let regex = /gclid=/g;
    let match = regex.exec(href)
    if(match && match.length > 0){
      self.clientSource = '來自Google廣告'
    }else{
      self.clientSource = '來自seo自然排序'
    }
  
    
  },  
  watch: {},
  computed:{
    swiper() {
      return this.$refs.mySwiper.$swiper
    }    
  },  
  methods: {               
  },
  beforeDestroy() {
  }
};
</script>

<style scoped lang="scss">
.logoImg{
  min-height: auto;
  width: 20%;  
  @media (max-width: 1024px){  
    width: 20%; 
  }
  @media (max-width: 768px){    
    width: 30%; 
  }   
  @media screen and (max-height: 823px) and (max-width: 483px){  
    width: 30%; 
  }   
}
.img1{
  min-height: auto; 
  @media (max-width: 1024px){  
  }
  @media (max-width: 768px){    
  }   
  @media screen and (max-height: 823px) and (max-width: 483px){  
  }   
}
.logoDiv{
  //height: 600px;
  min-height: auto;  
  @media screen and (max-height: 823px) and (max-width: 1024px){  
    min-height: auto;
  }
  @media screen and (max-height: 823px) and (max-width: 768px){    
    min-height: auto;
  }     
  @media screen and (max-height: 823px) and (max-width: 483px){  
    min-height: auto;
  }   
}
.swiperImg{
  min-height: auto;
  width: 75%; 
  @media (max-width: 1024px){  
  }
  @media (max-width: 768px){    
  }   
  @media screen and (max-height: 823px) and (max-width: 483px){  
    width: 100%; 
  }  
}    
.adsImg{
  min-height: auto;
  width: 75%; 
  max-height: 470px;
  @media (max-width: 1024px){  
  }
  @media (max-width: 768px){    
  }   
  @media screen and (max-height: 823px) and (max-width: 483px){  
    width: 100%; 
    max-height: 202px;
  }  
}    
</style>
