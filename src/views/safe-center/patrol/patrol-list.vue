<template>
	<ul class="part-items">
		<li class="item" v-for="item in taskList">
			<p class="title">
				<span>记录编号：{{item.id}}</span>
				<span>巡检员：{{item.inspectorName}}</span>
			</p>
			<div class="content">
				<img :src="item.image" alt=" ">
				<div class="text">
					<p>巡检企业：{{item.inspectorUnit}}</p>
					<p>危险源：{{item.hazardsName}}</p>
					<p>{{item.addTime.slice(0,11)}}</p>
				</div>
				<div class="">
					<p class="tip" :class="{red:item.status=='0'}">{{item.status=='0'?'未填报':'已填报'}}</p>
					<div class="btn" v-if="item.status=='0'" @click="openInput(item)">填报</div>
					<div class="btn detail" v-else @click="openInput(item)">详情</div>
				</div>
			</div>
		</li>
	</ul>
</template>


<script>
	import {getPatrolList} from "@/lib/API/patrol"
	export default {
		data() {
			return {
				taskList:[]
			}
		},
		created() {
			this.getPatrolList()
		},
		methods: {
			openInput(item){
				this.$router.push({name:'巡检结果填报',query:{itemData:item},params:{callback:this.callback}})
			},
			callback(){
				this.taskList=[]
				this.getPatrolList()
			},
			async getPatrolList(params){
				let res = await getPatrolList(params)
				if(res.code === 200){
					this.taskList = res.data.list
				}else {
					this.$toast(res.message)
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.part-items{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
		.item{
			width: 92%;
			height:300px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin-bottom: 20px;
			.title{
				font-size:24px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:58px;
				height: 58px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom:1px solid #E6E6E6;
				padding: 0 30px;
				span:last-child{
					color:rgba(153,153,153,1);
				}
			}
			.content{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 238px;
				padding: 0 30px;
				font-size:24px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:34px;
				img{
					width:186px;
					height:186px;
					background:rgba(127,127,127,1);
					border-radius:10px;
					display: block;
					overflow: hidden;
				}
				.text{
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					height: 90%;
					flex: 1;
					text-align: left;
					padding:0 15px;
				}
				.red{
					color:rgba(221,80,68,1);
				}
				.btn{
					width:180px;
					line-height: 72px;
					height:72px;
					background:rgba(0,111,255,1);
					border-radius:32px;
					font-size:26px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					margin-top: 42px;
				}
				.detail{
					color:rgba(0,111,255,1);
					background:rgba(255,255,255,1);
					border-radius:32px;
					border:2px solid rgba(0,111,255,1);
				}
			}
		}
	}
</style>
