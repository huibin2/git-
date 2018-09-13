<template>
	<div class="container" :style="{backgroundColor:backgroundColor}">
		<div class="wrapper" v-for="(item,key) in financeData" :key="key">
			<div class="banker-botto" @click="goto('main.wealthOverView')">
				<div class="banker-botto-div">
					<text class="title">{{item.total}}</text>
					<image class="loga" :src="item.node" />
				</div>
				<image class="logal" :src="item.mode" />
			</div>
			<div class="banker">
				<div class="banker-center">
					<div class="banker-center-left">
						<image class="finance-img" :src="item.src" />
						<text class="banker-cente-left">{{item.left}}</text>
					</div>
					<div class="banker-center-right">
						<image class="finance-im" :src="item.logo" />
						<text class="banker-cente-right">{{item.right}}</text>
					</div>
				</div>
				<div class="banker-bottom">
					<div class="banker-center-left">
						<text class="banker-cente-lef">{{item.lef}}</text>
					</div>
					<div class="banker-center-right">
						<text class="banker-cente-righ">{{item.righ}}</text>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.container {
		width: 750px;
		height: 230px;
		margin-top: 15px;
	}
	
	.wrapper {
		width: 750px;
		position: relative;
		margin-top: 15px;
	}
	
	.banker-botto {
		height: 100px;
		flex-direction: row;
		justify-content: space-between;
		background-color: #ffffff;
		margin-bottom: 3px;
	}
	
	.banker-botto-div {
		flex-direction: row;
	}
	
	.title {
		font-size: 28px;
		margin-top: 40px;
		margin-left: 20px;
		color: #404561;
	}
	
	.logal {
		width: 13.8px;
		height: 25.2px;
		margin-right: 30px;
		margin-top: 40px;
	}
	
	.loga {
		width: 34px;
		height: 20px;
		margin-left: 40px;
		margin-top: 45px;
	}
	
	.finance-img {
		width: 30px;
		height: 30px;
		margin-left: 20px;
		position: relative;
		margin-top: 10px;
	}
	
	.finance-im {
		width: 30px;
		height: 30px;
		margin-left: 180px;
		position: relative;
		margin-top: 10px;
	}
	
	.banker-center {
		flex-direction: row;
		margin-top: -30px;
		/* height:152px; */
		/* background-color: #FFFFFF; */
	}
	
	.banker-bottom {
		flex-direction: row;
		margin-top: -33px;
	}
	
	.banker-center-left {
		flex-direction: row;
		margin-top: 40px;
		margin-left: 30px;
	}
	
	.banker-cente-left {
		font-size: 24px;
		color: #848996;
		margin-top: 10px;
		margin-left: 20px;
	}
	
	.banker-cente-lef {
		font-size: 28px;
		margin-left: 68.5px;
		font-weight: bold;
	}
	
	.banker-center-right {
		flex-direction: row;
		margin-top: 40px;
	}
	
	.banker-cente-right {
		flex-direction: row;
		font-size: 24px;
		color: #848996;
		margin-top: 10px;
		margin-left: 20px;
	}
	
	.banker-cente-righ {
		flex-direction: row;
		font-size: 28px;
		margin-left: 165.5px;
		font-weight: bold;
	}
	
	.banker {
		background-color: #ffffff;
		height: 152px;
	}
</style>
<script>
	//理财类型： hot、black、presale 、setUp、soldOut
	const stream = weex.requireModule("stream");
	const context = weex.requireModule("context");
	export default {
		props: {
			finance: {
				type: String,
				default: "tab_user/homepage.json"
			}
		},
		created() {
			this.getData();
		},
		data() {
			return {
				backgroundColor: "#F8F8F8",
				financeData: []
			};
		},
		methods: {
			goto(id) {
				context.launchStage(id);
			},
			getData() {
				if(this.finance) {
					stream.fetch({
							method: "GET",
							url: "./json/" + this.finance,
							type: "json"
						},
						res => {
							this.financeData = res.data.data;
						}
					);
				}
			}
		},
		watch: {
			finance() {
				this.getData();
			}
		}
	};
</script>