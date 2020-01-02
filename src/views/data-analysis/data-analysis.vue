<template>
  <div class=" main">
	  <headBar title="数据分析"></headBar>
	  <div class="card">
		  <ul class="nav">
			  <li :class="{active:currIndex===index}" v-for="(item,index) in typeList" @click="tagType(index)">
				  <p>{{item.name}}</p>
			  </li>
		  </ul>
	  </div>
	  <div class="content">
		  <div class="chart-type">
			  <van-dropdown-menu>
				  <van-dropdown-item v-model="value1" :options="option1"  @change="changeType"/>
				  <van-dropdown-item v-model="value2" :options="option2" @change="changeYear"/>
			  </van-dropdown-menu>
			  <!--<Select clearable filterable v-model="enterName" placeholder="请输入企业名称" remote-->
			          <!--:remote-method="v=>{remoteMethod(v,'edit')}" :loading="loading"  @on-change="nameSelect">-->
				  <!--<Option v-for="(option, index) in enterList" :value="option.id" :key="index">{{option.name}}</Option>-->
			  <!--</Select>-->
		  </div>
		  <template v-if="value1===0">
			  <chartOne v-if="currIndex===0&&flag" :chartData="cnData" :title="value2+'产能'"></chartOne>
			  <chartOne v-if="currIndex===1&&flag" :chartData="nhData" :title="value2+'能耗'"></chartOne>
			  <chartOne v-if="currIndex===2&&flag" :chartData="pfData" :title="value2+'排放'"></chartOne>
			  <chartOne v-if="currIndex===3&&flag" :chartData="wxyData" :title="value2+'重大危险源'"></chartOne>
		  </template>
		  <template v-if="value1===1">
			  <chartTwo v-if="currIndex===0&&flag" :chartData="cnData" :title="value2+'产能'"></chartTwo>
			  <chartTwo v-if="currIndex===1&&flag" :chartData="nhData" :title="value2+'能耗'"></chartTwo>
			  <chartTwo v-if="currIndex===2&&flag" :chartData="pfData" :title="value2+'排放'"></chartTwo>
			  <chartTwo v-if="currIndex===3&&flag" :chartData="wxyData" :title="value2+'重大危险源'"></chartTwo>
		  </template>
		  <template v-if="value1===2">
			  <chartThree v-if="currIndex===0&&flag" :chartData="cnData" :title="value2+'产能'"></chartThree>
			  <chartThree v-if="currIndex===1&&flag" :chartData="nhData" :title="value2+'能耗'"></chartThree>
			  <chartThree v-if="currIndex===2&&flag" :chartData="pfData" :title="value2+'排放'"></chartThree>
			  <chartThree v-if="currIndex===3&&flag" :chartData="wxyData" :title="value2+'重大危险源'"></chartThree>
		  </template>
	  </div>
  </div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import chartOne from '@/views/data-analysis/chart-one'
	import chartTwo from '@/views/data-analysis/chart-two'
	import chartThree from '@/views/data-analysis/chart-three'
	import {getEntDate} from "@/lib/API/entDataReport"
	import {getEnterpriseList} from "@/lib/API/comment"
	export default {
		components:{
			headBar,
			chartOne,
			chartTwo,
			chartThree
		},
		data() {
			return {
				enterName:'',
				enterList:[],
				loading:false,
				flag:false,
				value1: 0,
				value2: '2019',
				value3: '',
				option1: [
					{ text: '柱状图', value: 0 },
					{ text: '折线图', value: 1 },
					{ text: '饼图', value: 2 },
				],
				option2: [
					{ text: '2019', value: '2019' },
					{ text: '2018', value: '2018' },
					{ text: '2017', value: '2017' },
					{ text: '2016', value: '2016' },
					{ text: '2015', value: '2015' },
				],
				currIndex:0,
				typeList:[
					{
						name:'产能数据',
					},
					{
						name:'能耗数据',
					},
					{
						name:'排放数据',
					},
					{
						name:'在重大危险源',
					},
				],
				cnData: [0,0,0,0,0,0,0,0,0,0,0,0],//产能数据
				nhData: [0,0,0,0,0,0,0,0,0,0,0,0], //能耗数据
				pfData: [0,0,0,0,0,0,0,0,0,0,0,0], //排放数据
				wxyData: [0,0,0,0,0,0,0,0,0,0,0,0], //危险源数据
			}
		},
		created() {
			this.enterpriseId=localStorage.getItem('enterpriseId')
			this.getEntDate({year:this.value2,enterpriseId:this.enterpriseId})
		},
		methods: {
			nameSelect(id){
				this.flag = false
				this.cnData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.nhData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.pfData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.wxyData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.getEntDate({year:this.value2,enterpriseId:id?id:this.enterpriseId})
			},
			remoteMethod (query) {
				console.log(query);
				if (query !== '') {
					let params = {
						name: query
					}
					setTimeout(async () => {
						let res = await getEnterpriseList(params)
						if (res.code === 200) {
							this.enterList = res.data.list
						}
					}, 500)
				} else {
					this.enterList = []
				}
			},
			changeYear(){
				this.flag = false
				this.cnData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.nhData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.pfData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.wxyData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.getEntDate({year:this.value2,enterpriseId:this.enterpriseId})
			},
			changeType(){
				this.flag = false
				this.cnData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.nhData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.pfData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.wxyData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.getEntDate({year:this.value2,enterpriseId:this.enterpriseId})
			},
			tagType(index){
				this.currIndex =index
				this.flag = false
				this.cnData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.nhData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.pfData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.wxyData =  [0,0,0,0,0,0,0,0,0,0,0,0]
				this.getEntDate({year:this.value2,enterpriseId:this.enterpriseId})
			},
			//获取数据信息
			async getEntDate(params){
				let res = await getEntDate(params)
				if(res.code === 200){
					let entData = res.data.list
					entData.forEach((item)=>{
						if(this.value1===2){
							this.cnData.push({
								value:item.enterpriseCapacityData?item.enterpriseCapacityData:0,
								name:item.month+'月'
							})
							this.nhData.push({
								value:item.enterpriseEnergyConsumptionData?item.enterpriseEnergyConsumptionData:0,
								name:item.month+'月'
							})
							this.pfData.push({
								value:item.enterpriseWasteWaterData?item.enterpriseWasteWaterData:0,
								name:item.month+'月'
							})
							this.wxyData.push({
								value:item.enterpriseMajorHazardData?item.enterpriseMajorHazardData:0,
								name:item.month+'月'
							})
						}else {
							this.cnData.splice(item.month - 1,1,parseInt(item.enterpriseCapacityData))
							this.nhData.splice(item.month - 1,1,parseInt(item.enterpriseEnergyConsumptionData))
							this.pfData.splice(item.month - 1,1,parseInt(item.enterpriseWasteWaterData))
							this.wxyData.splice(item.month - 1,1,parseInt(item.enterpriseMajorHazardData))
							//
							// this.nhData.push(item.enterpriseEnergyConsumptionData)
							// this.pfData.push(item.enterpriseWasteWaterData)
							// this.wxyData.push(item.enterpriseMajorHazardData)
						}
					})
					this.flag = true
				}
			},
		}
	}
