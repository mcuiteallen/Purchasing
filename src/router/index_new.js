import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'

Vue.use(Router)

export default new Router({
  mode: 'history',  
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' },
    },    
    {
      name: 'v1',
      path: '/',
      component: main,
      children: [  
        {
          path: '/Home',
          name: 'Home',
          component: resolve=>require(['@/components/Home'],resolve),    
          props: true,
        },
        {
          path: '/productList',
          name: 'productList',
          component: resolve=>require(['@/components/productList'],resolve),    
          props: true,
        }              
      ]
    }    
  ]
})