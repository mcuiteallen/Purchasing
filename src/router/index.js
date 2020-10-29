import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import lazyLoading from './lazyLoading'

Vue.use(Router)

export default new Router({
  //mode: 'history',  
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' },
    },     
    {
      path: '/',
      component: main,
      children: [  
        {
          path: 'Home/:type',
          name: 'Home',
          component: lazyLoading('Home'),
          props: true,
        },
        {
          path: '/productList/:type',
          name: 'productList',
          component: lazyLoading('productList'),
          props: true,
        },
        {
          path: '/productDetail/:type/:item',
          name: 'productDetail',
          component: lazyLoading('productDetail'),
          props: true,
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: lazyLoading('checkout'),
          props: true,
        }                      
      ]
    }    
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }  
})