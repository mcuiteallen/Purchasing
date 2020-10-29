<template>
  <div>
    <div class="content">
      <vuestic-widget class="no-v-padding sopCss" style="background-color: #ffffff;">
        <!--<swiper :options="swiperOption" ref="mySwiper" v-if="tops.length>1">
          <swiper-slide  v-for="top in tops" :key="top.id" class="swiper_box">
              <div class="goodsimg">
                <img class="swiperImg justify-content-center" :src="top.img">
              </div>
          </swiper-slide>
        </swiper>--> 
        <div class="row justify-content-center">
          <i class="fa fa-arrow-circle-left iconCss" style="font-size: 250%; " @click="chooseMenu(1)" title="首頁"></i>
        </div>           
        <div class="row justify-content-center stepDiv" >
          <div >   
            <div class="step1Head">STEP 1 評估</div>   
            <ul class="css3_content ">
              <li>
                  上傳圖片
              </li>
            </ul>
            <ul class="css3_content">
              <li>
                  專員接洽
              </li>
            </ul>  
            <div class="step1Head">STEP 2 洽談</div>   
            <ul class="css3_content">
              <li>
                  了解實際車況
              </li>
            </ul>
            <ul class="css3_content">
              <li>
                  細談金額
              </li>
            </ul>  
            <div class="step1Head">STEP 3 成交</div>   
            <ul class="css3_content">
              <li>
                  簽立合約書
              </li>
            </ul>
            <ul class="css3_content">
              <li>
                  交車過戶
              </li>
            </ul>      
            <ul class="css3_content">
              <li>
                  匯款
              </li>
            </ul>                                    
          </div>           
        </div>   
       
      </vuestic-widget>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
//import VueAwesomeSwiper from 'vue-awesome-swiper'
//import '@/components/swipe/css/swiper.css'
//Vue.use(VueAwesomeSwiper)

let self = {};
export default {
  name: "Sop",
  computed: {},
  components: {
  },
  data() {
    return {             
      swiperOption: {
        //設定初始化時slide的索引
        initialSlide: 0,
        //Slides的滑動方向，可設定水平(horizontal)或垂直(vertical)
        direction: 'horizontal',
        autoplay: {
          delay: 2500, //1秒切換一次
          disableOnInteraction: false,
        },
        //環狀輪播
        loop: true,
        slidesPerView: 'auto',
        loopedSlides: 3,
        loopAdditionalSlides: 0,
        //一個螢幕展示的數量
        slidesPerView: 1,
                  //間距
        spaceBetween: 26,
        //修改swiper自己或子元素時，自動初始化swiper
        observer: true,  
        //修改swiper的父元素時，自動初始化swiper 	
        observeParents: true
      },        
    };
  },
  mounted() {
    self = this;
  },
  watch: {},
  computed:{
  },  
  methods: { 
    chooseMenu (tabId) {
      this.$bus.$emit('menuChange', {id: tabId})   
    },
  },
  beforeDestroy() {
    //self.cancelModal
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 1rem;
  background-color: #ffffff;
}
.sopImg{
  width: 70%;

  @media (max-width:1024px){
    width: 100%;
  }
  @media (max-width:768px){
    width: 100%;
  }     
  @media (max-width:483px) {
    width: 100%; 
  }   
  @media (max-width:320px) {
    width: 100%; 
    padding-top: 3%;
  }    
}
.btn{
    margin: 20px 0;
    width: 227px;
    height: 58px;
    line-height: 0px;
    border: 1px solid #ccc;
    font-size: 22px;
    font-weight: 900;
    text-align: center;
}
.btn:hover {
    background-color: #bebebe; 
  }
.swiperImg{
  width: 70%;
  margin-left: 15%;
  margin-top: 1%;
  @media (max-width:1024px){
    width: 100%;
    margin-left: 0%;
  }
  @media (max-width:768px){
    width: 100%;
    margin-left: 0%;
  }     
  @media (max-width:483px) {
    width: 100%;
    margin-left: 0%;   
  }       
}    
.sopCss{
  margin-top: 10px;
  @media (max-width:483px) {
    margin-top: 10px;
  }    
}
.step1Head{
  font-size: 28px;
  color: #4c4948;
  margin-bottom: 30px;
}
.css3_content li {
list-style-type: none;
}
.css3_content li:before {
content: url("/static/img/home/nav-usersettings.png");
vertical-align: middle;
margin-right: 5px;
}
.stepDiv{
  margin-top: 3%
}
.iconCss{
  color: #34495e;
}
.iconCss:hover{
  color: #34495ea6;
}
</style>
