<template>
  <div class="header_div r">
    <img src="../../static/icon_user.png" @click="toLogin()">
  </div>
</template>

<script>
  export default {
    name: 'hearerCommon',
    methods: {
      toLogin(){}
    }
  }
</script>

<style scoped>
.header_div{
  height: 48px;
  /*width: 900px;*/
  /*background-color: yellow*/
}
</style>
