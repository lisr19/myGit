<template>
	<div class="main">
		<div class="title">{{title}}</div>
		<div id="chart1" ref="myChart" style="width:100%;height:376px"></div>
	</div>
</template>


<script>
	export default {
		props: ['chartData','title'],
		data() {
			return {}
		},
		created() {
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
						type: 'line',
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
