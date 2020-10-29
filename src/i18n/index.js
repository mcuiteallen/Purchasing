import Vue from 'vue'
// add translations directly to the application
Vue.i18n.add('en', require('./en.json'))
Vue.i18n.add('tw', require('./tw.json'))
Vue.i18n.add('cn', require('./cn.json'))

// set the start locale to use
switch (navigator.language) {
  case 'zh-TW':
    Vue.i18n.set('tw')
    break
  case 'zh-CN':
    Vue.i18n.set('cn')
    let CnBody = document.getElementsByTagName('body')[0]
    CnBody.style.cssText = 'font-family: NotoSans-Regular,PMingLiU;font-weight: initial'
    break
  default:
    console.log(navigator.language)
    Vue.i18n.set('en')
    break
}

// set fallback for non-translated strings
Vue.i18n.fallback('en')
