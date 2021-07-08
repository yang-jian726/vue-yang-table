<template>
  <div class="home_div clearfix">
    <div class="home_index l ui_mar_left_48" @click="$router.push({name:'Home'})">首页</div>
    <div class="l" v-for="(item,index) in tabList" :key='index'>
      <i class="line l">/</i>
      <div class="home_title l" @click="clickFn(item,index)" :class="{'active': index+1 == tabList.length}">{{item.name}}</div>
	</div>
  </div>
</template>

<script>
  export default {
    name: "Tabs",
    props:{tabList:{type: [Array, String]}},
    mounted() {console.log(this.tabList)},
    methods:{
      clickFn(item,index){
        var that = this;
        var routerList = this.$router.options.routes;
        routerList.forEach(ele => {
          if(item.name === ele.meta.title) {
            that.$router.push({
              path: ele.path
            })
          }
        })
      },
    }
  }
</script>

<style scoped>
  .home_div{
    /*width: 100%;*/
    height: 48px;
    margin-left: 18px;
    font-size: 14px;
    line-height: 48px;
    background: url("../static/icon_catalog.png") no-repeat;
    background-size: 20px 20px;
    background-position: 0px 14px;
    /*background-color: aquamarine;*/
    position: absolute;
    top: 0;
  }
  .line{
    margin-left: 12px;
    margin-right: 12px;
    color: #333333
  }
  .home_title{
    font-size: 14px;
    color: #333333;
    cursor: default;
  }
  .home_title:hover{
    color: #999999 !important;
  }
  .active{
    color: #999999 ;
    cursor: pointer;
  }
</style>
