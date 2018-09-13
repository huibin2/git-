<template>
    <scroller class="home">
        <title class="border" titleJson="resetPassword/setpwd_title.json"></title>

        <div style="height: 140px;"></div>
        <div class="border row">
            <div class="border text-area" >
                <text class="border text">登录密码</text>
            </div>
            <div class="border input-area">
                <input class="border input" type="password" maxlength="12" minlength="6" placeholder="6-12位字母和数字组合" @input="getPassword">
            </div>
        </div>
        <div style="height: 2px;"></div>
        <div class="border row">
            <div class="border text-area" >
                <text class="border text">确认登录密码</text>
            </div>
            <div class="border input-area">
                <input class="border input" type="password" maxlength="12" minlength="6" placeholder="请再次输入登录密码" @input="getPwdConf">
            </div>
        </div>

        <div style="height: 10px;"></div>
        <div class="border row">
            <div class="border text-area" >
                <text class="border text">预留信息</text>
            </div>
            <div class="border input-area">
                <input class="border input" type="text" maxlength="11" placeholder="选填，10个汉字" @input="getPreMessage">
            </div>
        </div>

        <!--<div style="height: 2px;"></div>-->

        <!--<div class="border row">-->
            <!--<div class="border text-area">-->
                <!--<text class="border text">短信验证码</text>-->
            <!--</div>-->
            <!--<div class="border input-area">-->
                <!--<input class="border input" style="padding-right: 20px;" type="tel" maxlength="6" placeholder="请输入短信验证码">-->
                <!--<div class="code">-->
                    <!--<text class="code-text">获取验证码</text>-->
                <!--</div>-->
            <!--</div>-->

        <!--</div>-->

        <div class="button-area">
            <div class="button" @click="toNext">
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
  width: 300px;
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
  width: 450px;
  height: 80px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center; /*上下居中*/
}

.input {
  height: 60px;
  width: 400px;
  font-size: 30px;
  padding-right: 36px;
  text-align: right;
}

.input-text {
  font-size: 30px;
  margin-right: 36px;
  color: rgb(102, 102, 102);
}

.code {
  margin-right: 36px;
  width: 190px;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: rgb(209, 154, 95);
  border-style: solid;
  border-radius: 10px;
}

.code-text {
  font-size: 28px;
  color: rgb(209, 154, 95);
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
const context = weex.requireModule("context");
const modal = weex.requireModule("modal");
export default {
  components: { Title },
  data() {
    return {
      password: "", //密码
      PwdConfirm: "", //确认密码
      preMessage: "", //预留信息
      _tokenName: "" //防重码
    };
  },
  created() {
    this.getTokenName();
  },
  methods: {
    //获取防重码
    getTokenName() {
    var data = {};
      this.postDo(
        "GenToken.do",
        data,
        success => {
          modal.toast({ message: success._RejCode, duration: 2 });
          this._tokenName = success._tokenName;
        },
        fail => {
          modal.toast({ message: fail._RejMessage, duration: 2 });
        }
      );
    },
    //获取输入的新密码
    getPassword(event) {
      this.password = event.value;
    },
    //确认密码
    getPwdConf(event) {
      this.PwdConfirm = event.value;
    },
    //预留信息
    getPreMessage(event) {
      this.preMessage = event.value;
    },
    //验证数据
    checkData() {
      let flag = true;
      var exp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/; //密码格式正则表达式
      if (this.password == "" || this.PwdConfirm == "") {
        this.alertMsg("请输入完整数据");
        flag = false;
        return flag;
      }
      if (this.password != this.PwdConfirm) {
        this.alertMsg("两次密码输入不一致");
        flag = false;
        return flag;
      }
      if (this.preMessage =='') {
        this.alertMsg('预留信息不能为空');
        flag = false;
        return flag;
      }

      if (!exp.test(this.password) || !exp.test(this.PwdConfirm)) {
        this.alertMsg("密码格式为6-12位数字字母，请检查后重新输入");
        flag = false;
        return flag;
      }

      return flag;
    },
    //下一步
    toNext() {
      if (this.checkData()) {
        this.resetPwd();
      }
    },
    //密码重置完退出登录
    logout() {
    var data = {};
      this.postDo(
        "Logout.do",
        data,
        success => {
          modal.toast({ message: success._RejCode, duration: 2 });
         context.clearToken();
         this.jump("/SetPasswordResult");
        },
        fail => {
          this.alertMsg(fail._RejMessage);
  
        }
      );
    },
    //重置密码请求
    resetPwd() {
      var data = {
        NewPassword: this.password,
        ConfirmPassword: this.PwdConfirm,
        CustomLabel: this.preMessage,
        _tokenName: this._tokenName
      };

      this.postDo(
        "ResetPassword.do",
        data,
        success => {
          modal.toast({ message: success._RejCode, duration: 2 });
           context.clearToken();
          this.logout();
         
        },
        fail => {
          modal.alertMsg({
            message: fail._RejMessage,
            duration: 3
          });
         
        }
      );
    }
  }
};
</script>