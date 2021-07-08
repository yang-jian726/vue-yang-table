<template>
  <div class="home-page">
    <div class="home_menu clearfix">
      <div class='home_menu_item' v-for="(menu, index) in menuList" :key='index' @click="to(menu.routePathName)">
        {{menu.menuName}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Home',
    data() {return {
      menuList:[
        {menuName:'商品配置'},
        {menuName:'优惠券管理'},
        {menuName:'商城订单'},
        {menuName:'活动管理'},
        {menuName:'抽奖管理'},
        {menuName:'对账管理'},
        {menuName:'平台管理'},
        {menuName:'数据统计'},
        {menuName:'审核管理'},
        {menuName:'首页推荐',routePathName:'/Recommendation'},
      ]
    }},
    created() {},
    mounted(){},
    computed: {},
    methods: {
      to(path) {
        this.$router.push({
          path: path
        })
      }
    },
  }
</script>

<style scoped>
  .home-page{width: 100%;background-color: #ffffff}
  .home_menu{width: 1200px;margin: 224px auto;}
  .home_menu_item{width:240px;height: 152px;background-color: #1ecccd;border-radius: 9px;border: solid 1px #f2f2f2;float: left;margin-left:40px;margin-bottom:40px;color:#333333;font-size: 16px;line-height: 152px;}
</style>
