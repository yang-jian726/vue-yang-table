import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/login'
import Home from '@/pages/home/home'

//Recommendation首页推荐
import Recommendation from '@/pages/recommendation/recommendation'
import Ranking from '@/pages/recommendation/ranking'

Vue.use(Router)

export default new Router({
  routes: [
	 {
	    path: '/',
	    name: 'Login',
	    component: Login,
	    meta:{
	      title:'登录'
	    }
	 },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta:{
        title:'主页'
      },
    },
    {
      path: '/Recommendation',
      name: 'Recommendation',
      component: Recommendation,
      meta: {
        title: '首页推荐'
      }
    },
    {
      path: '/Ranking',
      name: 'Ranking',
      component: Ranking,
      meta: {
        title: '好货排行榜'
      }
    }
  ]
})
