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
      <div class="catalogue_sub1 catalogue-word" @click="toUp()">首页推荐</div>
      <div class="catalogue_sub2 catalogue-word-sub">好货排行榜</div>
    </div>
    <div class="recommendation-content l">
      <!--引用组件tab、header-common-->
      <header-common></header-common>
      <Tabs :tabList='pageList'></Tabs>

      <!--筛选查询-->
      <div class="clearfix search_div">
        <div class="search_title">
          <div class="search_word l">筛选查询</div>
          <button  @click="inquiry(1)" class="r search_btn">查询结果</button>
          <div class="search_word r">
            <img src="../../static/icon_select_arrow.png" style="height: 12px;width: 12px;">
            <span class="ui_mar_left_4 ui_mar_right_8" style="color: #999999">收起筛选</span>
          </div>
        </div>
        <!--商品名称、状态-->
        <div class="name l">
          <div class="name-word l">商品名称：</div>
          <input class="search_input l" placeholder="商品名称" v-model="search.productName">
        </div>
        <div class="status l">
          <div class="name-word l">推荐状态：</div>
          <select class="l status_selected">
            <option >请选择</option>
            <option>推荐</option>
            <option>未推荐</option>
          </select>
        </div>
      </div>

      <!--table-->
      <div class="th_content clearfix">
        <div class="data_list l">数据列表</div>
        <div class="select_product r">选择商品</div>
      </div>
      <table class="cs_table clearfix" width="95%" style="margin: 0 auto">
        <!--头部-->
        <tr>
          <th width='40px'><div class="op_square ui_mar_left_12"></div></th>
          <th width='240px'>编号</th>
          <th width='200px'>商品名称</th>
          <th width='96px'>是否推荐</th>
          <th width='196px'>排序</th>
          <th width='172px'>状态</th>
          <th width='75px'>操作</th>
        </tr>
        <!--1-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1574862597151946</td>
          <td>恒源祥 绣花亚麻靠垫被TDK1002-8</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="25"></td>
          <td>推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
        <!--2-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1575810001404505</td>
          <td>西屋 手持式蒸汽挂烫机WH-PG306A</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="24"></td>
          <td>推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
        <!--3-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1578275125587979</td>
          <td>米家蓝牙温湿度计2</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="18"></td>
          <td>推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
        <!--4-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1578274996321366</td>
          <td>幻响 单耳蓝牙耳机A1</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="12"></td>
          <td>推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
        <!--5-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1578275629771158</td>
          <td>幻响插座数据旅行套装</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="9"></td>
          <td>未推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
        <!--6-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1574862936788555</td>
          <td>纵贯线四件套休闲椅 ST-11</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="8"></td>
          <td>未推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
        <!--7-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1588917164558452</td>
          <td>洁锦 五星级酒店浴巾70^140cm</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="4"></td>
          <td>未推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
        <!--8-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1578275461250737</td>
          <td>乐扣乐扣电水壶EJK717</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="2"></td>
          <td>未推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
        <!--9-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1575810096199995</td>
          <td>博堡多功能蒸汤营养锅BDY-D005</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="1"></td>
          <td>未推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
        <!--10-->
        <tr>
          <td><div class="op_square ui_mar_left_12"></div></td>
          <td>1575810156000118</td>
          <td>Kindle Paperwhite 4电子书阅读器（8GB 黑色）</td>
          <td><slide-button style="top: 10px"></slide-button></td>
          <td><input class="td_input" value="0"></td>
          <td>未推荐</td>
          <td class="td_op_word"><span>置顶</span><span class="ui_mar_left_8">删除</span></td>
        </tr>
      </table>
      <!--操作-->
      <div class="operation_div clearfix">
        <div class="op_square l ui_mar_top_32 ui_mar_left_24"></div>
        <div class="all_selected l">全选</div>
        <input class="op_input l" placeholder="批量操作">
        <button class="confirm_btn l" type="button">确定</button>
        <!--页面跳转-->
        <div class="page_div r"><Page :value="search" :pageFn="inquiry"></Page></div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'recommendation',
    data(){return{
      pageList:[
        {name:'首页推荐'}, {name:'好货排行榜'},
      ],
      search: {
        productName: "",
        pagination: 1,
        totalAmount: 0,
      }
    }},
    mounted () {
      this.inquiry(1);
    },
    methods: {
      inquiry(pageNum){},

      //路由
      toHome() {this.$router.push({path:'/Home'})},
      toUp(){this.$router.push({path:'/Recommendation'})}
    },
  }
