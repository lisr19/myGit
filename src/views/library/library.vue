<template>
  <div class=" main">
	  <headBar title="知识库"></headBar>
	  <div class="card">
		  <van-icon name="search" size="30px" color="#CDCDCD" @click="searchName"/>
		  <input type="text" placeholder="搜索关键内容" v-model="name">
	  </div>
	  <div class="content">
		  <p class="title">推荐文档</p>
		  <ul class="tips">
			  <li class="tip">企业管理</li>
			  <li class="tip">企业服务</li>
			  <li class="tip">企业安全信息</li>
		  </ul>
		  <div class="txt-list">
			  <ul>
				  <li v-for="item in libList">
					  <span>{{item.name}}</span>
					  <a :href="item.fileUrl" download style="display: inline-block">
						  <em>下载</em>
					  </a>
					  <!--<em>2mb</em>-->
				  </li>
			  </ul>
			  <p v-if="!libList.length">无此资源文件</p>
		  </div>
	  </div>
  </div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import {getLibraryList} from "@/lib/API/comment"
	export default {
		components:{
			headBar,
		},
		data() {
			return {
				name:'',
				libList:[],
				currIndex:0,
				typeList:[
					{
						name:'当前任务',
						imgUrl:require('@/assets/img/logo.png'),
						imgUrl2:require('@/assets/img/search.png')
					},
					{
						name:'工单管理',
						imgUrl:require('@/assets/img/logo.png'),
						imgUrl2:require('@/assets/img/search.png')
					},
					{
						name:'在线支持',
						imgUrl:require('@/assets/img/logo.png'),
						imgUrl2:require('@/assets/img/search.png')
					},
				]
			}
		},
		created() {
			this.getLibraryList()
		},
		methods: {
			tagType(index){
				this.currIndex =index
			},
			searchName(){
				this.getLibraryList({name:this.name})
			},
			async getLibraryList(params){
				let res = await getLibraryList(params)
				if(res.code === 200){
					this.libList=res.data.list
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.main{
		text-align: center;
		.card{
			width:684px;
			height:90px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 8px 0px rgba(0,0,0,0.11);
			border-radius:10px;
			position: fixed;
			top: 180px;
			left: 34px;
			z-index: 10;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			input{
				height:100px;
				border: none;
				padding: 0 20px;
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(147,147,147,1);
				line-height:34px;
			}
		}
		.content{
			padding-top:300px;
			.title{
				font-size:24px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:34px;
				margin: 24px 0;
				text-align: left;
				padding-left: 40px;
			}
			.tips{
				text-align: left;
				padding-left: 30px;
				.tip{
					height:48px;
					display: inline-block;
					background:rgba(255,255,255,1);
					border-radius:10px;
					border:2px solid rgba(241,241,241,1);
					font-size:24px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:48px;
					margin-right: 32px;
					padding: 3px 10px;
				}
			}
			.txt-list{
				margin-top: 58px;
				ul{
					padding: 0 34px;
					li{
						border-bottom: 2px solid #EDEDED;
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 94px;
						/*a{*/
							/*text-decoration: none;*/
						/*}*/
						span{
							font-size:28px;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(51,51,51,1);
							line-height:40px;
						}
						em{
							font-size:28px;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:40px;
						}
					}
				}
				p{
					font-size: 24px;
					margin-top: 100px;
				}
			}
		}

	}
</style>
