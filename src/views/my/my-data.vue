<template>
	<div class="main">
		<head-bar title="个人中心" ></head-bar>
		<div class="card">
			<div class="head-img">
				<!--<img  v-if="imgUrl" :src="imgUrl" alt=" " >-->
				<!--<img  v-else  src="@/assets/img/headimg.png" alt="">-->
				<van-uploader  :max-count="1" :after-read="afterRead"  :preview-size="60">
					<img  v-if="imgUrl" :src="imgUrl" alt=" " >
					<img  v-else  src="@/assets/img/headimg.png" alt="">
				</van-uploader>
			</div>
			<div class="desc">
				<p class="role">ID：{{userId}} <span>{{roleName}}</span></p>
				<p class="ent" v-if="enterpriseName">所属企业：{{enterpriseName}}</p>
				<!--<p class="edit-btn" @click="editShow=!editShow">编辑信息</p>-->
			</div>
		</div>
		<van-cell-group class="my-data">
			<van-field v-model="username"   required label="用户名"  disabled />
			<van-field v-model="name"   required label="姓名" placeholder="请输入姓名" />
			<van-field v-model="phone"  required label="电话" placeholder="请输入电话" disabled/>
			<van-field v-model="email"  required label="邮箱" placeholder="请输入邮箱" />
		</van-cell-group>
		<div class="version">
			<span>当前版本：1.0V</span>
			<span>已是最新版本</span>
		</div>
		<div class="version">
			<span>自动更新</span>
			<van-switch v-model="upAuto"  size="24px"/>
		</div>
		<div  class="btn1" style="background: #006FFF;color: #fff" @click="userUptate">保存修改</div>
		<div  class="btn" @click="quit">退出登录</div>
		<!--<van-popup v-model="showSexBox">-->
			<!--<van-picker-->
					<!--show-toolbar-->
					<!--title="性别"-->
					<!--:columns="columns"-->
					<!--@cancel="onCancel"-->
					<!--@confirm="onConfirm"-->
			<!--/>-->
		<!--</van-popup>-->
	</div>
</template>

<script>
	import headBar from '@/components/header/head-bar'
	import write from '@/components/write/write'
	import {userUptate,getUserDate,uploadImg} from "@/lib/API/comment"
	import {mapState} from 'vuex'
	import {Dialog } from 'vant';

	export default {
		components:{
			headBar,
			write,
		},
		computed:{
			...mapState({
				userInfo:state=>state.user.userInfo
			}),
		},
		data() {
			return {
				showSexBox:false,
				columns: ['男', '女'],
				editShow:false,
				upAuto:false,
				imgUrl:'',
				fileList:[],
				name:'',
				username:'',
				phone:'',
				email:'',
				sex:''
			}
		},
		created() {
			this.userId = localStorage.getItem('userId')
			this.name = localStorage.getItem('name')
			this.sex = localStorage.getItem('sex')
			this.username = localStorage.getItem('username')
			this.phone = localStorage.getItem('phone')
			this.email = localStorage.getItem('email')
			this.enterpriseName = localStorage.getItem('enterpriseName')
			this.imgUrl = localStorage.getItem('logoUrl')
			this.roleName = this.userInfo.roles[0].name
		},
		mounted () {

		},
		methods:{
			afterRead(file) {
				this.uploadImg(file.file)
			},
			async uploadImg(params){
				let res = await uploadImg({
					imgFile:params
				})
				if(res.code === 200){
					this.imgUrl = res.data.url
				}
			},
			//编辑个人信息
			async userUptate(){
				let params = {
					id:this.userId,
					name:this.name,
					phone:this.phone,
					email:this.email,
					logoUrl:this.imgUrl
				}
				let res = await userUptate(params)
				if(res.code === 200){
					this.$toast('修改成功')
					localStorage.setItem('name',this.name)
					localStorage.setItem('sex',this.sex)
					localStorage.setItem('phone',this.phone)
					localStorage.setItem('logoUrl',this.imgUrl)
					localStorage.setItem('email',this.email)
				}else {
					this.$toast(res.message)
				}
			},
			quit(){
				Dialog.confirm({
					message: '您确定要退出吗？'
				}).then(() => {
					localStorage.clear()
					this.$toast('退出成功')
					this.$router.push({name:'登录'})
				}).catch(() => {})
			},
		}
	}
</script>


<style scoped>
	.my-data>>>.van-field__label{
		text-align: left;
		width: 100px;
	}
	.my-data>>>.van-cell{
		padding-left: 50px;
	}
</style>
<style lang="less" scoped>
	.main {
		padding-top: 350px;
		.card{
			width:91%;
			height:170px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 8px 0px rgba(182,213,245,1);
			border-radius:10px;
			position: fixed;
			top: 150px;
			left: 34px;
			z-index: 10;
			text-align: left;
			padding-left: 200px;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:44px;
			box-sizing: border-box;
			.desc{
				margin-top: 20px;
				.role{
					span{
						font-size:24px;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(153,153,153,1);
						line-height:34px;
						margin-left: 50px;
					}
				}
				.ent{
					font-size: 20px;
				}
				.edit-btn{
					font-size:24px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(1,122,255,1);
					line-height:34px;
					margin-top: 10px;
				}
			}
			.head-img{
				width:112px;
				height:112px;
				background:rgba(0,0,0,1);
				display: block;
				border-radius: 50%;
				position: absolute;
				left: 62px;
				top: -28px;
				overflow: hidden;
				img{
					width:112px;
					height:112px;
					display: block;
				}
			}
		}
		.my-data{
			width:92%;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			margin: -10px auto 20px;
			border-radius: 5px;
		}
		.version{
			width:92%;
			height:78px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background:rgba(255,255,255,1);
			border-radius:10px;
			font-size:24px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:34px;
			margin: 0 auto;
			padding:0 48px;
			box-sizing: border-box;
			span:last-child{
				color:rgba(153,153,153,1);
			}
		}
		.btn1{
			width:92%;
			height:60px;
			line-height: 60px;
			background:rgba(255,255,255,1);
			border-radius:48px;
			margin: 200px auto 30px;
		}
		.btn{
			width:92%;
			height:60px;
			margin: 0 auto;
			line-height: 60px;
			background:rgba(255,255,255,1);
			border-radius:48px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
	}
</style>
