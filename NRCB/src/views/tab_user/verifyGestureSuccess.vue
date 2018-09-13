<template>
    <div>
        <title titleJson="tab_user/safe_set/gestureSuccess_titlebar.json"></title>
        <scroller class="container">
            <div class="home">
            <div class="img_area">
                <image class="successImg" src="./imgs/register/success.png" />
                <text class="text">手势登录修改成功</text>
            </div>

            <!-- <div>
                <image class="confirm" src="./imgs/register/login.png" @click="confirm" />
            </div> -->
            <!-- <div class="tip">
                <text class="tip1">已为您开通手机银行服务</text>
                <text class="tip1">您可通过手机号及登陆密码登陆我行手机银行</text>
            </div> -->
            <div class="button4" @click="confirm"><text class="text1">确定</text></div>
            <!-- <div class="button5" @click="registSec2"><text class="text1">我不是本行客户，我要开电子账户</text></div> -->
            <!-- <div class="login" @click="confirm"><text class="tip2">暂不开户直接登录</text></div> -->
            </div>
        </scroller>
       
    </div>

</template>
<style scoped>
.container {
  width: 750px;
  background-color: rgb(240, 240, 240);
}
.home {
  background-color: rgb(255, 255, 255);
  margin-top: 20px;
}

.login {
  justify-content: center;
  align-items: center;
  margin-top: 48px;
}
.button5 {
  width: 669.9975px;
  /* height: 84.9975px; */
  height: 60px;
  margin-left: 37.5px;
  /* margin-bottom:76.5px; */
  /* margin-top:42.5px; */
  margin-bottom: 50px;
  border-radius: 53.4975px;
  background-color: #00a0e8;
  justify-content: center;
  align-items: center;
}
.button4 {
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 36px;
  width: 678;
  height: 88;
  margin-right: 36px;
  justify-content: center;
  border-radius: 10px;
  border-color: #f00000;
  border-width: 2px;
  /* background-color: red; */
}
.tip2 {
  font-size: 30px;
  color: rgb(102, 102, 102);
  text-decoration: underline;
}
.tip1 {
  font-size: 30px;
  color: #666666;
}
.tip {
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.titlebar {
  background-color: #ffffff;
  width: 750px;
  border: 15px;
}
.left_icon {
  width: 18px;
  height: 35px;
  top: -60px;
  left: 20px;
}
.img_area {
  margin-top: 100px;
  background-color: white;
  /* margin-top: -34px; */
  width: 750px;
  height: 300px;
  justify-content: center;
  align-items: center;
}
.successImg {
  width: 114px;
  height: 114px;
  margin-top: 59px;
  /* margin-left: 323px; */
}
.text {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: rgb(65, 201, 142);
  font-weight: bold;
  letter-spacing: -0.55px;
  line-height: 86px;
  text-align: center;
}
.text1 {
  color: #f00000;
  font-size: 36px;
  text-align: center;
  padding-bottom: 20px;
  padding-top: 20px;
}
.confirm {
  width: 668px;
  height: 82px;
  margin-top: 117px;
  margin-left: 41px;
}
</style>

<script>
import Title from "@/components/common/titlebar_func.vue";
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");

export default {
  props: {
    titleJson: {
      default: "register/titlebarresult.json"
    }
  },
  components: { Title },
  data() {
    return {};
  },
  created() {},
  methods: {
    // 确认按钮
    confirm() {
      context.secureSetString("ResInfo", "");
      //   context.finish();
      context.launchStage("main.safeSet");
    },
    registAcc() {
      // 	if(!(this.checkedPhone && this.checkedMsgCode && this.checkedReferee)){
      //       this.alertMsg('请填写完整信息');
      // 	   return true;
      // 	}else{
      // 		this.toregister();
      // 	}

      // if(this.propfirst(this.Name,this.idNo,this.phoneNo))return
      // this.propUser();
      // if(this.loginPwd!=this.loginPwdCfm){
      // 	this.alertMsg("登陆"+this.loginPwd+"确认"+this.loginPwdCfm+'确认密码有误，请重新输入');
      // 	return;
      // }else{
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
    toregister() {
      //  this.jump("/RegisterAccount");
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
      // const params={
      // 	UserPwd:this.loginPwd,//登录密码
      // 	UserPwdConfirm:this.loginPwdCfm,//登录密码确认
      // 	PhoneNbr:this.phoneNo,//手机号
      // 	IdName:this.Name,//姓名
      // 	UserSex:"1",//性别
      // 	IdNum:this.idNo,//证件号码
      // 	IssueDt:"2013-02-03",//证件签发日
      // 	ExpiryDt:"2015-06-07",//证件到期日
      // 	IssueOrg:"356",//证件签发机构
      // 	IdenAddr:"356",//证件地址
      // 	UserSmsId:this.msgCode,//短信验证码
      // 	SmsNbr:"8583069713",//短信序号
      // 	Pic1Url:"123",//证件正面照片地址
      // 	Pic2Url:"123",//证件反面照片地址
      // 	Pic3Url:"123"//手持证件照片地址
      // };
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
      // });
      // context.sessionSetString('ResInfo',JSON.stringify(info));
      // this.jump('/RegisterSecond')
    }
  }
};
</script>