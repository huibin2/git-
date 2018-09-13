<template>
   <scroller class="home" >
    <title class="titlebar" titleJson="register/titlebarsetpwd.json"></title>
	   <div class="wrapper">

		  <div class="banker" style="margin-top: 20px;">

			   <div class="banker-bottom">
				      <text class="title">取款密码</text>
				      <input class="tit" v-model="pwd1" maxlength="6" placeholder="6位数字" @input="getPwd1" type="number"/>
         </div>
         <div class="line"></div>

				<div class="banker-bottom">
				   <text class="title">确认密码</text>
				   <input class="tit" maxlength="6" v-model="pwd2" placeholder="请再次输入账户密码" @input="getPwd2" type="number"/>
			   </div>
		   </div>

		   <div  class="button4"  @click="confirm"><text class="text">确定</text></div>

	   </div>
  </scroller> 
</template>
<style scoped>
.getcode{
  justify-content: center;
  align-items: center;
  margin-right: 36px;
}
.disimg {
 display: block;
  height: 60px;
  width: 190px;
  font-size: 28px;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgb(153, 153, 153);
  color: rgb(153, 153, 153);
  text-align: center;
  align-self: center;
  padding-top: 13px;
}
.code {
  padding-top: 13px;
  text-align: center;
  align-self: center;
  height: 60px;
  width: 190px;
  color: rgb(209, 154, 95);
  font-size: 28px;
  border-width: 1px;
  border-radius: 10px;
  border-color:rgb(209, 154, 95);
}
.banker {
  background-color: white;
}
.line {
  height: 3px;
  /* width: 500px; */
  background-color: #efeff4;
  margin-left: 36px;
  margin-right: 36px;
}
.right {
  height: 88px;
  width:500px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.code {
  color: rgb(209, 154, 95);
  font-size: 28px;
}
.titlebar {
  background-color: #efeff4;
  width: 750px;
  /* border: 15px; */
  /* margin-bottom: 15px; */
}
.home {
  margin-top: 118px;
  width: 750px;
  background-color: #efeff4;
}
.banker-bottom {
  height: 88px;
  width: 750px;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 88px;
  background-color: #ffffff;
}
.title {
  font-size: 30px;
  line-height: 88px;
  margin-left: 36px;
  color: rgb(102,102,102);
}
.titlestate{
  margin-left: 36px;
}
.texttop{
  font-size: 24px;
  color: rgb(102,102,102);
  lines:3;
  margin-right: 36px;
  /* height: 40px;
  line-height: 40px; */
}
.tit {
  font-size: 30px;
  width: 500px;
  color: rgb(102,102,102);
  /* padding-left:64px; */
  height: 88px;
  line-height: 88px;
  text-align: right;
  margin-right: 36px;
  placeholder-color:rgb(153,153,153);
}
.tit1{
  font-size: 30px;
  width: 300px;
  color: rgb(102,102,102);
  /* padding-left:64px; */
  height: 88px;
  line-height: 88px;
  text-align: right;
  margin-right: 10px;
  placeholder-color:rgb(153,153,153);
}
.box {
  font-size: 28px;
  width: 500px;
  color: #404561;
  padding-left: 64px;
  height: 100px;
  line-height: 100px;
}
.tips {
  font-size: 28px;
  width: 290px;
  color: #404561;
  height: 100px;
  line-height: 100px;
  margin-left: 30px;
}
.boxl {
  font-size: 28px;
  width: 500px;
  color: #404561;
  height: 100px;
  line-height: 100px;
}
.banker-bot {
  height: 100px;
  flex-direction: row;
  background-color: #ffffff;
  margin-top: 15px;
  margin-bottom: 3px;
}
.imgL {
  display: block;
  width: 190px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
  color: rgb(209, 154, 95);
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(209, 154, 95);
  /* margin-top: 15px;*/
     margin-right: 36px;  
     justify-content: center;
     align-items: center;
}
.button3 {
  width: 669.9975px;
  height: 84.9975px;
  margin-left: 37.5px;
  margin-bottom: 76.5px;
  margin-top: 42.5px;
  border-radius: 53.4975px;
  background-color: #c0c0c0;
}

.unckecked {
   width: 32px;
   height: 32px; 
   position: relative;
   top:30px;
   left:-28px;
}

.agreetext{
  font-size: 24px;
  color: rgb(102,102,102);
  margin-left: 35px;
 
}
.agreediv{
    margin-left: 36px;
    /* margin-top:40px; */
    /* background-color: yellow; */
}
.button4 {
  width: 678px;
  height: 88px;
  margin-left: 36px;
  margin-right: 36px;
  margin-bottom: 76.5px;
  margin-top: 500px;
  border-radius: 10px;
  background-color: rgb(216,10,48);
  justify-content: center;
  align-items: center;
}
.bottomstate{
  margin-left: 36px;
}
.wxts{
  font-size: 24px;
  color: rgb(102,102,102);
  margin-right: 36px;
  height: 45px;
  line-height: 45px;
}
.wxtss{
  font-size: 24px;
  color: rgb(102,102,102);
  margin-right: 36px;
  lines:2;
}
.wxt{
  font-size: 24px;
  color: rgb(102,102,102);
  margin-right: 36px;
  lines:3
}

/* .wstate{
  font-size: 24px;
  color: rgb(102,102,102);
} */
.checkebox {
  flex-direction: row;
}
.memory_text {
  font-size: 24px;
  color: #545454;
  margin-top: 26px;
  margin-left: 20px;
}
.xieyi {
  margin-left: 20px;
  margin-top: 26px;
}
.mtext {
  font-size: 24px;
  color: #00b9f4;
}

.text {
  /* width: 100%; */
  font-size: 36px;
  color: #ffffff;
  font-weight:  Bold;
  /* margin-top: 22px; */
  /* margin-left: 280px; */
}
.unckecked {
  width: 26px;
  height: 26px;
  margin-top: 30px;
  margin-left: 29px;
}
</style>
<script>
import Title from "@/components/common/titlebar_func.vue";
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
export default {
  components: { Title },
  data() {
    return {
      //校验
      checkedpwd1: false,
      checkedpwd2: false,
      //输入参数
      pwd1: "",
      pwd2: "",
      //环境参数
      version: "",
      jsfmVersion: "",
      platform: "",
      osVersion: "",
      appName: "",
      appVersion: "",
      deviceModel: "",
      deviceWidth: "",
      deviceHeight: "",
      resolution: "",
  
    };
  },
  created() {
    if (typeof WXEnvironment === "object") {
      this.version = WXEnvironment.weexVersion;
      this.platform = WXEnvironment.platform;
      this.osVersion = WXEnvironment.osVersion;
      this.appGroup = WXEnvironment.appGroup;
      this.appName = WXEnvironment.appName;
      this.appVersion = WXEnvironment.appVersion;
      this.deviceModel = WXEnvironment.deviceModel;
      this.deviceWidth = WXEnvironment.deviceWidth;
      this.deviceHeight = WXEnvironment.deviceHeight;
      this.resolution = this.deviceWidth + " x " + this.deviceHeight;
    }
    // const ResInfo = JSON.parse(context.sessionGetString("ResInfo"));
    // this.Name = ResInfo.username;
    // this.idNo = ResInfo.idno;
    // this.cardNo = ResInfo.cardno;
    // this.phoneNo = ResInfo.phoneno;
  },
  methods: {
    getPwd1(event){
      this.pwd1=event.value;
    },
    getPwd2(event){
      this.pwd2=event.value;
    },
   confirm(){
     if(this.pwd1==this.pwd2&&this.pwd1!=null&&this.pwd1!=''&&this.pwd2!=null&&this.p2!=''){
        this.jump("/RegisterOpenCardResult");
     }else{
       this.alertMsg("两次密码不一致或密码为空");
       return ;
     }
   }
  }
};
</script>