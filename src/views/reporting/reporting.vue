<template>
	<div class="report-main">
		<headBar title="数据填报"></headBar>
		<div class="card">
			<van-field
					v-model="enterpriseId"
					label="企业ID："
					disabled
			/>
			<van-field @click="show=true"
			           v-model="timeValue"
			           clearable
			           label="数据年月："
			           disabled
			/>
			<van-field
					v-model="enterpriseEnergyConsumptionData"
					clearable
					type="number"
					label="企业能耗数据："
					placeholder=""
			/>
			<van-field
					v-model="enterpriseCapacityData"
					clearable
					type="number"
					label="企业产能数据："
					placeholder=""
			/>
			<van-field
					v-model="enterpriseMajorHazardData"
					clearable
					type="number"
					label="重大危险源："
					placeholder=""
			/>
			<div class="text">
				<p>企业废水/固定数据等：</p>
				<van-field
						v-model="enterpriseWasteWaterData"
						rows="5"
						type="number"
				/>
			</div>
			<div class="btn" @click="addReport">提交</div>
		</div>
		<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
			<van-datetime-picker
					v-model="currentDate"
					type="year-month"
					:min-date="minDate"
					:formatter="formatter"
					@confirm="confirmFn()"
					@cancel="show=false"
			/>
		</van-popup>
	</div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import {addReport,} from "@/lib/API/entDataReport"
	export default {
		components:{
			headBar
		},
		data() {
			return {
				year:null,
				month:null,
				timeValue:'',
				show:false,
				currentDate: new Date(),
				minDate:new Date(2000, 1, 1),
				enterpriseId:'',
				enterpriseEnergyConsumptionData:'',
				enterpriseCapacityData:'',
				enterpriseWasteWaterData:'',
				enterpriseMajorHazardData:'',

			}
		},
		created() {
			this.enterpriseId = localStorage.getItem('enterpriseId')
		},
		methods: {
			async addReport(){
				if(!this.enterpriseEnergyConsumptionData||!this.enterpriseCapacityData||!this.enterpriseWasteWaterData||!this.enterpriseMajorHazardData) return this.$toast('请填入数据')
				let params ={
					enterpriseId:this.enterpriseId,
					enterpriseEnergyConsumptionData:this.enterpriseEnergyConsumptionData,
					enterpriseCapacityData:this.enterpriseCapacityData,
					enterpriseWasteWaterData:this.enterpriseWasteWaterData,
					enterpriseMajorHazardData:this.enterpriseMajorHazardData,
					month:this.month,
					year:this.year,
				}
				let res = await addReport(params)
				if(res.code === 200){
					this.$toast('添加成功')
					this.$router.back()
				}else {
					this.$toast(res.message)
				}
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				} else if (type === 'month') {
					return `${value}月`
				}
				return value;
			},
			confirmFn() {
				setTimeout(()=>{
					this.timeValue = this.timeFormat(this.currentDate)
					this.show = false
				},100)
			},
			timeFormat(time) { // 时间格式化 2019-09-08
				let year = time.getFullYear()
				let month = time.getMonth() + 1
				let day = time.getDate()
				this.year = year
				this.month = month
				return year + '年' + month + '月'
			},
		}
	}
</script>


<style scoped>
	.report-main>>>.van-cell{
		margin-top: 20px;
		display: flex;
		align-items: center;
	}
	.report-main>>>.van-cell:not(:last-child)::after{
		border: none;
	}
	.report-main>>>.van-field__label{
		flex: 1;
	}
	.report-main>>>.van-cell__value{
		width:414px;
		height:60px;
		line-height: 60px;
		background:rgba(250,250,250,1);
		border-radius:10px;
		border:2px solid rgba(245,245,245,1);
		padding-left: 15px;
		flex: 2;
	}
	.text>>>.van-cell__value{
		height:100px;
		background:rgba(250,250,250,1);
		border-radius:10px;
		border:2px solid rgba(236,236,237,1);
	}
</style>
<style lang="less" scoped>
	.report-main{
		text-align: center;
		.card{
			width:91%;
			height:1118px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 8px 0px rgba(0,0,0,0.11);
			border-radius:10px;
			position: fixed;
			top: 150px;
			left: 34px;
			z-index: 10;
		}
		.text{
			text-align: left;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:40px;
			margin-top: 50px;
			p{
				padding-left: 40px;
			}

		}
		.btn{
			width:91%;
			height:88px;
			background:rgba(0,111,255,1);
			border-radius:44px;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:88px;
			margin: 60px auto 0;
		}
	}
</style>
