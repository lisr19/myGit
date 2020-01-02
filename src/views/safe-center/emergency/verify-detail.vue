<template>
	<div class="verify-main">
		<headBar title="审核详情"></headBar>
		<div class="card">
			<div class="txt">
				<p>资源名称：{{itemData.name}}</p>
				<p>所属单位：{{itemData.unit}}</p>
				<p>当前状态：{{itemData.status===0?'未审核':(itemData.status===1?'审核未通过':'审核通过')}}</p>
				<p class="time">提交日期：{{itemData.time}}</p>
			</div>
			<img :src="itemData.url" alt=" ">
		</div>
		<div class="btns">
			<div class="btn" @click="editProd('pass')">通过</div>
			<div class="btn btn2" @click="editProd('unpass')">不通过</div>
		</div>
	</div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import {editProd} from "@/lib/API/save-center"
	export default {
		components:{
			headBar
		},
		data() {
			return {
				itemData:{},
			}
		},
		created() {
			this.itemData = this.$route.query.itemData
		},
		methods: {
			async editProd(num){
				let params= {
					id:this.itemData.id
				}
				if(num==='unpass'){
					params.status = 1
				}else if(num==='pass'){
					params.status = 2
				}
				let res = await editProd(params)
				if(res.code === 200){
					this.itemData.status = params.status
					this.$toast('修改成功')
				}else {
					this.$toast(res.message)
				}
			}
		}
	}
</script>


<style scoped>

</style>
<style lang="less" scoped>
	.verify-main{
		text-align: center;
		.card{
			width:684px;
			height:850px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 8px 0px rgba(0,0,0,0.11);
			border-radius:10px;
			position: fixed;
			top: 150px;
			left: 34px;
			z-index: 10;
			padding: 60px 74px;
			box-sizing: border-box;
			.txt{
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:40px;
				text-align: left;
				p{
					font-size:28px;
					font-weight:500;
					margin: 10px 0;
				}
				.time{
					font-size:22px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:32px;
				}
			}
			img{
				width:536px;
				height:366px;
				display: block;
				background: #ccc;
				margin-top: 52px;
				border-radius: 5px;
			}
		}
		.btns{
			position: fixed;
			bottom: 180px;
			.btn{
				width:196px;
				height:88px;
				line-height: 88px;
				background:rgba(91,212,0,1);
				border-radius:44px;
				display: inline-block;
				margin: 0 48px 0 34px;
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
			.btn2{
				margin: 0;
				background:rgba(212,20,0,1);
			}
		}

	}
</style>
