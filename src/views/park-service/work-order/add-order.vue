<template>
	<div class="report-main">
		<headBar title="新增工单"></headBar>
		<div class="card">
			<van-field
					v-model="id"
					clearable
					label="编号："
					placeholder="请输入编号"
			/>
			<van-field
					v-model="peopleName"
					clearable
					label="人员姓名："
					placeholder="请输入姓名"
			/>
			<van-field
					v-model="phone"
					clearable
					label="联系电话："
					placeholder="请输入联系电话"
			/>
			<van-field
					v-model="startTimeShow"
					clearable
					label="上班考勤时间："
					placeholder=""
					disabled
					@click="showDate=true"
			/>
			<van-field
					v-model="endTimeShow"
					clearable
					label="下班考勤时间："
					placeholder=""
					disabled
					@click="showDate2=true"
			/>
			<div class="btn" @click="addWork">提交</div>
			<van-popup v-model="showDate" position="bottom" :style="{ height: '40%' }">
				<van-datetime-picker
						v-model="startTime"
						type="datetime"
						:formatter="formatter"
						:filter="filter"
						@confirm="confirmFn('start')"
						@cancel="showDate=false"
				/>
			</van-popup>
			<van-popup v-model="showDate2" position="bottom" :style="{ height: '40%' }">
				<van-datetime-picker
						v-model="endTime"
						type="datetime"
						:formatter="formatter"
						:filter="filter"
						@confirm="confirmFn('end')"
						@cancel="showDate2=false"
				/>
			</van-popup>
		</div>
	</div>
</template>


<script>
	import headBar from '@/components/header/head-bar'
	import {addWork} from "@/lib/API/work"
	export default {
		components:{
			headBar,

		},
		data() {
			return {
				showDate:false,
				showDate2:false,
				id:'',
				peopleName:'',
				phone:'',
				startTime: new Date(),
				startTimeShow: '',
				endTimeShow: '',
				endTime: new Date()
			}
		},
		created() {

		},
		methods: {
			async addWork(){
				if(!this.id| !this.peopleName|!this.phone|!this.startTimeShow|!this.endTimeShow) return this.$toast('请填写完整数据')
				let params ={
					id:this.id,
					peopleName:this.peopleName,
					phone:this.phone,
					workAttendTime:this.startTimeShow,
					endTimeShow:this.endTimeShow,
				}
				let res = await addWork(params)
				if(res.code === 200){
					this.$toast('添加成功')
					this.$router.back()
				}else {
					this.$toast(res.message)
				}
			},
			//格式化时间
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				} else if (type === 'month') {
					return `${value}月`
				}else if (type === 'day') {
					return `${value}日`
				}else if (type === 'hour') {
					return `${value}时`
				}else if (type === 'minute') {
					return `${value}分`
				}
				return value;
			},
			//过滤时间
			filter(type, options) {
				if (type === 'hour') {
					return options.filter(option => (option >= 8 && option < 20 && option != 12&&option != 13))
				}
				return options;
			},
			// 格式化获取的时间
			formatDate(date) {
				const y = date.getFullYear()
				let M = date.getMonth() + 1
				M = M < 10 ? '0' + M : M
				let d = date.getDate()
				d = d < 10 ? ('0' + d) : d
				let h = date.getHours()
				h = h < 10 ? ('0' + h) : h
				let m = date.getMinutes()
				m = m < 10 ? ('0' + m) : m
				this.showTime = M + '月' + d + '日  ' + h + ':' + m
				return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':'+'00'
			},
			confirmFn(params) { // 确定按钮
				if(params==='start'){
					setTimeout(()=>{
						this.startTimeShow = this.formatDate(this.startTime)
						this.showDate = false;
					},100)
				}else {
					setTimeout(()=>{
						this.endTimeShow = this.formatDate(this.endTime)
						this.showDate2 = false;
					},100)
				}
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
			margin: 250px auto 0;
		}
	}
</style>