</script>

<style scoped>
  .recommendation-view{width: 1300px;height: 900px;background-color: #fff;margin: 0 auto}
  .recommendation-catalogue{width: 10%;height: 900px;background-color: #304156}
  .catalogue{width: 100%;height: 60px;background: url(../../static/icon_select_arrow.png) no-repeat;background-position: 96px 24px ;background-size: 12px 12px;}
  .catalogue_sub1{width: 100%;height: 60px;background: url(../../static/icon_select.png) no-repeat;background-position: 96px 24px ;background-size: 12px 12px;}
  .catalogue_sub2{width: 100%;height: 60px;background-color: #1F2D3B;}
  .catalogue-word{font-size: 14px;line-height: 60px;color: #fafafa;text-align: left;margin-left: 12px;}
  .catalogue-word-sub{font-size: 14px;line-height: 60px;color: #2D90FF;text-align: left;padding-left: 26px;}
  .recommendation-content{width: 90%;background-color: #ffffff}
  .search_div{width: 100%;height: 128px;border: 1px solid paleturquoise;text-align: left}
  .search_title{width: 95%;height: 48px;margin: 0 auto;background: #f3f3f3 url("../../static/icon_search_default.png") no-repeat;background-size: 16px 16px;background-position: 24px 16px}
  .search_word{font-size: 14px;padding-left: 56px;line-height: 48px;color: #333333;font-family: "Microsoft Yahei"}
  .search_btn{background: #ffffff;border: none;font-size: 14px;height: 36px;margin-top: 6px;width: 72px;border-radius: 4px;margin-right: 16px}
  .name{margin-left: 4%;margin-top: 24px;height: 36px;width: 296px}
  .name-word{line-height: 36px;font-size: 12px;font-family: "Microsoft Yahei";color: #333333}
  .status{margin-left: 48px;height: 36px;width: 240px;margin-top: 24px}
  select{}
  .status_selected{border: 1px solid paleturquoise;width: 156px;height: 36px;margin-left: 12px;padding-left: 12px;color: #999999}
  .search_input{height: 36px;width: 224px;font-size: 12px;line-height: 36px;padding-left: 12px;margin-left: 12px;border-radius: 6px;border: 1px solid paleturquoise;color: #333333}
  .th_content{height: 36px;width: 95%;margin: 12px auto 0;color: #333333;font-size: 14px;font-family: 'Avenir', Helvetica, Arial, sans-serif;background-color: #edf0f3;}
  .data_list{line-height: 36px;margin-left: 36px}
  .select_product{width: 72px;height: 24px;margin-top: 6px;background: #ffffff;text-align: center;line-height: 24px;margin-right: 36px}
  .operation_div{height: 80px;width: 95%;margin: 0 auto;border: 1px solid #EEEEEE;border-top: none}
  .page_div{position: relative;top: 24px;right: 4%}
  .op_square{width: 16px;height: 16px;border: 1px solid #999999;border-radius: 4px}
  .all_selected{font-size: 12px;line-height: 80px;margin-left: 12px}
  .op_input{margin-left: 16px;border: 1px solid #999999;height: 32px;font-size: 12px;padding-left: 8px;border-radius: 4px;margin-top: 24px;color: #333333}
  .confirm_btn{height: 30px;margin-top: 25px;line-height: 30px;font-size: 12px;color: #333333;background: #fafafa;margin-left: 18px;border: 1px solid #999999;width: 48px}
  .td_op_word{font-size: 12px;color: #2D90FF}
  .td_input{border: 1px solid #2D90FF;height: 24px;font-size: 12px;padding-left: 12px}
</style>
