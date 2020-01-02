<template>
	<div class="patrol-main">
		<headBar title="巡检结果填报"></headBar>
		<div class="card">
			<van-field
					v-model="itemData.inspectorName"
					clearable
					label="巡检员姓名："
					placeholder=""
					disabled
			/>
			<van-field
					v-model="itemData.inspectorUnit"
					clearable
					label="巡检企业名称："
					placeholder=""
					disabled
			/>
			<van-field
					v-model="itemData.hazardsName"
					clearable
					label="企危险源名称："
					placeholder=""
					disabled
			/>
			<div class="text">
				<p>巡查结果详情：</p>
				<van-field
						v-model="itemData.detail"
						rows="5"
						type="textarea"
				/>
			</div>
			<div class="text text2">
				<p>上传结果：</p>
				<van-uploader  :max-count="1" :after-read="afterRead" :preview-size="100" >
					<img :src="itemData.image" alt=" ">
				</van-uploader>
			</div>
			<div class="btn" @click="editPatrol">提交</div>
		</div>
	</div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import {editPatrol} from "@/lib/API/patrol"
	import {uploadImg} from "@/lib/API/comment"
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
			this.itemData=this.$route.query.itemData
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
					this.itemData.image = res.data.url
				}
			},
			async editPatrol(){
				let params ={
					id:this.itemData.id,
					detail:this.itemData.detail,
					image:this.itemData.image,
					status:1
				}
				let res = await editPatrol(params)
				if(res.code === 200){
					this.$toast('修改成功')
					this.$route.params.callback()
				}else {
					this.$toast(res.message)
				}
			},
		}
	}
</script>


<style scoped>
	.patrol-main>>>.van-cell{
		margin-top: 20px;
		display: flex;
		align-items: center;
		padding: 15px;
	}
	.patrol-main>>>.van-cell:not(:last-child)::after{
		border: none;
	}
	.patrol-main>>>.van-field__label{
		flex: 1;
	}
	.patrol-main>>>.van-cell__value{
		width:414px;
		height:60px;
		line-height: 60px;
		background:rgba(250,250,250,1);
		border-radius:10px;
		border:2px solid rgba(245,245,245,1);
		padding-left: 15px;
		flex: 1.5;
	}
	.text>>>.van-cell__value{
		height:200px;
		background:rgba(250,250,250,1);
		border-radius:10px;
		border:2px solid rgba(236,236,237,1);
	}
</style>
<style lang="less" scoped>
	.patrol-main{
		text-align: center;
		.card{
			width: 91%;
			height:1118px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 8px 0px rgba(0,0,0,0.11);
			border-radius:10px;
			position: fixed;
			top: 150px;
			left: 4.5%;
			z-index: 10;
		}
		.text{
			text-align: left;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:40px;
			margin-top: 30px;
			p{
				padding-left: 30px;
				margin-bottom: -15px;
			}
		}
		.text2{
			text-align: center;
			margin-top: 10px;
			p{
				text-align: left;
			}
			img{
				width: 220px;
				height: 160px;
				display: block;
				background: #ccc;
				margin: 30px 0 30px;
				border-radius: 5px;
			}
		}
		.btn{
			width:90%;
			height:88px;
			background:rgba(0,111,255,1);
			border-radius:44px;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:88px;
			margin: 0 auto ;
		}
	}
</style>
