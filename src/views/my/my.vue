<template>
	<div class="main">
		<headBar title="个人中心">
			<span slot="left"></span>
		</headBar>
		<div class="head-img">
			<van-uploader v-model="fileList"  :max-count="1" :after-read="afterRead"  />
		</div>
		<div class="about">
			<div class="item" v-for="item in tipList" @click="openDetail(item)">
				{{item.title}}
			</div>
			<!--<div class="item" >-->
				<!--<span>关于用户端</span>-->
				<!--<span class="edition"></span>-->
			<!--</div>-->
		</div>
	</div>
</template>

<script>
	import headBar from '@/components/header/head-bar'
	import {uploadImg} from '@/lib/API/comment'
	import { Toast,Dialog } from 'vant'
	export default {
		components:{
			headBar,
			Toast
		},
		data() {
			return {
				imgUrl:'',
				fileList:[],
				tipList: [
					{
						title: '编辑个人信息'
					},
					{
						title: '服务端地址配置'
					},
					{
						title: '版本更新'
					},
					{
						title: '清除缓存'
					},
					{
						title: '退出账号'
					},
				]
			}
		},
		created() {
		},
		methods: {
			afterRead(file) {
				this.uploadImg(file.file)
			},
			openDetail(item){
				if(item.title==='编辑个人信息'){
					this.$router.push({name:'个人信息'})
				}else if(item.title==='版本更新'){
					this.$router.push({name:'版本更新'})
				} else if(item.title==='退出账号'){
					Dialog.confirm({
						message: '您确定要退出吗？'
					}).then(() => {
						localStorage.clear()
						this.$toast('退出成功')
						this.$router.push({name:'登录'})
					}).catch(() => {
					})
				}
			},
			async uploadImg(params){
				let res = await uploadImg({
					imgFile:params
				})
				if(res.code === 200){
					this.imgUrl = res.data.url
				}
			},

		}
	}
</script>

<style lang="less" scoped>
	.main{
		padding-top: 100px;
		.about {
			/*width: 670px;*/
			width: 90%;
			padding: 40px 0;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.04);
			border-radius: 20px;
			margin: 180px auto 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.item {
				height: 78px;
				line-height: 78px;
				font-size: 26px;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				text-align: left;
				padding: 0 32px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.edition {
					height: 36px;
					font-size: 20px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					line-height: 36px;
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>