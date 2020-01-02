<template>
  <div class=" main">
	  <headBar title="园区服务"></headBar>
	  <div class="card">
		  <ul class="nav">
			  <li :class="{active:currIndex===index}" v-for="(item,index) in typeList" @click="tagType(index)">
				  <img :src="item.imgUrl2" alt="" v-if="currIndex===index">
				  <img :src="item.imgUrl" alt="" v-else>
				  <p>{{item.name}}</p>
			  </li>
		  </ul>
	  </div>

	  <div class="content">
		  <task v-if="currIndex===0"></task>
		  <order v-if="currIndex===1"></order>
		  <chat v-if="currIndex===2"></chat>
	  </div>
  </div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import task from '@/views/park-service/task/task-list'
	import order from '@/views/park-service/work-order/order-list'
	import chat from '@/views/park-service/chat/chat'
	export default {
		components:{
			headBar,
			task,
			order,
			chat
		},
		data() {
			return {
				currIndex:0,
				typeList:[
					{
						name:'当前任务',
						imgUrl:require('@/assets/img/icon10-1.png'),
						imgUrl2:require('@/assets/img/icon10.png')
					},
					{
						name:'工单管理',
						imgUrl:require('@/assets/img/icon8-1.png'),
						imgUrl2:require('@/assets/img/icon8.png')
					},
					{
						name:'在线支持',
						imgUrl:require('@/assets/img/icon12-1.png'),
						imgUrl2:require('@/assets/img/icon12.png')
					},
				]
			}
		},
		created() {

		},
		methods: {
			tagType(index){
				this.currIndex =index
			}
		}
	}
</script>

<style lang="less" scoped>
	.main{
		text-align: center;
		.card{
			width:91%;
			height:170px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 8px 0px rgba(0,0,0,0.11);
			border-radius:10px;
			position: fixed;
			top: 150px;
			left: 34px;
			z-index: 10;
			.nav{
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 70px;
				font-size:24px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:34px;
				img{
					width: 82px;
					margin-bottom: 10px;
				}
				li.active{
					color: #438CFF;
				}
			}
		}
		.content{
			padding-top:350px;
		}

	}
</style>
