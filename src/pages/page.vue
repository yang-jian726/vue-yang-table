<template>
  <div id="page">
	<div class="header">
		 <header-common></header-common>
	</div>
	<div class="content">
		<router-view/>
	</div>

  </div>
</template>

<script>
import HeaderCommon from  '../components/hearer-common/hearerCommon.vue'
export default {
  name: 'App',
  components:{
	  HeaderCommon
  },
  created() {

  }
}
</script>

<style scoped>

</style>
