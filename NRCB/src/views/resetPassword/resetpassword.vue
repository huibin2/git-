<template>
    <scroller class="home">
        <title class="border" titleJson="resetPassword/resetpwd_title.json"></title>
        <div class="border tip" v-if="userLevel == 1">
            <text class="tip-text">因手机银行系统升级，需要您重新设置您的手机银行登录密码</text>
        </div>

        <div style="height: 10px;"></div>
        <div class="border row">
            <div class="border text-area" >
                <text class="border text">卡号/帐号</text>
            </div>
            <div class="border input-area">
                <input class="border input bankcard" type="number" placeholder="请输入本人加挂手机银行的卡号/帐号" @input="getBankCard">
            </div>
        </div>
        <div style="height: 2px;"></div>
        <div class="border row">
            <div class="border text-area" >
                <text class="border text">取款密码</text>
            </div>
            <div class="border input-area">
                <input class="border input" type="password" maxlength="6" placeholder="请输入帐户密码" @input="getPassword">
            </div>
        </div>

        <div style="height: 10px;"></div>
        <div class="border row">
            <div class="border text-area" >
                <text class="border text">签约手机号</text>
            </div>
            <div class="border input-area">
                <text class="input-text border">{{phoneNumber | phoneFormat}}</text>
                <!--<input class="border input" type="tel" maxlength="11" placeholder="请输入注册手机号">-->
            </div>
        </div>

        <div style="height: 2px;"></div>

        <div class="border row">
            <div class="border text-area">
                <text class="border text">短信验证码</text>
            </div>
            <div class="border input-area">
                <input class="border input" style="padding-right: 20px;" type="tel" maxlength="6" placeholder="请输入短信验证码" @input="getCode">
                 <div class="getcode" @click="getMsgCode()">
                      <text class="code" v-if="yzmFlag==true">{{msg}}</text>
                       <text class="disimg" v-else>{{msg}}({{soudes}}s)</text>
                </div>
            </div>

        </div>

        <div class="button-area">
            <div class="button" @click="doResetPassword">
                <text class="button-text">下一步</text>
            </div>
        </div>

    </scroller>
</template>


<style scoped>
.home {
  width: 750px;
  height: 1500px;
  background-color: rgb(240, 240, 240);
}

.border {
  /*margin: 1px;*/
  /*border-width: 1px;*/
  /*border-color: red;*/
  /*border-style: solid;*/
}

.row {
  background-color: white;
  width: 750px;
  height: 88px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.tip {
  width: 750px;
  height: 50px;
  margin-top: 126px;
  /*margin-bottom: 5px;*/
  background-color: white;
}

.tip-text {
  font-size: 26px;
  margin-left: 20px;
  line-height: 50px;
  color: rgb(102, 102, 102);
}

.text-area {
  width: 200px;
  height: 88px;
  flex-direction: row;
  align-items: center;
}

.text {
  font-size: 30px;
  margin-left: 36px;
  color: rgb(102, 102, 102);
}

.input-area {
  width: 500px;
  height: 80px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.input {
  height: 60px;
  width: 280px;
  font-size: 30px;
  padding-right: 36px;
  text-align: right;
}
.bankcard {
  width: 550px;
}

.input-text {
  font-size: 30px;
  margin-right: 36px;
  color: rgb(102, 102, 102);
}
.getcode {
  margin-right: 36px;
}
.code {
  height: 60px;
  width: 190px;
  color: rgb(209, 154, 95);
  font-size: 28px;
  text-align: center;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgb(209, 154, 95);

  line-height: 60px;
}
.disimg {
  display: block;
  height: 60px;
  width: 190px;
  font-size: 28px;
  text-align: center;
  align-self: center;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgb(153, 153, 153);
  color: rgb(153, 153, 153);
  line-height: 60px;
}
.button-area {
  width: 750px;
  height: 88px;
  margin-top: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.button {
  width: 678px;
  height: 88px;
  background-color: rgb(230, 60, 80);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.button-text {
  font-size: 30px;
  color: white;
  font-weight: bold;
}
</style>

<script>
import Title from "@/components/common/titlebar_func.vue";
const modal = weex.requireModule("modal");
const context = weex.requireModule('context');
export default {
  components: { Title },
  data() {
    return {
      phoneNumber: "", //签约手机号
      userLevel: 1, //用户级别
      code: "", //输入的验证码
      msgCode: "", //获取的验证码
      bankCardId: "", //卡号或帐号
      password: "", //密码
      yzmFlag: true, //是否倒计时
      msg: "获取验证码", //获取验证码按钮默认值
      soudes: "" //倒计时
    };
  },
  created() {
    this.phoneNumber = context.sessionGetString('mobile');
  },
  methods: {
    
    doResetPassword() {
      if (this.checkData()) {
        // this.jump("/SetPassword")
        this.resetPassword();
      }
    },
    //重值密码请求
    resetPassword() {
      var data = {
        AcNo: this.bankCardId,
        TrsPassword: this.password,
        OTPPassword: this.msgCode
      };
      this.postDo(
        "UserInfoNoLoginCheck.do",
        data,
        success => {
          modal.toast({ message: success._RejCode });
          if (success._RejCode == "000000") {
           
            this.jump("/SetPassword");
          }
        },
        fail => {
          modal.toast({ message: fail._RejMessage, duration: 2 });
         // modal.toast({ message: fail._RejCode, duration: 5 });
          // if (fail._RejCode == "999999") {
          //   this.jump("/SetPassword");
          // }
        }
      );
    },
    //前端数据验证
    checkData() {
      let flag = true;

      if (this.bankCardId.length < 6) {
        this.alertMsg("请输入有效账号或卡号！");
        flag = false;
        return flag;
      }
      if (this.password == "") {
        this.alertMsg("请输入取款密码");
        flag = false;
        return flag;
      }
      if (this.code == "") {
        this.alertMsg("请输入验证码");
        flag = false;
        return flag;
      }
      if (this.code != this.msgCode) {
        this.alertMsg("验证码不正确");
        flag = false;
        return flag;
      }

      return flag;
    },
    //获取输入帐号
    getBankCard(event) {
      this.bankCardId = event.value;
    },
    //获取输入密码
    getPassword(event) {
      this.password = event.value;
    },
    //获取输入的验证码
    getCode(event) {
      this.code = event.value;
    },
    //获取验证码请求
    getMsgCode() {
      //改变按钮状态
      if (this.yzmFlag) {
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
        }
      }
      var data = {
        TransCode: "ResetPassword"
      };
      //发送请求
      this.postDo(
        "OtpMessageSend.do",
        data,
        data => {
          this.alertMsg(
            data.MsgTip + "短信验证码为：" + data._OTPToken.uniqueId
          );
          this.msgCode = data._OTPToken.uniqueId;
        },
        data => {
          // this.alertMsg(data._RejCode);
          this.alertMsg(data._ErrCodeType);
          clearInterval(that.timer);
          that.msg = "获取验证码";
          that.yzmFlag = true;
        }
      );
    }
  }
};
</script>