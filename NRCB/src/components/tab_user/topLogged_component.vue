<template>
	<div class="container" :style="{backgroundColor:backgroundColor}">
		<image class="finance-bg-img" src="./imgs/tab_user/homepage/bg/my_tit_bg2.png" />
		<div class="wrapper" v-for="(item,key) in financeData" :key="key">

			<div class="banker-title" @click="clickInfo">
				<div class="banker-title-img">
					<div class="user">
						<image class="finance-img" :src="item.src" />
						<div class="banker-center">
							<text class="text">{{userName}}{{item.column}}</text>
							<div class="user-middle">
								<text class="tex">{{item.puton}}</text>
							</div>
						</div>	
					</div>
					<!-- <text class="te">{{item.clone}}</text> -->
				</div>
			</div>

            <div>
				            <menu></menu>
			</div>

		</div>
	</div>
</template>

<style scoped>
	.container {
        width: 750px;
		height: 304px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* margin-top: 120px; */
	}
	
	.wrapper {
        width: 750px;
		height: 304px;
		flex-direction: column;
		/* align-items: center; */
		justify-content: space-between;
		align-items: left;
	}
	
	.banker-title {
		/* padding-top: -3px; */
	}
	
	.finance-bg-img {
		width: 750px;
		height: 304px;
		position: absolute;
		top: 0px;
		left: 0px;
	}
	
	.finance-img {
		margin-left: 66px;
		width: 96px;
		height: 96px;
	}
	
	.banker-title-img {
		text-align: left;
	}
	
	.user {
		margin-top: 50px;
		/* margin-left: 40px; */
		flex-direction: row;
		text-align: left;
		align-items: center;
	}
	
	.user-middle {
		margin-left: 20px;
		flex-direction: row;
		margin-top: 22px;
	}
	
	.finance-image {
		width: 17px;
		height: 31px;
		margin-left: 170px;
		margin-top: 54px;
	}
	
	.text {
		color: white;
		font-size: 32px;
		margin-left: 20px;
	}
	
	.tex {
		color: white;
        font-size: 24px;
       
	}
	
	.te {
		color: white;
		font-size: 23px;
		margin-top: -10px;
		margin-left: 159px;
	}
</style>
<script>
    import Menu from "@/components/tab_user/menu_component.vue";
	//理财类型： hot、black、presale 、setUp、soldOut
	const stream = weex.requireModule("stream");
	const context = weex.requireModule("context");
	const modal = weex.requireModule("modal");
	export default {
        components: {
			  	Menu
  		},
		props: {
			finance: {
				type: String,
				default: "tab_user/finance.json"
			}
		},
		created() {
			this.getData();
			this.userName = context.secureGetString('userName');
			this.getTime();
			

			
		},
		data() {
			return {
				backgroundColor: "#F8F8F8",
                financeData: [],
				// finance: "tab_user/finance.json"
				userName:"",
				time:""
				
			};
		},
		methods: {
			clickInfo() {
				modal.alert({
					message: "点击这里更改头像",
					duration: 3
				});
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
			},

		
			
		},
		watch: {
			finance() {
				this.getData();
			}
		}
	};
</script>