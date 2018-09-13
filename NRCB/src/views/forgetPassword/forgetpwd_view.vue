<template>
    <scroller class="home">
        <title titleJson="./login/forgetpwd_title.json"></title>
        <div style="height: 140px;"></div>
        <div class="border row">
            <div class="border text-area" >
                <text class="border text">签约手机号</text>
            </div>
            <div class="border input-area">
                <input class="border input" type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入签约手机号">
            </div>
        </div>

        <div style="height: 2px;"></div>

        <div class="border row">
            <div class="border text-area">
                <text class="border text">短信验证码</text>
            </div>
            <div class="border input-area">
                <input class="border input short-right" v-model="yzm" type="tel" maxlength="6" placeholder="请输入短信验证码">
                <div class="code" @click="changeYZM()">
                  <text class="code-text" v-if="yzmFlag==true">{{msg1}}</text>
                  <text class="disimg" v-else>{{msg1}}({{n}}s)</text>
                </div>
            </div>

        </div>

        <div class="button-area">
            <div class="button" @click="check">
                <text class="button-text">下一步</text>
            </div>
        </div>

    </scroller>
</template>

<script>
import Title from "@/components/common/titlebar_func.vue";
const stream = weex.requireModule("stream");
const modal = weex.requireModule("modal");
export default {
  components: { Title },
  data() {
    return {
      //验证码相关
      msg1: "获取验证码",
      n: "", //秒数
      timer: "",
      yzmFlag: true,

      phoneNumber: "", //签约手机号
      yzm: "", //输入的短信验证码
      verifyCode: "", //获取的短信验证码
      msgTip: "", //短信回显内容

      //页面传递数据
      form: {}
    };
  },
  created() {},
  methods: {
    //获取验证码
    changeYZM() {
      if(this.phoneNumber!=""){
        if (this.yzmFlag) {
          this.yzmFlag = false;
          clearInterval(this.timer);
          if (!this.n) {
            this.msg1 = "重新获取";
            this.n = "60";
            var that = this;
            this.timer = setInterval(function() {
              that.n--;
              if (that.n <= 0) {
                clearInterval(that.timer);
                that.msg1 = "获取验证码";
                that.n = "";
                that.s = "";
                that.yzmFlag = true;
              }
            }, 1000);
            var params = {
              MobilePhone: this.phoneNumber,
              TransCode: "ForgetPassword"
            };
            this.postDo(
              "PublicOtpMessageSend.do",
              params,
              success => {
                this.alertMsg(success.MsgTip);
                this.alertMsg(success._OTPToken.uniqueId);
                this.verifyCode = success._OTPToken.uniqueId;
              },
              failture => {
                this.alertMsg(failture._RejMessage);
              }
            );
          }
        }
      }else{
        this.alertMsg("手机号不能为空");
      }
    },

    check() {
      // this.jumpTo("/FindPasswordResult");
      if (this.phoneNumber == "" || this.phoneNumber.length != 11) {
        this.alertMsg("手机号输入有误，请重新输入");
        return;
      }
      if (this.yzm == "" || this.yzm.length != 6) {
        this.alertMsg("验证码输入有误，请重新输入");
        return;
      }
      if (this.yzm == this.verifyCode) {
        // this.jump("/FindPassword");//验证用户等级接口返回 “客户未开通该渠道” 
        var params = {
          MobilePhone: this.phoneNumber,
          OTPPassword: this.yzm
        };
        this.postDo(
          "UserLevelQry.do",
          params,
          success => {
            var userLevel = success.UserLevel;
            if (userLevel == "R") {
              //0级用户
              this.toSend("FindPassword");
            } else if (userLevel == "P") {
              //1级用户
              this.toSend("Identify_P");
            } else if (userLevel == "T") {
              //2级用户
              this.toSend("Identify_T");

            }else{
              this.alertMsg("用户级别获取失败");
            }
          },
          failture => {
            this.alertMsg(failture._RejMessage);
          }
        );
      } else {
        this.alertMsg("验证码不正确");
      }

    },
    toSend(to){  //向下一页面传值
      this.form = {
          phoneNumber: this.phoneNumber,
      };
    
      let param = {
        name: to,
        params: {
          form: this.form
        }
      };

      this.$router.push(param);
    }
  }
};
</script>

<style scoped>
.home {
  width: 750px;
  height: 1500px;
  background-color: rgb(240, 240, 240);
}

.row {
  background-color: white;
  width: 750px;
  height: 88px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.text-area {
  width: 230px;
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
  width: 520px;
  height: 80px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center; /*上下居中*/
}

.input {
  height: 60px;
  width: 300px;
  font-size: 30px;
  padding-right: 36px;
  text-align: right;
}

.short-right {
    padding-right: 20px;
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
  height: 60px;
  width: 190px;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
  color: rgb(209, 154, 95);
}
.disimg {
  display: block;
  height: 60px;
  line-height: 60px;
  width: 190px;
  font-size: 28px;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgb(153, 153, 153);
  color: rgb(153, 153, 153);
  text-align: center;
  align-self: center;
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