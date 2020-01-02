<template>
	<div class="main">
		<headBar title="工单详情" :size="true"></headBar>
		<div class="content">
			<p class="id">编号：{{orderItem.id}}</p>
			<p>名称：{{orderItem.title}}</p>
			<p class="name">姓名：{{orderItem.peopleName}}</p>
			<p class="tel">电话：{{orderItem.phone}}</p>
			<p class="time">上班考勤时间：{{orderItem.workAttendTime}}</p>
			<p class="time">下班考勤时间：{{orderItem.afterWorkTime}}</p>
		</div>
	</div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	export default {
		components:{
			headBar
		},
		data() {
			return {
				orderItem:{}
			}
		},
		created() {
			this.orderItem=this.$route.query.orderItem
		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>
	.main{
		padding-top: 130px;
		.content{
			text-align: left;
			width:710px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin: 0 auto;
			padding: 24px;
			box-sizing: border-box;
			p{
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:40px;
				margin-top: 18px;
			}
			.id{
				font-size:32px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:44px;
			}
		}
	}
</style>
