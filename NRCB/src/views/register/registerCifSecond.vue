<template>
   <scroller class="home">
	   
    <title class="titlebar" titleJson="register/titlebar.json"></title>
	<div class="all"> 
		<div class="up" style="margin-top: 30px;"><text class="tip">请仔细核对识别结果，如有误请点击修改。</text></div>
		<div class="cell">
			<div class="banker-bot" style="margin-top: 30px;border-top-left-radius:10px;border-top-right-radius:10px; ">
				<text class="title">姓名</text>
			</div>
			<div class="banker-down">
					<input type="text" v-model="name" value:name class="echo"/>
			</div>
		</div>
		<div class="cell">
			<div class="banker-bot">
				<text class="title">身份证号</text>
			</div>
			<div class="banker-down">
					<text type="input" v-model="CID" class="echo">{{CID}}</text>
			</div>
		</div>
			<div class="cell">
			<div class="banker-bot">
				<text class="title">有效期限</text>
			</div>
			<div class="banker-down" style="border-bottom-left-radius:10px;border-bottom-right-radius:10px;">
					<text type="input" v-model="expiry_date" class="echo">{{expiry_date}}</text>
			</div>
		</div>
	  <button class="button3" @click="submit"><text class="text">提交</text></button>
	</div>
  </scroller> 
</template>
<style scoped>
.all{
	margin-top: 20px;
	width:750px;
}
	.tip{
		font-size: 30px;
		color:rgb(102,102,102);
	}
	.up{
		justify-content: center;
		align-items: center;
		margin-bottom: 30px;
		
	}
.echo{
	font-size: 36px;
	color:black;
	margin-left: 36px;
}
.home {
  margin-top: 100px;
  width: 750px;
  background-color: #EFEFF4;
}
.banker-bottom{
	height:100px;
	position: relative;
	flex-direction:row;
	line-height: 100px;
	background-color: gray;
}
.banker-down{
	background-color: #FFFFFF;
	height:88px;
	margin-left: 36px;
	margin-right: 36px;
	justify-content: center;
	align-items: flex-start;
}
.banker-bot{
 height:88px; 
 flex-direction:row;
 align-items: center;
 background-color:rgb(225,225,225);
 margin-left: 36px;
 margin-right: 36px;
}
.titlebar{
	background-color: #FFFFFF;
	width: 750px;
	border: 15px;
}
.title{
	font-size:28px;
	line-height: 88px;
	color:rgb(102,102,102);
	width: 200px;
	margin-left: 36px;
}

.tips_box{
	width:692px;
	margin-top: 15px;
	margin-bottom: 15px;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.tips_img{
	margin-top: 10px;
	width: 20px;
	height: 20px;
}
.tips_text{
	width:660px;
	margin-left: 12px;
	word-wrap: break-word;
	font-size: 24px;
	color: #8d909e;
}
.tit{
  font-size:28px;
  width: 500px;
  color: #404561;
  height:100px;
  line-height: 100px;
}
.tips{
 font-size:28px;
  width: 290px;
  color: #404561;
  height:100px;
  line-height: 100px;
}
.imgL{
	width:200px;
	height:70px;
	margin-top:15px;
	margin-right: 15px;
}

.button3{
width: 678px;
  height: 88px;
  margin-left: 36px;
  margin-right: 36px;
  margin-bottom: 76.5px;
  margin-top: 50px;
  border-radius: 10px;
  background-color: rgb(216,10,48);
  justify-content: center;
  align-items: center;
}
.disimg{
	display: block;
	width:200px;
	height:70px;
	line-height: 70px;
	text-align: center;
	font-size: 24px;
	color: #C0C0C0;
	border-radius:70px;
	border-style: solid;
	border-width: 1px;
	border-color:#C0C0C0;
	margin-top:15px;
	margin-right: 15px;
}
.text {
  font-size: 36px;
  color: #ffffff;
  font-weight:  Bold;
}
</style>
<script>
    import Title from "@/components/common/titlebar_func.vue";
   const context= weex.requireModule("context");
   const stream = weex.requireModule("stream");
   const model = weex.requireModule("model");
export default {
  components: { Title},
  data(){
			return{
				form:{},
				name:"",
				CID:"",
				expiry_date:"",
			}
		},
		created(){},
		mounted(){
			this.form = this.$route.params.form;
			this.name=this.form.name;
			this.CID=this.form.CID;
			this.expiry_date=this.form.expiry_date;
			// this.alertMsg('name='+this.name+'CID='+this.CID+'ed='+this.expiry_date);
		},
		methods:{
	    submit(){
				 this.jump('/RegisterSuccess')
		  	},
		},
		created() {
  		}
};
</script>