<template>
   <scroller class="home" >
    <title class="titlebar" titleJson="register/titlebaraccount.json"></title>
	   
      <div class="wrapper">
            <div class="img_area">
                <image class="successImg" src="./imgs/suc.png" />
                <text class="text2">开户成功</text>
                <text class="text3">以为您开通我行电子账户（II类账户），账户信息如下（传过来的账户信息6212 1234 1234 1234 1234）</text>
            </div>
		   <div  class="button4"  @click="registSec"><text class="text">登陆手机银行</text></div>
	
     </div>

  </scroller> 
</template>
<style scoped>
.line {
  height: 3px;
  /* width: 500px; */
  background-color: #efeff4;
  margin-left: 36px;
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

.img_area{
  margin-top: 40px;
  /* background-color: white; */
  width: 750px;
  height: 480px;
 }
.successImg{
  width: 114px;
  height: 114px;
  margin-top: 50px;
  margin-left: 323px;
}
.text2{
 font-family: PingFangSC-Medium;
 font-size: 32px;
 color:black;
 /* font-weight: bold; */
 letter-spacing: -0.55px;
 line-height: 86px;
 text-align: center;
}
.text3{
    text-align: center;
    color:darkgray;
}
.button4 {
  width: 678px;
  height: 88px;
  margin-left: 36px;
  margin-right: 36px;
  margin-bottom: 76.5px;
  margin-top: 50px;
  border-radius: 50px;
  background-color: rgb(216,10,48);
  justify-content: center;
  align-items: center;
}
.text {
  /* width: 100%; */
  font-size: 36px;
  color: #ffffff;
  font-weight:  Bold;
  /* font-weight:  Bold; */
  /* margin-top: 22px; */
  /* margin-left: 280px; */
}
</style>
<script>
// new Vue({
//     el:'...',
//     data:{
//         selected:''
//     }
// });
// import Title from "@/components/tab_user/safe_setting/updateLoginPwd_titlebar.vue"
import Title from "@/components/common/titlebar_func.vue";
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
// const model = weex.requireModule("model");
// const select = weex.requireModule("select");
export default {
  components: { Title },
  data() {
    return {
      idCard:"",
        selected:'',
      Name: "",
      msgCodeTitle: "短信验证码",
      msgCodeBtnText: "",
      isTimerStop: false,
      time: 60,
      msgCode: "",
        AcName:"",
      backgroundColor: "#F8F8F8",
      checked: true,
      checkedPhone: false,
      checkedMsgCode: false,
      checkedReferee: false,
      UserPwd: "",
      refereeNo: "",
      idNo: "",
      phoneNo: "",
      cardNo: "",
      sttttttamp: "",
      pubbbbbkey: "",
      url: "",
      loginPwd: "",
      loginPwdCfm: "",
      version: "",
      jsfmVersion: "",
      platform: "",
      osVersion: "",
      appName: "",
      appVersion: "",
      deviceModel: "",
      deviceWidth: "",
      deviceHeight: "",
      resolution: ""
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
    const ResInfo = JSON.parse(context.sessionGetString("ResInfo"));
    this.Name = ResInfo.username;
    this.idNo = ResInfo.idno;
    this.cardNo = ResInfo.cardno;
    this.phoneNo = ResInfo.phoneno;
  },
  methods: {
    getIdCard(event){
       this.idCard = event.value;
    },
      getAcName(event){
          this.AcName = event.value;
      },
    getName(event) {
      this.Name = event.value;
    },
    getIdNo(event) {
      this.idNo = event.value;
    },
    getCardNo(event) {
      this.cardNo = event.value;
    },
    getPhoneNo(event) {
      this.phoneNo = event.value;
      if (event.value.length == 11) {
        this.checkedPhone = !this.checkedPhone;
        //this.propUser();
      }
    },
    getRefereeNo(event) {
      this.refereeNo = event.value;
      if (event.value.length == 5) {
        this.checkedReferee = !this.checkedReferee;
      }
    },
    getMsgCode(event) {
      this.msgCode = event.value;
      if (event.value.length == 6) {
        this.checkedMsgCode = !this.checkedMsgCode;
        this.$refs["msgcoderef"].blur();
      }
    },
    goto(id) {
      context.launchStage(id);
    },
    check: function() {
      this.checked = !this.checked;
    },
    //获取短信验证码
    sendSmS() {
      this.timeBuild();
      let info = context.sessionGetString("RegisterInfo");
      // const params={
      // 	MsgMobile:JSON.parse(info).MobilePhone,
      // 	OTPSn:JSON.parse(info)._OTPToken,
      // 	Challenge:this.sttttttamp
      // }
      const params = {
        UserID: "",
        ApprTyp: "1", //1-注册验证；2-交易验证；
        PhoneNbr: this.phoneNo,
        VerifyTag: "N", //N-不验证；Y-验证
        VerifyScene: "", //VerifyTag为Y时候必输 例如本次交易为行内转账则填入行内转账
        MAinInfo: "", //VerifyTag为Y时候必输:符号进行分割例如 :转出账号:转入：金额
        version: this.version,
        jsfmVersion: this.jsfmVersion,
        platform: this.platform,
        osVersion: this.osVersion,
        appName: this.appName,
        appVersion: this.appVersion,
        deviceModel: this.deviceModel,
        deviceWidth: this.deviceWidth,
        deviceHeight: this.deviceHeight,
        resolution: this.resolution
      };
      // this.postDo("GenPhoneTokenForPublic.do",params,data =>{
      // 	this.alertMsg("短信已发送！");

      // });
    },
    //倒计时
    timeBuild() {
      var timer = setInterval(() => {
        if (this.time < 0) {
          this.time = 60;
          this.isTimerStop = false;
          clearInterval(timer);
        } else {
          this.isTimerStop = true;
          this.msgCodeBtnText = "重新获取(" + this.time-- + "s)";
        }
      }, 1000);
    },
    Agreement(id) {
      // const params = {
      //     ProductNo:id,
      //     BankType:"pmbs"
      // };
      // this.postDo(`NormalNoticeDetail.do`,params,data =>{
      //     this.url =this.$store.state.BaseUrl+data.FileDir;
      //     const titleName = id =="9" ? "服务协议":"章程" ;
      //     context.launchStage("main.webview?url="+this.url+"&title="+titleName);
      // });
    },
    registSec() {
      // 	if(!(this.checkedPhone && this.checkedMsgCode && this.checkedReferee)){
      //       this.alertMsg('请填写完整信息');
      // 	   return true;
      // 	}else{
      // 		this.toregister();
      // 	}

      // if(this.propfirst(this.Name,this.idNo,this.phoneNo))return
      // this.propUser();
      // if (this.loginPwd != this.loginPwdCfm) {
      //   this.alertMsg(
      //     "登陆" +
      //       this.loginPwd +
      //       "确认" +
      //       this.loginPwdCfm +
      //       "确认密码有误，请重新输入"
      //   );
      //   return;
      // } else {
      //   this.alertMsg(
      //     "Weex SDK Version: " +
      //       this.version +
      //       "\n" +
      //       "JS Framework Version: " +
      //       this.jsfmVersion +
      //       "\n" +
      //       "platform: " +
      //       this.platform +
      //       "\n" +
      //       "osVersion: " +
      //       this.osVersion +
      //       "\n" +
      //       "appGroup: " +
      //       this.appGroup +
      //       "\n" +
      //       "appName: " +
      //       this.appName +
      //       "\n" +
      //       "appVersion: " +
      //       this.appVersion +
      //       "\n" +
      //       "deviceModel: " +
      //       this.deviceModel +
      //       "\n" +
      //       "deviceWidth: " +
      //       this.deviceWidth +
      //       "\n" +
      //       "deviceHeight: " +
      //       this.deviceHeight
      //   );
        this.toregister();
      // }
      // this.$refs.Pwd1.getKbdLength(length =>{
      //     if(Number(length) !=6){
      //         this.alertMsg('请输入6位交易密码');
      //         return;
      //     }else{
      //         this.propUser();
      //     }
      // })
    },
    getTimeStamp() {
      //????????????????????????????????????????????????????????????????????????????????????????????????
      this.postDo("Timestamp.do", {}, data => {
        this.sttttttamp = data.Timestamp;
        this.pubbbbbkey = context.sessionGetString("sm2PublicKey");
        this.toregister();
      });
    },
    toregister() {
      context.launchStage('main.login');
      // this.$refs.Pwd1.getValue(this.sttttttamp,this.pubbbbbkey,data => {
      //     context.sessionSetString('registerPassword',data);
      //     this.UserPwd=data;
      //     const params = {
      //         MobilePhone: this.phoneNo,
      //         TrsPassword: this.UserPwd,
      //         BankAcType: "03",
      //         IsMobileFlag:"N",
      //         IdNo:this.idNo,
      //         AcName:this.Name,
      //         AcNo:this.cardNo,
      //         IdType:'00'
      //     };
      // this.postDo("OnlineRegisterConfirm.do",params,data =>{
      //     this.$refs.Pwd1.clear();
      //     context.sessionSetString('RegisterInfo',JSON.stringify(data))
      //     //保存用户信息回显
      //     const info = {
      //         username:this.Name,
      //         idno:this.idNo,
      //         phoneno:this.phoneNo,
      //         cardno:this.cardNo
      //     }
      //     context.sessionSetString('ResInfo',JSON.stringify(info));
      //     this.jump('/RegisterSecond')
      // });

      // })
      //保存用户信息回显
      // const params = {
      //     // IdName:this.Name,//姓名
      // 	// UserSex:"男",//性别
      // 	// IdNum:this.idNo,//证件号码
      // 	// PhoneNbr:this.phoneNo,//手机号码
      // 	// VouId:this.cardNo,//银行卡卡号
      // 	// CardPwd:"",//一类户卡密
      // 	// ContTypCd:"1"//1-电子账户；2-本行借记卡；3-本行贷记卡；8-他行借记卡

      // 	UserPwd:this.loginPwd,//登录密码
      // 	UserPwdConfirm:this.loginPwdCfm,//登录密码确认
      // 	PhoneNbr:this.phoneNo,//手机号
      // 	IdName:this.Name,//姓名
      // 	UserSex:"男",//性别
      // 	IdNum:this.idNo,//证件号码
      // 	UserSmsId:"",//短信验证码
      // 	SmsNbr:""//短信序号

      // }
      const params = {
        UserPwd: this.loginPwd, //登录密码
        UserPwdConfirm: this.loginPwdCfm, //登录密码确认
        PhoneNbr: this.phoneNo, //手机号
        IdName: this.Name, //姓名
        UserSex: "1", //性别
        IdNum: this.idNo, //证件号码
        IssueDt: "2013-02-03", //证件签发日
        ExpiryDt: "2015-06-07", //证件到期日
        IssueOrg: "356", //证件签发机构
        IdenAddr: "356", //证件地址
        UserSmsId: this.msgCode, //短信验证码
        SmsNbr: "8583069713", //短信序号
        Pic1Url: "123", //证件正面照片地址
        Pic2Url: "123", //证件反面照片地址
        Pic3Url: "123" //手持证件照片地址
      };
      // this.postDo("RegisterStepOne.do",params,data =>{
      //     this.$refs.Pwd1.clear();
      // context.sessionSetString('RegisterInfo',JSON.stringify(params))
      //     //保存用户信息回显
      //     const info = {
      //         IdName:this.Name,//客户姓名
      //         IdenNum:this.idNo,//客户身份证号
      //         PhoneNbr:this.phoneNo,//手机号
      //     }
      //     context.sessionSetString('ResInfo',JSON.stringify(info));
    //   this.jump("/RegisterPassword");
      // });
      // context.sessionSetString('ResInfo',JSON.stringify(info));
      // this.jump('/RegisterSecond')
    },
    launchStage1() {
      context.launchStage("main.demo");
    },
    propUser() {
      const params = {
        MobilePhone: this.phoneNo
      };
      this.postDo("OnlineRegisterPre.do", params, data => {
        if (data.IsMobileFlag == "Y") {
          this.alertMsg("您已开通过手机银行,请登录,若忘记密码请自助修改！");
          return true;
        } else {
          this.getTimeStamp();
        }
      });
      this.toregister();
    }
  }
};
</script>