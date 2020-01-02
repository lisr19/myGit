<template>
  <div class="main">
	  <headBar title="版本更新"></headBar>
	  <div>
		  <img src="" alt="">
		  <h2>园区管理系统</h2>
		  <p>Version 1.0.0</p>
		  <ul class="items">
			  <li class="item" >自动更新
			     <!--<span>是<van-icon name="arrow" /></span>-->
				  <van-switch v-model="checked"  size="24px"/>
			  </li>
			  <li class="item" >版本号
				  <span>1.0.2<van-icon name="arrow" /></span>
			  </li>
		  </ul>
	  </div>

  </div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	export default {
		components:{
			headBar
		},
		data() {
			return {
				checked:false
			}
		},
		created() {

		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>
	.main{
		padding-top: 100px;
		.items{
			background:rgba(255,255,255,1);
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(51,51,51,1);
			margin: 0 auto;
			padding: 0 32px;
			.item{
				font-size:28px;
				height: 96px;
				line-height:96px;
				border-bottom: solid #D4D4D4 1px;
				text-align: left;
				display: flex;
				justify-content: space-between;
				align-items: center;
				span{
					display: flex;
					align-items: center;
				}
				span:last-child{
					font-size:28px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:36px;
				}
			}
			.item.h-img{
				height: 134px;
				line-height: 134px;
			}
			.item:last-child{
				border-bottom:none;
			}
		}
	}
</style>
