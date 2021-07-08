<template>
	<div class="login">
			<button class="btn_login" @click="login">登录</button>
	</div>
</template>

<script>
	export default {
		data() {return {}},
		created() {},
		mounted() {},
		methods: {
			login() {
				var that = this;
				that.$router.push({
				  path:'/Home'
				})
			},

		}

	}
</script>

<style scoped>
	.login {position: absolute;width: 100%;height: 100%;}
	.btn_login {margin-top: 300px;width: 420px;height: 72px;line-height: 72px;font-size: 24px;color: #FFFFFF;text-align: center;border-style: none;background-color: #1ecccd;border-radius: 36px;}
	.btn_login:active {background-color: #0f2a34;border-radius: 36px;border-style: none;}
</style>
