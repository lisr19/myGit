<template>
	<div class="main">
		<headBar title="任务详情" :size="true"></headBar>
		<div class="content">
			<p class="time">任务创建时间：{{taskItem.addTime}}</p>
			<p>任务名称：<input type="text" v-model="taskItem.title"></p>
			<p>任务详情：<input type="text" v-model="taskItem.detail"></p>
			<p>现场图片：</p>
			<van-uploader  :max-count="1" :after-read="afterRead" :preview-size="100" >
				<img :src="taskItem.imgUrl" alt=" ">
			</van-uploader>
			<p>客户满意度：
				<van-rate v-model="customerSatisfaction" />
			</p>
		</div>
		<div class="btn" @click="editTask">提交修改</div>
	</div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import {editTask} from "@/lib/API/work"
	import {uploadImg} from "@/lib/API/comment"
	export default {
		components:{
			headBar
		},
		data() {
			return {
				customerSatisfaction:5,//客户满意度
				taskItem:{},
				imgUrl:'',
				fileList:[]
			}
		},
		created() {
			this.taskItem=this.$route.query.taskItem
			console.log(this.taskItem);
			this.customerSatisfaction = this.taskItem.customerSatisfaction
		},
		methods: {
			afterRead(file) {
				this.uploadImg(file.file)
			},
			async uploadImg(params){
				let res = await uploadImg({
					imgFile:params
				})
				if(res.code === 200){
					this.taskItem.imgUrl = res.data.url
				}
			},
			async editTask(){
				let params = {
					customerSatisfaction:this.customerSatisfaction,
					id:this.taskItem.id,
					title:this.taskItem.title,
					detail:this.taskItem.detail,
					imgUrl:this.taskItem.imgUrl,

				}
				let res = await editTask(params)
				if(res.code === 200){
					this.$toast('修改成功')
					// this.$router.back()
				}else {
					this.$toast(res.message)
				}
			},
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
				margin-top: 25px;
				input{
					border: none;
					border-bottom: 1px solid #ccc;
					height: 80px;
					line-height: 80px;
					padding-left: 10px;
				}
			}
			img{
				height: 380px;
				width: 660px;
				display: block;
				background: #ccc;
				margin: 30px 0 50px;
				border-radius: 5px;
			}
		}
		.btn{
			width:606px;
			height:88px;
			background:rgba(0,111,255,1);
			border-radius:44px;
			margin: 80px auto;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:88px;
		}
	}
</style>
