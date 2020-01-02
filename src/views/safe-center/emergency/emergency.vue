<template>
	<div id="box" class="main" @click="show=false">
		<div class="gis">
			<iframe id="cesiumContainer" src="http://llz.halohealth.cn:13003/" frameborder="0" style="width:100%;height:100%;"></iframe> 	<!--外网-->
			<!--<iframe id="cesiumContainer" src="http://192.168.0.122:13003/" frameborder="0" style="width:100%;height:100%;"></iframe>-->
		</div>
		<div class="icon">
			<!--<div class="type-wrap" @click.stop="show=!show">-->
				<!--<img class="sx" src="@/assets/img/saixuan.png">-->
				<!--<div class="type-box" v-if="show">-->
					<!--<ul>-->
						<!--<li v-for="item in typeList" @click="">{{item.name}}</li>-->
					<!--</ul>-->
				<!--</div>-->
			<!--</div>-->
			<div @click="openPass">
				<img class="pass" src="@/assets/img/pass.png">
			</div>
		</div>
	</div>
</template>


<script>

	export default {
		data() {
			return {
				screenHeight: document.documentElement.clientHeight,//屏幕高度
				show:false,
				typeList:[
					{name:'应急场所'},
					{name:'应急人员'},
					{name:'应急物质'},
				]
			}
		},
		created() {

		},
		mounted(){
			window.onresize = ()=>{ // 定义窗口大小变更通知事件
				this.screenHeight = document.documentElement.clientHeight; //窗口高度
			}
			console.log(this.screenHeight);
			if(this.screenHeight>720){
				let oIframe = document.getElementById('box')
				oIframe.style.height = this.screenHeight-100 +'px';
			}
		},
		methods: {
			openPass(){
				this.$router.push({name:'资源审核'})
			},
			showType(){

			}
		}
	}
</script>

<style lang="less" scoped>
	.main{
		background: #ccc;
		height: 1104px;
		margin-top: -120px;
		position: relative;
		.gis{
			width: 100%;
			height:102%;
		}
		.icon{
			position: absolute;
			top: 100px;
			left: 40px;
			display: flex;
			flex-direction: column;
			>div{
				width:78px;
				height:78px;
				background:rgba(55,55,55,0.5);
				border-radius:10px;
				margin-bottom: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.type-wrap{
				position: relative;
				.type-box{
					position: absolute;
					width: 180px;
					background:rgba(55,55,55,0.5);
					border-radius:10px;
					font-size: 28px;
					color: #ffffff;
					padding: 15px 0;
					right: 80px;
					top: 0;
					li{
						padding: 20px 0;
					}
				}
			}
			img{
				width: 56px;
			}
		}
	}
</style>
