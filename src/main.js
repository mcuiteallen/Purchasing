// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import store from './store'
import VuesticPlugin from '@/vuestic-theme/vuestic-plugin'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import RMMGlobal from '@/util/RMMGlobal'
import './i18n'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(VuesticPlugin)
Vue.use(VeeValidate, { fieldsBagName: 'formFields' })

// event bus
var bus = new Vue()
Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return bus
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  }  
})
