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
			return {
				xData:[]
			}
		},
		created() {
			this.chartData.forEach((item)=>{
				this.xData.push(item.name)
			})
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
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} 占比({d}%)"
					},
					grid: {
						left: '0',
						right: '0',
						bottom: '0',
						containLabel: true
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data:this.xData
					},
					series: [
						{
							name: this.title,
							type: 'pie',
							radius: ['45%', '65%'],
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '14',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: this.chartData
						},

					]
					// series: {
					// 	radius: ['50%', '70%'],
					// 	avoidLabelOverlap: false,
					// 	data: this.chartData,
					// 	type:'pie',
					// }
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.main{
		.title{
			font-size: 28px;
			padding-left: 40px;
			margin-top: 60px;
		}
		#chart1{
			margin-top: 40px;
		}
	}
</style>
