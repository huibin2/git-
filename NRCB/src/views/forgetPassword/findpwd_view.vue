<template>
    <scroller class="home">
        <title titleJson="./login/findpwd_title.json"></title>
        <div style="height: 140px;"></div>
        <div class="border row">
            <div class="border text-area" >
                <text class="border text">登录密码</text>
            </div>
            <div class="border input-area">
                <input class="border input" type="password" v-model="password" minlength="6" maxlength="12" placeholder="6-12位字母和数字组合">
            </div>
        </div>

        <div style="height: 2px;"></div>

        <div class="border row">
            <div class="border text-area">
                <text class="border text">确认密码</text>
            </div>
            <div class="border input-area">
                <input class="border input" type="password" v-model="password_copy" minlength="6" maxlength="12" placeholder="请再次确认密码">
            </div>

        </div>

        <div class="button-area">
            <div class="button" @click="confirmPwd">
                <text class="button-text">确定</text>
            </div>
        </div>
    </scroller>
</template>

<script>
import Title from "@/components/common/titlebar_func.vue";
const modal = weex.requireModule("modal");

export default {
  components: { Title },
  data() {
    return {

      password: "", //首次输入密码
      password_copy: "", //确认密码
      _tokenName:"",     //防重码
      form:{}, //接收自上一页
      phoneNumber:"",
    };
  },
  created() {
      this.getToken();
  },
  mounted() {
    this.form = this.$route.params.form;
    this.phoneNumber = this.form.phoneNumber;
  },
  methods: {
    getToken() {
      //获取防重码 -- 发送重置登录页面前
      this.postDo(  
        "GenToken.do",
        {},
        success => {
          this._tokenName = success._tokenName;
        },
        failture => {
          this.alertMsg(failture._RejMessage);
        }
      );
    },
    confirmPwd() {
      if (this.password == "") {
        this.alertMsg("请输入密码");
        return;
      }
      var exp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;  //密码格式正则表达式
      if (
        !exp.test(this.password) ||
        !exp.test(this.password_copy)
      ) {
        this.alertMsg("密码格式为6-12位数字字母，请检查后重新输入");
        return;
      }
      
      if (this.password_copy == "") {
        this.alertMsg("请输入确认密码");
        return;
      }

      if (this.password == this.password_copy) {
        var params = {
          MobilePhone:this.phoneNumber,
          NewPassword:this.password,
          ConfirmPassword:this.password_copy,
          _tokenName:this._tokenName
        };
        this.postDo(
          "ForgetPassword.do",
          params,
          success => {
            this.jump("/FindPasswordResult");
          },
          failture => {
            this.alertMsg(failture._RejMessage);
            this.getToken();
          }
        );
      } else {
        this.alertMsg("两次密码输入不一致");
      }
    },
    
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
  width: 350px;
  font-size: 30px;
  padding-right: 36px;
  text-align: right;
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