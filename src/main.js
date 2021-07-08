// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//全局css
import './assets/css/global.css'
import './assets/css/csui.css'

//头部文件，例如用户登录等显示
import HeaderCommon from  '@/components/hearer-common/hearerCommon.vue'
Vue.component('header-common', HeaderCommon)

//标题控件tab
import Tabs from '@/components/tabs.vue'
Vue.component('Tabs', Tabs)
import Page from '@/components/page.vue'
Vue.component('Page', Page)
import webSelect from '@/components/web-select/webSelect'
Vue.component('webSelect', webSelect)
import SlideButton from '@/components/slideButton.vue'
Vue.component('SlideButton', SlideButton)

Vue.config.productionTip = false;


// 根据路由设置标题
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  next();
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
