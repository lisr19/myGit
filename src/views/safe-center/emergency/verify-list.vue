<template>
	<div class="main">
		<headBar title="资源审核" :size="true"></headBar>
		<!--<div class="card">-->
			<!--<ul class="nav">-->
				<!--<li :class="{active:currIndex===index}" v-for="(item,index) in typeList" @click="tagType(index)">-->
					<!--<p>{{item.name}}</p>-->
				<!--</li>-->
			<!--</ul>-->
		<!--</div>-->
		<template v-if="currIndex===0">
			<ul class="verify-items">
				<li class="item" v-for="item in taskList" @click="openDeatil(item)">
					<div class="img-wrap">
						<img :src="item.url" alt="">
						<div>
							<p class="name">{{item.name}}</p>
							<p class="type">{{item.unit}}</p>
						</div>
					</div>
					<div class="stage">
						<span v-if="item.status===0">未审核</span>
						<span v-if="item.status===1" style="color: #FF0000">审核未通过</span>
						<span v-if="item.status===2" style="color: #00B140">审核通过</span>
						<van-icon name="arrow" color="#D8D8D8" size="20px"/>
					</div>
				</li>
			</ul>
		</template>
		<template v-if="currIndex===1">
			<ul class="verify-items">
				<li class="item" v-for="item in taskList" @click="openDeatil(item)">
					<div class="img-wrap">
						<div>
							<p class="name">名称：{{item.name}}</p>
							<p class="type">类型：{{item.type}}</p>
							<p class="type">数量：{{item.number}}</p>
						</div>
					</div>
					<div class="stage">
						<span v-if="parseInt(item.isReview)===0">未审核</span>
						<span v-if="parseInt(item.isReview)===1" style="color: #FF0000">审核未通过</span>
						<span v-if="parseInt(item.isReview)===2" style="color: #00B140">审核通过</span>
						<van-icon name="arrow" color="#D8D8D8" size="20px"/>
					</div>
				</li>
			</ul>
		</template>
		<template v-if="currIndex===2">
		<ul class="verify-items">
			<li class="item" v-for="item in taskList" @click="openDeatil(item)">
				<div class="img-wrap">
					<div>
						<p class="name">名字：{{item.name}}</p>
						<p class="type">电话：{{item.phone}}</p>
						<p class="type">单位：{{item.unit}}</p>
					</div>
				</div>
				<div class="stage">
					<span v-if="parseInt(item.status)===0">未审核</span>
					<span v-if="parseInt(item.status)===1" style="color: #FF0000">审核未通过</span>
					<span v-if="parseInt(item.status)===2" style="color: #00B140">审核通过</span>
					<van-icon name="arrow" color="#D8D8D8" size="20px"/>
				</div>
			</li>
		</ul>
	</template>
		<template v-if="currIndex===3">
			<ul class="verify-items">
				<li class="item" v-for="item in taskList" @click="openDeatil(item)">
					<div class="img-wrap">
						<div>
							<p class="name">名称：{{item.name}}</p>
							<p class="type">编号：{{item.number}}</p>
							<p class="type">地址：{{item.address}}</p>
						</div>
					</div>
					<div class="stage">
						<span v-if="parseInt(item.isReview)===0">未审核</span>
						<span v-if="parseInt(item.isReview)===1" style="color: #FF0000">审核未通过</span>
						<span v-if="parseInt(item.isReview)===2" style="color: #00B140">审核通过</span>
						<van-icon name="arrow" color="#D8D8D8" size="20px"/>
					</div>
				</li>
			</ul>
		</template>
	</div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import {getProdList,getSuppList,getPersonList,getPlaceList} from "@/lib/API/save-center"
	export default {
		components:{
			headBar,
		},
		data() {
			return {
				currIndex:0,
				typeList:[
					{
						name:'安全生产',
					},
					{
						name:'应急物资',
					},
					{
						name:'应急人员',
					},
					{
						name:'应急场所',
					},
				],
				taskList:[]
			}
		},
		created() {
			this.getProdList()
		},
		methods: {
			tagType(index){
				this.currIndex =index
				if(index===0){
					this.getProdList()
				}else if(index===1){
					this.getSuppList()
				}else if(index===2){
					this.getPersonList()
				}else if(index===3){
					this.getPlaceList()
				}
			},
			openDeatil(item){
				this.$router.push({name:'审核详情',query:{itemData:item}})
			},
			//安全生产
			async getProdList(params){
				let res = await getProdList(params)
				if(res.code === 200){
					this.taskList = res.data.list
				}else {
					this.$toast(res.message)
				}
			},
			//应急物资
			async getSuppList(params){
				let res = await getSuppList(params)
				if(res.code === 200){
					this.taskList = res.data.list
				}else {
					this.$toast(res.message)
				}
			},
			//应急人员
			async getPersonList(params){
				let res = await getPersonList(params)
				if(res.code === 200){
					this.taskList = res.data.list
				}else {
					this.$toast(res.message)
				}
			},
			//应急场所
			async getPlaceList(params){
				let res = await getPlaceList(params)
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
	.main{
		padding-top: 100px;
		.card{
			width:91%;
			height:126px;
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
				padding: 0 24px;
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:34px;
				li{
					margin-top: 10px;
					p{
						margin-bottom: 10px;
					}
				}
				li.active{
					font-weight:500;
					color:rgba(67,140,255,1);
					border-bottom: solid 8px #438CFF;
					border-radius: 4px;
				}
			}
		}
	}
	.verify-items{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
		margin: 0 25px;
		.item{
			height: 164px;
			border-bottom: 2px solid #E4E4E4;
			width: 100%;
			text-align: left;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.img-wrap{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			img{
				width:176px;
				height:120px;
				background:rgba(216,216,216,1);
				border-radius:10px;
				margin-right: 20px;
				margin-left: 20px;
				display: block;
			}
			.name{
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:40px;
				margin-bottom: 14px;
			}
			.type{
				font-size:28px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:40px;
			}
			.stage{
				font-size:24px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(255,152,0,1);
				line-height:34px;
				display: flex;
				align-items: center;
				justify-content: center;
				span{
					margin-right: 20px;
				}
			}
		}
	}
</style>
