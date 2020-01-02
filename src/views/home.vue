<template>
	<div class="home" @click="showTip=false">
		<div class="head-bar">
			<van-icon  name="wap-nav" size="40px" @click.stop="showTip=!showTip"/>
			<p style="z-index: 9">园区管理</p>
			<img v-if="imgUrl" :src="imgUrl" alt=" " @click="openMy">
			<img  v-else  src="@/assets/img/headimg.png" alt="" @click="openMy">
			<div class="tip-box" v-if="showTip">
				<p @click="clear">清空缓存</p>
				<p @click="showInput=true">服务端地址配置</p>
			</div>
		</div>
		<div class="bg">
			<img  src="@/assets/img/bg.png">
		</div>
		<div class="main">
			<ul>
				<li @click="openType('安全中心')">
					<img  src="@/assets/img/icon1.png">
					<p>安全中心</p>
				</li>
				<li @click="openType('数据填报')">
					<img  src="@/assets/img/icon2.png">
					<p>数据填报</p>
				</li>
				<li @click="openType('数据分析')">
					<img  src="@/assets/img/icon3.png">
					<p>数据分析</p>
				</li>
				<li @click="openType('消息')">
					<img  src="@/assets/img/icon4.png">
					<p>消息</p>
				</li>
				<li @click="openType('园区服务')">
					<img  src="@/assets/img/icon5.png">
					<p>园区服务</p>
				</li>
				<li @click="openType('知识库')">
					<img  src="@/assets/img/icon6.png">
					<p>知识库</p>
				</li>
			</ul>
		</div>
		<div class="set-ip">
			<van-dialog
					v-model="showInput"
					title="地址配置"
					show-cancel-button
					@confirm="confirm"
			>
				<van-field v-model="ipAddr"  placeholder="请输入地址" />
			</van-dialog>
		</div>
	</div>
</template>

<script>
	import headBar from '@/components/header/head-bar'
	import {Toast } from 'vant';
	export default {
		name: 'home',
		components:{
			headBar,
			Toast
		},
		data() {
			return {
				ipAddr:'',
				showTip:false,
				showInput:false,
				imgUrl:''
			}
		},
		created() {
			this.userId = localStorage.getItem('userId')
			this.imgUrl = localStorage.getItem('logoUrl')
			if(!this.userId){
				this.$router.push({name:'登录'})
			}

		},
		methods: {
			confirm(){
				if(!this.ipAddr) {
					this.$toast('请输入地址')
					return
				}
				Toast.loading({
					message: '配置中...',
					forbidClick: true
				})
				setTimeout(()=>{
					this.$toast('地址配置成功')
				},1500)
			},
			clear(){
				Toast.loading({
					message: '正在清除...',
					forbidClick: true
				})
				this.showTip =false
				setTimeout(()=>{
					this.$toast('清空缓存成功')
				},1500)
			},
			openMy(){
				this.$router.push({name:'个人中心'})
			},
			openType(type){
				if(type==='安全中心'){
					this.$router.push({name:'安全中心'})
				}else if(type==='数据填报'){
					this.$router.push({name:'数据填报'})
				}else if(type==='消息'){
					this.$router.push({name:'消息'})
				}else if(type==='园区服务'){
					this.$router.push({name:'园区服务'})
				}else if(type==='知识库'){
					this.$router.push({name:'知识库'})
				}else if(type==='数据分析'){
					this.$router.push({name:'数据分析'})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.home{
		min-height: 100%;
		background:rgba(247,247,250,1);
		.head-bar{
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: 150px;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			padding: 0 48px;
			background:linear-gradient(92deg,rgba(0,144,255,1) 0%,rgba(0,87,255,1) 100%);
			border-radius:0 0 0 56px;
			img{
				width:80px;
				height:80px;
				background:rgba(0,0,0,1);
				border-radius: 50%;
				z-index: 2;
				justify-self: flex-end;
			}
		}
		.tip-box{
			width:236px;
			height:264px;
			background:rgba(81,81,81,1);
			position: absolute;
			left: 32px;
			top: 120px;
			border-radius: 20px;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			padding:0 20px;
			box-sizing: border-box;
			&:after{

			}
			p{
				line-height: 130px;
				text-align: left;
			}
			p:first-child{
				border-bottom:solid 2px #626262 ;
			}
		}
		.bg{
			width: 100%;
			height:386px;
			margin-top: -200px;
			img{
				width: 100%;
			}
		}
		.main{
			margin-top: -120px;
			ul{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				padding: 0 48px;
				justify-content: center;
				li{
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					width:47%;
					height:308px;
					background:rgba(255,255,255,1);
					box-shadow:0px 4px 8px 0px rgba(166,166,166,0.32);
					border-radius:30px 30px 96px 30px;
					margin-bottom: 44px;
					font-size:32px;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(104,106,116,1);
					line-height:44px;
					img{
						width:120px;
						margin-bottom: 24px;
					}
				}
				li:nth-child(2n+1){
					margin-right: 38px;
				}
			}
		}
		.set-ip{

		}
	}
</style>