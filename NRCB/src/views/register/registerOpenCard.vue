<template>
   <scroller class="home" >
    <title class="titlebar" titleJson="register/titlebaropenaccount.json"></title>
	   <div class="wrapper">
		   <div class="banker" style="margin-top: 20px;">
       
        <div class="bottomstate" style="margin-top:8px;margin-bottom:8px;">
			   <text class="wxt">我行将为您开通II类账户，请准备好本人的一张储蓄卡(I类户)，并输入您在该行预留的手机号。如您有开启推荐人，请填写其工号。</text>
		   </div>
			  
			   <div class="line"></div>
			   <div class="banker-bottom">
				      <text class="title">持卡人</text>
				      <input class="tit" maxlength="11" v-model="name" placeholder="请输入持卡人姓名" @input="getName" type="text"/>  
              </div>
			  <div class="line"></div>
			  <div class="banker-bottom">
				      <text class="title">银行卡号</text>
				      <input class="tit" maxlength="11" v-model="cardNo" placeholder="请输入银行卡号" @input="getCardNo" type="number"/>  
              </div>
              <div class="line"></div>
			  <div class="banker-bottom">
				      <text class="title">所属银行</text>
				      <text class="tit"></text>  
              </div>
              <div class="line"></div>
			  <div class="banker-bottom">
				      <text class="title">手机号</text>
				      <input class="tit" maxlength="11" v-model="phoneNo" placeholder="请输入您在该行预留的手机号" @input="getPhoneNo" type="number"/>  
              </div>
              <div class="line"></div>
				<div class="banker-bottom">
					<text class="title">短信验证码</text>
					<div class="right">
						<input ref="msgcoderef" v-model="MsgCode" type="number" class="tit1" maxLength="6" placeholder="请输入短信验证码" @input="getMsgCode"/>
						<div class="getcode" @click="changeYZM()">
							<text class="code" v-if="yzmFlag==true">{{msg}}</text>
							<text class="disimg" v-else>{{msg1}}({{soudes}}s)</text>
						</div>
					</div>
				</div>
               <div class="line"></div>
				<div class="banker-bottom">
				   <text class="title">推荐人</text>
				   <input class="tit" ref="refereeref" maxlength="6" minlength="4" v-model="refereeNo" placeholder="手工输入推荐人编号" @input="getRefereeNo" type="number"/>
			   </div>
		   </div>
		   <div class="agreediv">

         <!-- <div @click="agree" style="background-color: blue;"> -->
		        <div v-if='save'>
                <image class="unckecked" @click="agree" src='./imgs/radio.png'/>
            </div>
            <div v-else>
                <image class="unckecked" @click="agree" src='./imgs/radioOn.png'/>
            </div>
         <!-- </div> -->

		      <text class="agreetext" @click="iagree">我已阅读并同意《南海农商银行电子账户服务协议》</text>
		   </div>

		   <div  class="button4" @click="registSec"><text class="text">同意协议并提交</text></div>

		   <div class="bottomstate">
			   <text class="wxts">温馨提示</text>
			   <text class="wxtss">如果您使用拍照方式识别卡号,识别的卡号信息可能存在误差，请留意核查卡号识别结果。</text>
		   </div>
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
   width: 26px;
   height: 26px; 
   margin-right:5px; 
   /* position: relative;
   top:30px;
   left:-28px; */
}

.agreetext{
  font-size: 24px;
  color: rgb(102,102,102);
  /* margin-left: 35px; */

 
}
.agreediv{
    margin-left: 36px;
    flex-direction: row;
    /* background-color: yellow; */
    /* position: relative;
    top:-25px; */
    margin-top:26px; 
    /* background-color: yellow;  */
}
.button4 {
  width: 678px;
  height: 88px;
  margin-left: 36px;
  margin-right: 36px;
  margin-bottom: 76.5px;
  margin-top: 35px;
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
  lines:3;
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
/* .unckecked {
  width: 26px;
  height: 26px;
  margin-top: 30px;
  margin-left: 29px;
} */
</style>
<script>
import Title from "@/components/common/titlebar_func.vue";
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
export default {
  components: { Title },
  data() {
    return {
      //短信验证码响应报文
      MsgTip:"",
      OTPIndex:"",
      uniqueId:"",
      MsgCode:"",
      //倒计时
      soudes: "", //倒计时
      msg: "获取验证码",  //验证码提示框
      msg1:"重新获取",
      yzmFlag: true,
      //校验
      checkedPhone: false,
      checkedMsgCode: false,
      //输入参数
      name:'',
      cardNo:'',
      refereeNo: "",
      phoneNo: "",

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
      save:true
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
      agree(){
        if(this.save){
          this.save=false;
        }else{
          this.save=true;
        }
      },
      iagree(){
        this.jump("/RegisterDetail");
      },
     changeYZM() {
       if(this.phoneNo.length!=11){
         this.alertMsg('请正确填写手机号码');
         return;
       }else{
      if (this.yzmFlag) {
         var data  = {
            MobilePhone:this.phoneNo,
            TransCode:'MobileRegister'
          };
          this.postDo('PublicOtpMessageSend.do', data,(data) => {
            // this.alertMsg(data);
            // this.data = data;
            this.OTPIndex=data.OTPIndex;
            this.uniqueId=data._OTPToken.uniqueId;
            this.alertMsg(data.MsgTip+'短信验证码为：'+data._OTPToken.uniqueId);
          }, data => {
            this.alertMsg(data._RejMessage);
            });
        this.yzmFlag = false;
        clearInterval(this.timer);
        if (!this.n) {
          this.msg = "重新获取";
          this.soudes = "60";
          var that = this;
          this.timer = setInterval(function() {
            that.soudes--;
            if (that.soudes <= 0) {
              clearInterval(that.timer);
              that.msg = "获取验证码";
              that.yzmFlag = true;
            }
          }, 1000);
        };
      };   
       };
    },
    getName(event) {
      this.name = event.value;
    },
    getCardNo(event) {
      this.cardNo = event.value;
    },
    getPhoneNo(event) {
      this.phoneNo = event.value;
      if (event.value.length == 11) {
        this.checkedPhone = true;
      }
    },
    getRefereeNo(event) {
      this.refereeNo = event.value;
    },
    registSec() {
        // if(this.MsgCode!=this.uniqueId){
        //   this.alertMsg('短信验证码填写错误');
        // }else if(this.checkedPhone!=true){
        //    this.alertMsg('请正确填写注册手机号');
        // }else{            
        //     var data  = {
        //     MobilePhone:this.phoneNo,
        //     OTPPassword:this.MsgCode,
        //     Recommender:this.refereeNo
        //   };
        //     this.postDo('MobileRegisterPre.do', data,(data)=> {
        //     this.PreCheck=data._PreCheck;
        //     this.JnlNo=data._JnlNo;
        //     context.sessionSetString('RegisterMobilePhone',this.phoneNo); 
             this.toregister();            
        //   }, data => {
        //     this.alertMsg(data._RejMessage);
        //     });
      	// }
    },
    toregister() {
      this.jump("/RegisterSetPwd");
    },
  }
};
</script>