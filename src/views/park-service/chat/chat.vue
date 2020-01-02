<template>
	<div class="main">
		<div class="content" id="box">
			<ul>
				<li class="item" v-for="item in msgList">
					<div v-if="item.isSelf" class="right">
						<span>{{item.message}}</span>
						<img class="head-img" :src="imgUrl" alt=" ">
					</div>
					<div v-else class="left">
						<img class="head-img" src="@/assets/img/kefu.png" alt=" ">
						<span>{{item.message}}</span>
					</div>
				</li>
			</ul>
			<div class="btn">
				<input type="text" v-model="message"/>
				<div class="send-btn" @click="sendMsg">发送</div>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		components: {

		},
		data() {
			return {
				message:'',
				msgList:[],
				isSelf:false,
				screenHeight: document.documentElement.clientHeight,//屏幕高度
			}
		},
		created() {
			this.imgUrl = localStorage.getItem('logoUrl')
			setTimeout(()=>{
				this.msgList.push({
					isSelf: false,
					message:'您好，请问有什么可以帮您？'
				})
			},500)
		},
		mounted(){
			window.onresize = ()=>{ // 定义窗口大小变更通知事件
				this.screenHeight = document.documentElement.clientHeight; //窗口高度
			}
			if(this.screenHeight>730){
				let oIframe = document.getElementById('box')
				oIframe.style.height = this.screenHeight-220 +'px';
			}
		},
		methods: {
			sendMsg () {
				this.msgList.push({
					isSelf: true,
					message:this.message
				})
				if(this.message==='军民融合'||this.message==='军民'){
					setTimeout(()=>{
						this.msgList.push({
							isSelf: false,
							message:'军民融合就是把国防和军队现代化建设深深融入经济社会发展体系之中，全面推进经济、科技、教育、人才等各个领域的军民融合，在更广范围、更高层次、更深程度上把国防和军队现代化建设与经济社会发展结合起来，为实现国防和军队现代化提供丰厚的资源和可持续发展的后劲'
						})
					},100)
				}else if(this.message==='园区'){
					setTimeout(()=>{
						this.msgList.push({
							isSelf: false,
							message:'军民融合创新产业园分为首期启动区和二期园区。首期位于顺德北滘环镇东路南1号，面积约6万平方米,是在旧的工业厂房基础上改造的。自去年9月启动建设，用3个月的时间完成了改造，于2017年12月28日投入使用。划分为综合办公区、公共技术平台区、创新孵化区、配套服务区。园区建有4万平方米工业厂房、7个独立无尘车间，保障高技术、高精度产品工程化及中试。目前已经引进军民融合项目20个，预计今年园区企业产值20亿元，明年可达50亿元。'
						})
					},100)
				}else if(this.message==='您好'||this.message==='你好'){
					setTimeout(()=>{
						this.msgList.push({
							isSelf: false,
							message:'您好，请描述您的问题'
						})
					},100)
				}else if(this.message==='好的'){
					setTimeout(()=>{
						this.msgList.push({
							isSelf: false,
							message:'还有什么可以帮助您的吗？'
						})
					},100)
				}
				this.message = ''
				let oIframe = document.getElementById('box')
				setTimeout(()=>{
					oIframe.scrollTop = oIframe.scrollHeight
					console.log(oIframe.scrollTop);
					console.log(oIframe.scrollHeight);
				},300)

			}
		}
	}
</script>

<style lang="less" scoped>
	.main{
		text-align: center;
		.content{
			height: 880px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 8px 0px rgba(0,0,0,0.11);
			border-radius:10px;
			margin:0 auto;
			overflow: auto;
			padding-bottom: 100px;
		}
		.item{
			.head-img{
				width:102px;
				height:102px;
				background:rgba(216,216,216,1);
				display: inline-block;
				border-radius: 50%;
				margin: 20px 26px 20px 44px;
			}
			.left{
				display: flex;
				align-items: center;
				text-align: left;
				margin-right: 10px;
				span{
					background:#F4F5FA;
					border-radius:46px 46px 46px 0px;
					padding:20px;
					font-size:26px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
			}
			.right{
				text-align: right;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				span{
					background:rgba(67,140,255,1);
					border-radius:46px 46px 0px 46px;
					font-size:26px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					padding: 20px 40px;

				}
				.head-img{
					margin: 20px 26px 20px 24px;
				}
			};
		}
		.btn{
			position: absolute;
			width: 100%;
			height: 80px;
			line-height: 80px;
			bottom: 0;
			display: flex;
			input{
				width: 80%;
				padding-left: 20px;
				border: none;
				font-size:26px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
			}
			.send-btn{
				width: 20%;
				background: #438CFF;
				color: #ffffff;
				font-size: 24px;
			}
		}
	}
</style>
