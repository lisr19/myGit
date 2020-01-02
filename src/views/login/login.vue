<template>
	<div class="page">
		<div class="login">
			<div class="logo">
				<img src="@/assets/img/logo.png" alt="">
				<p>园区管理</p>
			</div>
			<div class="inputs" v-if="!showCode">
				<input  v-model="phoneNum" type="number" placeholder='账号' @keyup="changColor" oninput="if(value.length>11)value=value.slice(0,11)">
				<input  v-model="passWord"  type="password" placeholder='密码'  @keyup="changColor" name="" oninput="if(value.length>16)value=value.slice(0,16)">
			</div>
			<div class="inputs" v-else>
				<input  v-model="phoneNum" type="number" placeholder='账号' @keyup="changColor2" oninput="if(value.length>11)value=value.slice(0,11)">
				<div class="send-box">
					<input  v-model="code"  type="number" placeholder='验证码' @keyup="changColor2" oninput="if(value.length>6)value=value.slice(0,6)">
					<span class="send-btn" @click="sendCode">{{loadingText}}</span>
				</div>
				<input  v-model="newPassWord"  type="password" placeholder='输入新密码' @keyup="changColor2" oninput="if(value.length>16)value=value.slice(0,16)">
			</div>
			<div class="btn" ref="loginBtn" v-if="!showCode" @click="login">登录</div>
			<div class="btn" ref="codeBtn" v-else @click="checkCode">确定修改</div>
			<div class="tip" @click="showCode=!showCode">{{!showCode?'忘记密码？':'登录账号'}}</div>
		</div>
	</div>
</template>
<script>
	import {mapActions} from 'vuex'
	import {userLogin,sendCode,checkCode,resetPassword} from '@/lib/API/comment'
	export default {

		data(){
			return{
				phoneNum:null,
				phoneNum2:null,
				passWord:null,
				newPassWord:null,
				code:null,
				showCode:false,
				isSend:false,
				loadingText:'发送'
			}
		},
		created(){

		},
		mounted(){
		},
		methods:{
			...mapActions(['userLogin']),

			// 用户登录
			login(){
				if(!this.phoneNum){
					this.$toast('请输入手机号')
					return
				}
				if(!this.passWord){
					this.$toast('请输入密码')
					return
				}
				if(!(/^1[3-9]\d{9}$/.test(this.phoneNum))){
					this.$toast('电话号码格式错误')
					return
				}
				let params = {
					username:this.phoneNum,
					password :this.passWord,
					type :1,
				}
				this.userLogin(params).then((res) =>{
					if(res.code===200){
						this.$toast('登录成功')
						let token = res.data.token
						let userInfo = res.data.userInfo
						let userId = userInfo.id
						let name = userInfo.name
						let sex = userInfo.sex
						let username = userInfo.username
						let phone = userInfo.phone
						let logoUrl = userInfo.logoUrl
						let enterpriseId = userInfo.enterpriseId
						let enterpriseName = userInfo.enterpriseName
						let email = userInfo.email
						//websocket连接
						this.socketApi.initWebSocket(userId)
						localStorage.setItem('token',token)
						localStorage.setItem('userId',userId)
						localStorage.setItem('name',name)
						localStorage.setItem('sex',sex)
						localStorage.setItem('username',username)
						localStorage.setItem('phone',phone)
						localStorage.setItem('logoUrl',logoUrl)
						localStorage.setItem('email',email)
						localStorage.setItem('enterpriseId',enterpriseId)
						localStorage.setItem('enterpriseName',enterpriseName)
						this.$router.push({name:'首页'})
					}else if(res.message==='帐户被禁用，请与管理员联系！'){
						this.$toast('帐户被禁用，请与管理员联系！')
					} else if(res.message==='密码错误'){
						this.$toast('密码错误')
					} else if(res.message==='此用户不存在'){
						this.$toast('此用户不存在')
					} else {
						this.$toast(res.message)
					}
				})
			},
			//发送验证码
			async sendCode(){
				if(!this.phoneNum){
					this.$toast('请输入手机号')
					return
				}
				if(!(/^1[3-9]\d{9}$/.test(this.phoneNum))){
					this.$toast('电话号码格式错误')
					return
				}
				let res = await sendCode({
					phone:this.phoneNum
				})
				if(res.code === 200){
					this.$toast('发送成功')
					//倒计时
					this.isSend = true
					let second = 60
					let countDown = setInterval(()=>{
						this.loadingText = second+'S'
						second--
						if(second == 0){
							clearInterval(countDown)
							this.isSend = false
							this.loadingText = '重新发送'
						}
					},1000)
					this.loadingText = ''
				}else {
					this.$toast('发送失败')
				}
			},
			//校验验证码
			async checkCode(){
				let res = await checkCode({
					phone:this.phoneNum,
					code:this.code
				})
				if(res.code === 200){
					console.log('验证码成功');
					// this.$toast('验证码成功')
					this.resetPassword()
				}else {
					this.$toast('验证码错误')
				}
			},
			//修改密码
			async resetPassword(){
				if(!this.newPassWord) return this.$toast('请输入新密码')
				let res = await resetPassword({
					phone:this.phoneNum,
					password:this.newPassWord,
				})
				if(res.code === 200){
					this.$toast('密码修改成功，请重新登录')
					setTimeout(()=>{
						this.showCode = false
					},1000)
				}
			},
			changColor(){
				if(!this.phoneNum|!this.passWord){
					this.$refs.loginBtn.style.background='#999'
				}else {
					this.$refs.loginBtn.style.background='#0075FF'
				}
			},
			changColor2(){
				if(!this.phoneNum |!this.code |!this.newPassWord){
					this.$refs.codeBtn.style.background='#999'
				}else {
					this.$refs.codeBtn.style.background='#0075FF'
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.page{
		position: absolute;
		height: 100%;
		width: 100%;
		background: url("../../assets/img/login-bg.png") no-repeat;
		background-size:100% 100%;
		.logo{
			text-align: center;
			margin-top: 130px;
			img{
				width:130px;
				height:130px;
				display: block;
				margin: 0 auto;
			}
			p{
				font-size:32px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:44px;
				margin: 22px 0 80px;
			}
		}
		.inputs{
			border:2px solid rgba(46,79,206,0.4);
			width:612px;
			margin: 0 auto;
			border-radius:8px;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.send-box{
				width: 100%;
				position: relative;
				input{
					width: 100%;
				}
				span{
					position: absolute;
					right: 10px;
					top: 15px;
					padding: 0 10px;
					width: auto;
					min-width: 100px;
					height: 58px;
					line-height: 58px;
					font-size:24px;
					border-radius: 10px;
					color: rgba(150,150,150,1);
					border: 2px solid rgba(150,150,150,1);
				}
			}
		}
		input{
			height:88px;
			background:rgba(255,255,255,1);
			border: none;
			padding-left: 40px;
			font-size:30px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(27,49,135,1);
			border-bottom: solid 2px rgba(46, 79, 206, 0.4);
		}
		.btn{
			width:612px;
			height:88px;
			line-height: 88px;
			background:#999;
			box-shadow:0px 4px 8px 0px rgba(5,59,123,1);
			border-radius:8px;
			font-size:30px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:#fff;
			margin: 40px auto;
		}
		.login{

		}
		.tip{
			text-align: right;
			font-size:28px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			line-height:40px;
			padding-right: 74px;
		}
	}
</style>
