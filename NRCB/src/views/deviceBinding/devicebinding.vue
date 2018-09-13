<template>
    <scroller class="home">
        <title titleJson="./deviceBinding/devicebinding_title.json"></title>
        <div style="height: 125px;"></div>
        <div class="border row row-height">
            <div class="border text-area text-area-width">
                <!-- （编号{{number}}） -->
                <text class="border text width">为了您的资金安全，我行将向您尾号{{phoneNumber}}的签约手机号发送短信验证码，请收到后在下面输入。</text>
            </div>
        </div>

        <div style="height: 2px;"></div>
        <div class="banker-bottom">
			<text class="title">短信验证码</text>
                <div class="right">
                <input ref="msgcoderef" v-model="yzm" type="number" class="tit1" maxLength="6" placeholder="请输入短信验证码" @input="getMsgCode"/>
                    <div class="getcode" @click="changeYZM()">
                        <text class="code" v-if="yzmFlag==true">{{msg}}</text>
                        <text class="disimg" v-else>{{msg1}}({{soudes}}s)</text> 
                    </div>
                </div>
		</div> 
        <div class="button-area">
            <div class="button" @click="deviceBind">
                <text class="button-text">确定</text>
            </div>
        </div>
    </scroller>
</template>

<script>
    import Title from "@/components/login/titlebar_component.vue";

    export default {
        components: {Title},
        data(){
            return {
                //倒计时
                soudes: "", //倒计时
                msg: "获取验证码",  //验证码提示框
                msg1:"重新获取",
                yzmFlag: true,
                timer: "",
                tokenName:"",
                phoneNumber: '5555',
                number: '001',
                mobile:"",
                alertShow: false,
                yzm: "", //输入的短信验证码
            };
        },
        created() {
            this.getToken();
            // this.mobile=context.sessionGetString('mobile');
            // this.phoneNumber=this.mobile.substr(7,11);
            // this.alertMsg('mobile'+this.mobile+'phoneNumber'+this.phoneNumber);
        },
        methods: {
            getToken(){
		  	this.postDo("GenToken.do",{},data =>{
        this.tokenName=data._tokenName;
			  });
		  },
    changeYZM() {
      if (this.yzmFlag) {
          this.postDo('OtpMessageSend.do', {
                            TransCode: 'CheckUserDevice'//绑定设备场景
                        }, data => {
                            this.alertMsg(data.MsgTip+'短信验证码为：'+data._OTPToken.uniqueId);
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
    },
            deviceBind() {
                this.postDo('CheckUserDevice.do', {
                    OTPPassword: this.yzm,
                    _tokenName:this.tokenName
                }, data => {
                    this.jump('/DeviceBindingResult');
                }, data => {
                    this.getToken();
                    this.alertMsg(data._RejMessage);
                })
            }
        }
    }
</script>

<style scoped>
    .home {
        width: 750px;
        height: 1500px;
        background-color: rgb(240, 240, 240);
    }
    .title {
  font-size: 30px;
  line-height: 88px;
  margin-left: 36px;
  color: rgb(102,102,102);
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
.getcode{
  justify-content: center;
  align-items: center;
  margin-right: 36px;
}
.right {
  height: 88px;
  width:500px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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

    .row {
        background-color: white;
        width: 750px;
        height: 88px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .row-height {
        height: 100px;
    }

    .text-area {
        width: 230px;
        height: 88px;
        flex-direction: row;
        align-items: center;
    }

    .text-area-width {
        height: 100px;
        width: 750px;
    }

    .text {
        font-size: 30px;
        margin-left: 36px;
        color: rgb(102, 102, 102);
    }

    .width {
        width: 678px;
    }

    .input-area {
        width: 520px;
        height: 80px;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;  /*上下居中*/
    }

    .input {
        height: 60px;
        width: 350px;
        font-size: 30px;
        padding-right: 36px;
        text-align: right;
    }

    .input-width {
        padding-right: 20px;
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