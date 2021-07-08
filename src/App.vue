<template>
  <div id="app">
<!--    <div class="header">-->
<!--      <header-common></header-common>-->
<!--    </div>-->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import HeaderCommon from '../src/components/hearer-common/hearerCommon.vue'
  export default {
    name: 'App',
    components:{HeaderCommon},
    created() {}
  }
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  background:#fafafa;
  width: 100%;
  height: 100%;
}

</style>
