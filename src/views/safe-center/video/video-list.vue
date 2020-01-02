<template>
	<ul class="video-items">
		<li class="item" v-for="item in taskList" @click.self="openVideo(item)">
			<div style="display: flex;">
				<img class="video" src="@/assets/img/unopen.png" alt="" v-if="item.state===0">
				<video v-else class="video" autoplay loop muted :src="item.url" @click="openVideo(item)"></video>
				<div class="text">
					<p>{{item.number}}</p>
					<p>{{item.enterpriseName}}</p>
					<van-switch :value="item.state===1?true:false" size="24px" @change="onInput(item)"/>
				</div>
			</div>
			<van-icon name="arrow" color="#D8D8D8" size="24px" style="padding-right: 5px"/>
		</li>
	</ul>
</template>


<script>
	import {getCameraList,updateCamera} from "@/lib/API/save-center"
	export default {
		data() {
			return {
				taskList:[],
				isFull:false,
			}
		},
		created() {
			this.getCameraList()
		},
		activated(){
			this.taskList=[]
			this.getCameraList()
		},
		methods: {
			openVideo(item){
				this.$router.push({name:'监控详情',query:{itemData:item}})
			},
			async getCameraList(params){
				let res = await getCameraList(params)
				if(res.code === 200){
					this.taskList = res.data.list
				}else {
					this.$toast(res.message)
				}
			},
			async updateCamera(params){
				let res = await updateCamera(params)
				if(res.code === 200){

				}
			},
			onInput(item){
				console.log(item.state);
				if(item.state===1){
					item.state=0
					this.updateCamera({state:0,id:item.id})
				}else {
					item.state=1
					this.updateCamera({state:1,id:item.id})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.video-items{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
		.item{
			width: 92%;
			height:198px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size:24px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
			line-height:34px;
			margin-bottom: 20px;
			.video{
				width:266px;
				height:150px;
				background:rgba(216,216,216,1);
				border-radius:10px;
				margin-right: 20px;
				margin-left: 20px;
				display: inline-block;
			}
			.full{
				width: 100%;
				height: 100%;
				position: fixed;
				:after{
					background-color: black;
				}
			}
			.text{
				text-align: left;
				flex: 1;
				p{
					margin: 10px 0;
				}
			}
		}

	}
</style>
