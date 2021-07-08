<template>
  <div>
    <span class="txt_record_div">
      <div class="text_sum l">共12条</div>
      <div class="text_btn l">10条/页</div>
    </span>
    <!--上一页-->
    <button class="page_up" type="button" @click="pageFn()"></button>
    <div class="current_page">{{page.pagination}}</div>
    <div class="oblique_line">/</div>
    <div class="total_page">2</div>
    <!--下一页-->
    <button class="page_down" type="button" @click="pageFn()"></button>
    <div class="type_page_jump">前往</div>
    <input class="txt_page_jump" v-model="pageJump" type="text">
    <div class="unit">页</div>
  </div>
</template>

<script>
  export default {
    name: "Page",
    props:{
      value: {
        type: Object,
        default: {
          pagination: 1,
        }
      },
      pageFn: {
        type: Function,
      }
    },
    data(){
      return {
        pageJump: "",
        page: this.value
      }
    },
    methods: {},
    watch: {}
  }
</script>

<style scoped>
  .txt_record_div{
    position: relative;
    font-size: 12px;
    color: #666666;
  }
  .text_sum{
    width: 56px;
    height: 24px;
    margin-top: 3px;
    line-height: 24px;
  }
  .text_btn{
    width: 56px;
    height: 24px;
    margin-top: 3px;
    line-height: 24px;
    border: 1px solid #999999;
    margin-right: 16px;
   }
  /*上一页*/
  .page_up{
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 16px;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    background: #FFFFFF url("../static/icon_pre.png") no-repeat center;
    background-size: 10px 10px;
    vertical-align: top;
  }
  .page_up:hover{
    background: #37dbdc url("../static/icon_pre_focus.png") no-repeat center;
    background-size: 10px 10px;
    border: 1px solid #37dbdc;
  }
  .page_up:active{
    background: #37dbdc url("../static/icon_pre_focus.png") no-repeat center;
    background-size: 10px 10px;
    border: 1px solid #37dbdc;
  }
  /*当前页码*/
  .current_page{
    position: relative;
    display: inline-block;
    _width: 10px;
    min-width: 10px;
    height: 32px;
    font-size: 12px;
    color: #999999;
    line-height: 32px;
    text-align: right;
    vertical-align: top;
  }
  /*斜线*/
  .oblique_line{
    position: relative;
    display: inline-block;
    _width: 9px;
    min-width: 9px;
    height: 32px;
    font-size: 12px;
    color: #999999;
    line-height: 32px;
    text-align: center;
    vertical-align: top;
  }
  /*总页码*/
  .total_page{
    position: relative;
    display: inline-block;
    _width: 10px;
    min-width: 10px;
    height: 32px;
    font-size: 12px;
    color: #999999;
    line-height: 32px;
    text-align: left;
    vertical-align: top;
  }
  /*下一页*/
  .page_down{
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-left: 16px;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    background: #FFFFFF url("../static/icon_next.png") no-repeat center;
    background-size: 10px 10px;
    vertical-align: top;
  }
  .page_down:hover{
    background: #37dbdc url("../static/icon_next_focus.png") no-repeat center;
    background-size: 10px 10px;
    border: 1px solid #37dbdc;
  }
  .page_down:active{
    background: #37dbdc url("../static/icon_next_focus.png") no-repeat center;
    background-size: 10px 10px;
    border: 1px solid #37dbdc;
  }
  .type_page_jump{
    position: relative;
    display: inline-block;
    margin-top: 0;
    width: 52px;
    height: 32px;
    font-size: 12px;
    color: #333333;
    line-height: 32px;
    text-align: center;
    vertical-align: top;
  }
  .txt_page_jump{
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    font-size: 12px;
    color: #999999;
    line-height: 32px;
    text-align: center;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    vertical-align: top;
  }
  .unit{
    position: relative;
    display: inline-block;
    width: 28px;
    height: 32px;
    font-size: 12px;
    color: #333333;
    line-height: 32px;
    text-align: center;
    vertical-align: top;
  }
</style>
