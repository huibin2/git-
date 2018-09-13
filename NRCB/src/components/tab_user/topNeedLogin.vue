<template>
	<div class="container" :style="{backgroundColor:backgroundColor}">
		<image class="finance-bg-img" src="./imgs/tab_user/homepage/bg/my_tit_bg2.png" />
		<div class="wrapper">
			
			<div class="user" @click="goto('main.login')">
				<image class="finance-img" :src="imageUrl" />
				<text class="text">请您登录</text>
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
		/* flex-direction: row;
		align-items: center;
		justify-content: center; */
		/* margin-top: 120px; */
	}
	
	.wrapper {
		width: 750px;
		height: 304px;
		flex-direction: column;
		align-items: flex-start;
		/* justify-content: space-between; */
		align-items: left;
	}
	
	/* .banker-title {
		padding-top: -3px;
	} */
	
	.finance-bg-img {
		width: 750px;
		height: 304px;
		position: absolute;
		/* top: 0px;
		left: 0px; */
	}
	
	.finance-img {
		
		margin-left: 66px;
		width: 96px;
		height: 96px;
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
		margin-left: 66px;
		/* margin-top: 54px; */
	}
	
	.text {
		color: white;
		font-size: 32px;
		margin-left: 20px;
	}
	
	.tex {
		color: white;
		font-size: 23px;
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
	const fingerprint = weex.requireModule("fingerprint");
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
			this.isFinger();
			
		},
		data() {
			return {
				backgroundColor: "#F8F8F8",
				financeData: [],
				imageUrl: this.$store.state.imgBaseUrl + "/tab_user/homepage/tx.png",
				token:[],
				userName:"",
				FingerFlag:"",
				GrapFlag:"",
				HumanFaceFlag:"",
				fingerData:false,

			};
		},
		methods: {
			goto(id) {
				// modal.alert({
				// 	message: "点击这里跳转登录页",
				// 	duration: 3
				// });
				this.userName = context.secureGetString('userName');
				
				if (this.userName) {
					this.loginMethod();
					
				} else {
					context.launchStage(id);
				}		
			},

			// 非首次登录判断其登录方式
			loginMethod(){
				
				this.FingerFlag = context.secureGetString('FingerFlag');// 指纹登录			  
                this.GrapFlag = context.secureGetString('GrapFlag');         // 手势登录
				this.HumanFaceFlag = context.secureGetString('HumanFaceFlag');// 刷脸登录
				

				if (this.FingerFlag == "Y" && this.fingerData) {
					context.launchStage("main.fingerprint");
				}else if (this.GrapFlag == "Y") {
					context.launchStage("main.gesture");
				}else if (this.HumanFaceFlag == "Y"){
					context.launchStage("main.face");
				}else{
					context.launchStage("main.noFirstLogin");
				}
			},

			getData() {
				fingerprint.isHardwareEnable(
					res => {
						context.sessionSetString("isFingerProvided",res);
					}
				);
				if(this.finance) {
					// this.alertMsg(this.$store.state.isFingerProvided);
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

			isFinger(){
				fingerprint.isHardwareEnable(res=>{
					if(res=="1"){
						this.fingerData = true;
					}
					
					context.SessionSetString("isFingerProvided",res);
				});
								
			}


		},
			
		watch: {
			finance() {
				this.getData();
			}
		}
	};
</script>