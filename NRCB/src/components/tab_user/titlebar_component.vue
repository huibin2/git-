<template>
	<div class="header" :style="{backgroundColor:bgcolor}">

		<div class="title-left">
			<div v-if="leftElement.exist">
				<div class="imgDiv" v-if="leftElement.head.exist">
					<image class="codeImg" :src="leftElement.head.src" @click="goto(leftElement.head.url)" />
				</div>
				<div class="backDiv" v-if="leftElement.back.exist" @click="goBack">
					<image class="backImg" :src="leftElement.back.src" />
				</div>
				<div class="imgDiv" v-if="leftElement.qrcode.exist">
					<image class="qrImg" :src="leftElement.qrcode.src" @click="goto(leftElement.qrcode.url)" />
				</div>
			</div>
		</div>
		<div class="title-box">
			<div v-if="centerElement.exist">
				<div class="title-text-box" v-if="centerElement.title.exist">
					<text class="title">{{centerElement.title.text}}</text>
				</div>
				<div class="logo-box" v-if="centerElement.logo.exist">
					<image class="logo" :src="centerElement.logo.src" />
				</div>
			</div>
		</div>
		<div class="title-right">
			<div v-if="rightElement.exist">
				<!--<div class="imgDiv" v-if="centerElement.logo.exist">
					<image class="qrImg" :src="rightElement.login.src" @click="goto(rightElement.login.url)"></image>
				</div>-->
				<div class="title-text-box" v-if="this.$store.state.login" @click="logout">
					<text class="title-rigth">{{rightElement.titl.text}}</text>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		height: 120px;
		width: 750px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.bgclass {
		position: absolute;
		/* width: 1080px;
  height: 116px; */
		width: 750px;
		height: 100px;
	}
	
	.title-left {
		flex: 1;
		position: relative;
	}
	
	.imgDiv {
		height: 100px;
		width: 80px;
		justify-content: center;
		/* align-items: center; */
	}
	
	.backDiv {
		height: 100px;
		flex-direction: row;
		/* justify-content: center; */
		align-items: center;
	}
	
	.backImg {
		width: 46px;
		height: 46px;
	}
	
	.back-text {
		font-size: 34px;
		color: #00b9f4;
	}
	
	.qrImg {
		width: 50px;
		height: 50px;
	}
	
	.title-box {
		flex: 2;
		margin-top: 40px;
	}
	
	.title {
		font-size: 36px;
		color: #000000;
		text-align: center;
		font-weight: bolder 2px;
	}
	
	.title-rigth {
		font-size: 30px;
		color: #000000;
		text-align: center;
		font-weight: bolder 2px;
	}
	
	.logo-box {
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	
	.logo {
		/* width: 337px;
  height: 73px; */
		width: 277px;
		height: 60px;
	}
	
	.title-right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		margin-top: 40px;
	}
	
	.rightDiv {
		height: 100px;
		width: 80px;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	
	.codeImg {
		width: 62px;
		height: 62px;
	}
</style>
<script>
	const context = weex.requireModule("context");
	const stream = weex.requireModule("stream");
	export default {
		props: {
			titleJson: {
				default: "tab_user/titlebar.json"
			}
		},
		data() {
			return {
				leftElement: {
					login: "",
					exist: false,
					back: {
						exist: false,
						src: "./imgs/tab_user/titlebar/back.png",
						url: ""
					},
					head: {
						exist: true,
						src: "./imgs/tab_user/titlebar/head.png",
						url: ""
					},
					qrcode: {
						exist: false,
						src: "./imgs/tab_user/titlebar/qrcode.png",
						url: ""
					}
				},
				centerElement: {
					exist: true,
					title: {
						exist: true,
						text: "我的"
					},
					logo: {
						exist: false,
						src: "./imgs/tab_user/titlebar/logo.png",
						url: ""
					}
				},
				rightElement: {
					exist: true,
					login: {
						exist: false,
						src: "./imgs/tab_user/titlebar/login@3x.png",
						url: ""
					},
					titl: {
						exist: true,
						text: "安全退出"
					},
				},
				bgcolor: "#ffffff"
			};
		},
		created() {
			this.getData();
		},
//		mounted() {
//			this.login = context.sessionSetString("isLogin");
//		},
		methods: {
			getData() {
				stream.fetch({
						method: "GET",
						url: "./json/" + this.titleJson,
						type: "json"
					},
					res => {
						this.title = res.data.data.title;
						this.bgcolor = res.data.data.bgcolor;
						this.leftElement = res.data.data.leftElement;
						this.centerElement = res.data.data.centerElement;
						this.rightElement = res.data.data.rightElement;
					}
				);
			},
			logout(){
				this.$store.state.login=false;
				context.clearToken()
				context.sessionSetString("isLogin",'false')
				// const params={
					
				// }
				// this.postDo("logout.do",params,data =>{
				// 	this.$store.state.login=false;
				// 	context.sessionSetString("isLogin",'false')
				// });
			}
		}
	};
</script>