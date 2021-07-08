<template>
  <div class="recommendation-view">
    <div class="recommendation-catalogue l">
      <div class="catalogue catalogue-word" @click="toHome()">首页</div>
      <div class="catalogue catalogue-word">商品配置</div>
      <div class="catalogue catalogue-word">优惠券管理</div>
      <div class="catalogue catalogue-word">商城订单</div>
      <div class="catalogue catalogue-word">活动管理</div>
      <div class="catalogue catalogue-word">抽奖管理</div>
      <div class="catalogue catalogue-word">对账管理</div>
      <div class="catalogue catalogue-word">平台管理</div>
      <div class="catalogue catalogue-word">数据统计</div>
      <div class="catalogue catalogue-word">审核管理</div>
      <div class="catalogue catalogue-word" @click="toRanking()">首页推荐</div>
    </div>
    <div class="recommendation-content l">
      <header-common></header-common>
      <Tabs :tabList='pageList'></Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'recommendation',
    data(){return{
      pageList:[
        {name:'首页推荐'}
      ],
    }},
    mounted () {},
    methods: {
      toHome() {
        this.$router.push({
          path:'/Home'
        })
      },
      toRanking(){
        this.$router.push({
          path: '/Ranking'
        })
      }
    }
  }
</script>

<style scoped>
  .recommendation-view{width: 1300px;height: 900px;background-color: #fff;margin: 0 auto}
  .recommendation-catalogue{width: 10%;height: 900px;background-color: #304156}
  .catalogue{width: 100%;height: 60px;background: url(../../static/icon_select_arrow.png) no-repeat;background-position: 96px 24px ;background-size: 12px 12px;}
  .catalogue-word{font-size: 14px;line-height: 60px;color: #fafafa;text-align: left;margin-left: 12px;}
  .recommendation-content{width: 90%;background-color: #ffffff}
</style>
