<template>
	<div class="main">
		<div class="title">{{title}}</div>
		<div id="chart1" ref="myChart" style="width:100%;height:376px"></div>
	</div>
</template>


<script>
	// import {getEntDate,} from "@/lib/API/entDataReport"
	export default {
		props: ['chartData','title'],
		data() {
			return {}
		},
		created() {
			// this.chartShow()
			// this.enterpriseId = localStorage.getItem('enterpriseId')
			// this.getEntDate({enterpriseId:this.enterpriseId})

		},
		mounted(){
			setTimeout(()=>{
				this.chartShow()
			},500)

		},
		updated(){
			this.chartShow()
		},
		methods: {
			chartShow() {
				let myChart = this.$echarts.init(this.$refs.myChart)
				// 绘制图表
				myChart.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					xAxis: [
						{
							type: 'category',
							name: '月',
							data: [1,2,3,4,5,6,7,8,9,10,11,12],
						}
					],
					yAxis: {},
					series: {
						type: 'bar',
						data: this.chartData,
						label:{
							show:true,
							position:'top',
							color:'#AFBDD1'
						},
						itemStyle: {
							normal: {
								color: '#43bdff'
							}
						}
					}
				})
			},
			//获取数据信息
			// async getEntDate(params){
			// 	let res = await getEntDate(params)
			// 	if(res.code === 200){
			// 		let entData = res.data.list
			// 		entData.forEach((item)=>{
			// 			this.cnData.push(item.enterpriseCapacityData)
			// 		})
			// 		this.cnData =this.cnData.map(Number)
			// 		console.log(this.cnData);
			// 		this.chartShow()
			// 	}
			// },
		}
	}
</script>

<style lang="less" scoped>
	.main{
		text-align: left!important;
		.title{
			font-size: 28px;
			padding-left: 40px;
			margin-top: 60px;
		}
		#chart1{
			margin-top: -20px;
		}
	}
</style>
