<template>
	<div class="main">
		<headBar title="监控查看" :size="true"></headBar>
		<div class="box">
			<!--<div class="desc">-->
				<!--<p>{{itemData.enterpriseName}}</p>-->
				<!--<p>{{itemData.number}}</p>-->
			<!--</div>-->
			<video class="video" autoplay loop :src="itemData.url"></video>
		</div>
	</div>
</template>


<script>
	import headBar from '@/components/header/head-bar'

	export default {
		components: {
			headBar
		},
		data() {
			return {
				itemData:{}
			}
		},
		created() {
			this.itemData=this.$route.query.itemData
			console.log(this.itemData);
		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.main{
		.box{
			margin-top: 450px;
			.video{
				width: 100%;
				height: 100%;
			}
		}
	}

</style>
