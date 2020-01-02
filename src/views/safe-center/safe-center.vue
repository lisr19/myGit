<template>
  <div class=" main">
	  <headBar title="安全中心"></headBar>
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
		  <videoList v-if="currIndex===0"></videoList>
		  <patrList v-if="currIndex===1"></patrList>
		  <emergency v-if="currIndex===2"></emergency>
	  </div>
  </div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import videoList from '@/views/safe-center/video/video-list'
	import patrList from '@/views/safe-center/patrol/patrol-list.vue'
	import emergency from '@/views/safe-center/emergency/emergency.vue'
	export default {
		components:{
			headBar,
			videoList,
			patrList,
			emergency
		},
		data() {
			return {
				currIndex:0,
				typeList:[
					{
						name:'视频监控',
						imgUrl:require('@/assets/img/icon7-1.png'),
						imgUrl2:require('@/assets/img/icon7.png')
					},
					{
						name:'在线巡检',
						imgUrl:require('@/assets/img/icon9-1.png'),
						imgUrl2:require('@/assets/img/icon9.png')
					},
					{
						name:'应急资源',
						imgUrl:require('@/assets/img/icon11-1.png'),
						imgUrl2:require('@/assets/img/icon11.png')
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
			left: 5%;
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
