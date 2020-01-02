<template>
	<div class="head-bar" :class="{auto:size}">
		<div class="left">
			<slot name="left">
				<van-icon name="arrow-left" @click="goBack" size="28px"/>
			</slot>
		</div>
		{{title}}
		<div class="right">
			<slot name="right">
			</slot>
		</div>

	</div>
</template>

<script>
	export default {
		name: "head-bar",
		props: {
			title: String, // 标题
			size: Boolean, // 标题
		},
		data() {
			return {
				isBack:false
			}
		},
		methods:{
			goBack(){
				this.$router.back()//返回上一层
			},
		}
	}
</script>

<style lang="less" scoped>
	.head-bar{
		z-index: 9;
		width: 100%;
		height:228px;
		line-height: 120px;
		background:linear-gradient(135deg,rgba(0,168,255,1) 0%,rgba(0,111,255,1) 100%);
		position: fixed;
		font-family:PingFangSC;
		font-weight:500;
		top: 0;
		left: 0;
		font-size:36px;
		color: rgba(255, 255, 255, 1);
		.left{
			position: absolute;
			left: 20px;
			top: 15px;
		}
		.right{
			position: absolute;
			right: 20px;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(1,122,255,1);
			line-height:40px;
		}
	}
	.auto{
		height:100px;
		line-height: 100px;
	}
</style>
