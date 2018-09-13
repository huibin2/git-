<template>
   <scroller class="home" >
    <title class="titlebar" titleJson="register/titlebaraccount.json"></title>
	   <div class="wrapper">
		   <div class="banker" style="margin-top: 20px;">
			   <div class="banker-bottom">
				      <text class="title">姓名</text>
				      <input class="tit" v-model="CifName" placeholder="请输入您的姓名" type="text"/>
         </div>
         <div class="line"></div>
          <down-list :jsonurl="jsonurl" @sendValue="sendValue"></down-list>
         <div class="line"></div>
         <div class="banker-bottom">
				      <text class="title">证件号码</text>
				      <input class="tit" v-model="IdNo" maxlength="18" placeholder="请输入您的证件号码" type="text"/>
         </div>
         <div class="line"></div>
         <div class="banker-bottom">
				   <text class="title">核心预留手机号码</text>
           <input type="number" maxlength="11" v-model="CustomersettingMobilePhone" value:CustomersettingMobilePhone class="tit"/>
			   </div>
         <div class="line"></div>
         		<div class="banker-bottom">
					<text class="title">短信验证码</text>
          <div class="right">
            <input ref="msgcoderef" v-model="OTPPassword" type="number" class="tit1" maxLength="6" placeholder="请输入短信验证码"/>
            <div class="getcode" @click="changeYZM()">
                <text class="code" v-if="yzmFlag==true">{{msg}}</text>
                <text class="disimg" v-else>{{msg1}}({{soudes}}s)</text>
            </div>
          </div>
				</div>
		   </div>
		   <div class="button4"  @click="checkHostMobilePhone"><text class="text">下一步</text></div>
	   </div>
     <confirm v-if="showConfirm" :data="data" @confirm="confirm" @cancel="cancel"></confirm>
  </scroller> 
</template>
<style scoped>
.getcode {
  justify-content: center;
  align-items: center;
  margin-right: 36px;
}
.banker {
  background-color: white;
}
.line {
  height: 3px;
  /* width: 500px; */
  background-color: #efeff4;
  margin-left: 36px;
}
.right {
  height: 88px;
  width: 500px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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
  border-color: rgb(209, 154, 95);
}
.titlebar {
  background-color: #efeff4;
  width: 750px;
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
  color: rgb(102, 102, 102);
}
.title1 {
  font-size: 30px;
  line-height: 88px;
  margin-right: 36px;
  color: rgb(102, 102, 102);
}
.tit {
  font-size: 30px;
  width: 300px;
  color: rgb(102, 102, 102);
  /* padding-left:64px; */
  height: 88px;
  line-height: 88px;
  text-align: right;
  margin-right: 36px;
  placeholder-color: rgb(152, 153, 153);
}
.tit1 {
  font-size: 30px;
  width: 300px;
  color: rgb(102, 102, 102);
  /* padding-left:64px; */
  height: 88px;
  line-height: 88px;
  text-align: right;
  margin-right: 10px;
  placeholder-color: rgb(153, 153, 153);
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
.button3 {
  width: 669.9975px;
  height: 84.9975px;
  margin-left: 37.5px;
  margin-bottom: 76.5px;
  margin-top: 42.5px;
  border-radius: 53.4975px;
  background-color: #c0c0c0;
}
.button4 {
  width: 678px;
  height: 88px;
  margin-left: 36px;
  margin-right: 36px;
  margin-bottom: 76.5px;
  margin-top: 50px;
  border-radius: 10px;
  background-color: rgb(216, 10, 48);
  justify-content: center;
  align-items: center;
}

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
  font-size: 36px;
  color: #ffffff;
  font-weight: Bold;
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
import DownList from "@/components/common/down_list.vue";
import Confirm from "@/components/common/confirm.vue";

const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
const picker = weex.requireModule("picker");

export default {
  components: { Title, DownList, Confirm },
  data() {
    return {
      jsonurl: "json/common/id_type.json",
      CustomersettingMobilePhone: "",
      IdNo: "",
      selected: "",
      CifName: "",
      cre_key: "",
      OTPPassword: "",
      yzmFlag: true,
      soudes: "", //倒计时
      msg: "获取验证码", //验证码提示框
      msg1: "重新获取",
      HostMobilePhone:"",
      RegisterMobilePhone: "",
      TipMessage: "",
      showConfirm:false,
      data:{    //弹窗信息
        "text": "",
        "ok":"确定",
        "cancel":"取消"
      },

    };
  },
  created() {
    this.CustomersettingMobilePhone = context.sessionGetString("HostMobilePhone");
    this.RegisterMobilePhone = context.sessionGetString("RegisterMobilePhone");
    this.TipMessage = context.sessionGetString("RegisterTipMessage");
    this.HostMobilePhone = context.sessionGetString("HostMobilePhone");
  },
  methods: {
    changeYZM() {
      if (this.CustomersettingMobilePhone.length != 11) {
        this.alertMsg("请正确填写手机号码");
        return;
      } else {
        if (this.yzmFlag) {
          var params = {
            MobilePhone: this.CustomersettingMobilePhone,
            TransCode: "RegRelaActAdd"
          };
          this.postDo(
            "PublicOtpMessageSend.do",
            params,
            success => {
              // this.alertMsg(data);
              // this.data = data;
              this.OTPIndex = success.OTPIndex;
              this.uniqueId = success._OTPToken.uniqueId;
              this.alertMsg(
                success.MsgTip + "短信验证码为：" + success._OTPToken.uniqueId
              );
            },
            failture => {
              this.alertMsg(failture._RejMessage);
            }
          );
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
            context.sessionSetString();
          }
        }
      }
    },
    checkHostMobilePhone() {
      if (this.CustomersettingMobilePhone != this.HostMobilePhone) {
        this.data.text=this.TipMessage;
        this.showConfirm = true;
      }else{
        this.registSec();
      }
    },
    confirm() {
      this.showConfirm = false;
      this.registSec();
    },
    cancel(){
      this.showConfirm = false;
      this.CustomersettingMobilePhone = context.sessionGetString("HostMobilePhone");
    },
    registSec() {
      if (this.OTPPassword == "") {
        this.alertMsg("短信验证码不可为空");
        return;
      } else {
        var data = {
          MobilePhone: this.RegisterMobilePhone,
          CifName: this.CifName,
          IdType: this.cre_key,
          IdNo: this.IdNo,
          HostMobilePhone: this.CustomersettingMobilePhone,
          OTPPassword: this.OTPPassword
        };
        this.postDo(
          "UserInfoCheck.do",
          data,
          success => {
            context.sessionSetString(
              "RegisterMobilePhone",
              this.RegisterMobilePhone
            );
            this.toregister();
          },
          failture => {
            this.alertMsg(failture._RejMessage);
          }
        );
      }
    },
    toregister() {
      this.jump('/RegisterAccountNext');
    },
    sendValue(idType) {
      this.cre_key = idType;
    }
  }
};
</script>