<template>
	<div class="task-items">
		<ul class="nav">
			<li :class="{active:currIndex===index}" v-for="(item,index) in typeList" @click="tagType(index)">
				<p>{{item.name}}</p>
			</li>
		</ul>
		<div class="content">
			<div class="item" v-for="item in taskList">
				<div>
					<p class="name">{{item.title}}</p>
					<p class="time">发布时间{{item.addTime}}</p>
				</div>
				<div class="more" @click="openDetail(item)">
					详情
				</div>
			</div>
		</div>
		<!--<div class="btn" @click="addTask">-->
			<!--新增任务-->
		<!--</div>-->
	</div>
</template>


<script>
	import {getTaskList} from "@/lib/API/work"
	export default {
		data() {
			return {
				taskList:[],
				currIndex:0,
				typeList:[
					{
						name:'全部'
					},
					{
						name:'已完成'
					},
					{
						name:'未完成'
					},
				]
			}
		},
		created() {
			this.getTaskList()
		},
		methods: {
			async getTaskList(params){
				let res = await getTaskList(params)
				if(res.code === 200){
					this.taskList = res.data.list
				}else {
					this.$toast(res.message)
				}
			},
			tagType(index){
				this.currIndex =index
				if(index===1){
					this.getTaskList({
						status:1
					})
				}else if(index===2){
					this.getTaskList({
						status:0
					})
				}else {
					this.getTaskList()
				}
			},
			addTask(){
				this.$router.push({name:'新增任务'})
			},
			openDetail(item){
				this.$router.push({name:'任务详情',query:{taskItem:item}})
			}
		}
	}
</script>

<style lang="less" scoped>
	.task-items{
		min-height: 100%;
		margin: 0 auto ;
		width:684px;
		background:rgba(255,255,255,1);
		border-radius:10px;
		.nav{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 76px;
			line-height: 76px;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(191,191,191,1);
			padding: 0 80px;
			li{
				height:100%;
			}
			li.active{
				font-size:28px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(1,122,255,1);
				border-bottom: 8px solid #017AFF;
			}
		}
		.content{
			border-top: solid 2px #F4F4F4;
			height:880px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			overflow: auto;
			.item{
				height: 116px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2px solid #E9E9E9;
				padding: 0 40px;
				text-align: left;
				.name{
					font-size:28px;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(0,0,0,1);
					line-height:40px;
				}
				.time{
					font-size:22px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:32px;
					margin: 5px 0;
				}
			}
		}
		.btn{
			width:616px;
			height:82px;
			background:rgba(0,0,0,1);
			border-radius:49px;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:82px;
			position: absolute;
			bottom: 50px;
			left: 8%;
		}
	}
</style>
