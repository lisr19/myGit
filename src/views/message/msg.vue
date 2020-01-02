<template>
	<div class="main">
		<headBar title="消息" :size="true"></headBar>
		<ul class="msg-items">
			<li class="item" v-for="item in msgList">
				<p class="type">{{item.typeName}}</p>
				<p class="time">{{item.addTime}}</p>
				<div class="desc">{{item.message}}</div>
			</li>
		</ul>
	</div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import {getMsgList} from "@/lib/API/comment"
	export default {
		components:{
			headBar
		},
		data() {
			return {
				msgList:[]
			}
		},
		created() {
			this.userId = localStorage.getItem('userId')
			this.getMsgList({receiverId:this.userId,size:50})
		},
		methods: {
			async getMsgList(params){
				let res = await getMsgList(params)
				if(res.code === 200){
					this.msgList=res.data.list
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.main{
		padding-top: 130px;
	}
	.msg-items{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
		.item{
			width:710px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			font-size:26px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height:36px;
			text-align: left;
			padding: 24px;
			box-sizing: border-box;
			margin-bottom: 20px;
			.type{
				font-size:32px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:44px;
			}
			.time{
				font-size:22px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:32px;
				margin: 10px 0 20px;
			}
		}
	}
</style>