</script>

<style scoped>
	.chart-type>>>.van-dropdown-menu{
		height: 60px;
		background: none;
		width: 58%;
		padding-left: 40px;
	}
	.chart-type>>>.van-dropdown-menu__item{
		width:180px;
		height:52px;
		background:rgba(255,255,255,1);
		border-radius:10px;
		border:2px solid rgba(232,232,232,1);
		box-sizing: border-box;
		margin-right: 40px;
		display: flex;
		justify-content: flex-start;
	}
	.chart-type>>>.ivu-select-selection{
		height:52px;
		width:250px;
		background:rgba(255,255,255,1);
		border-radius:10px;
		border:2px solid rgba(232,232,232,1);
	}
	.chart-type>>>.ivu-select-single .ivu-select-input{
		height:52px;
		width:250px;
		background:rgba(255,255,255,1);
		border-radius:10px;
		border:2px solid rgba(232,232,232,1);
	}
	.chart-type>>>.ivu-select-dropdown{
		width: 100%;
		left: 0;
		min-height: 380px;
		overflow: auto;
	}
	.chart-type>>>.ivu-select-item{
		padding: 20px 0;
		font-size: 26px!important;
	}
</style>
<style lang="less" scoped>
	.main{
		text-align: center;
		.chart-type{
			display: flex;
		}
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
				img{
					width: 82px;
					margin-bottom: 10px;
				}
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
		.content{
			padding-top:350px;
		}

	}
</style>
