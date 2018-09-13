<template>
    <div class="container">
        <scroller>
            <title class="titlebar" titleJson="register/titlebarresult.json"></title>
            <div class="img_area">
                <image class="successImg" src="./imgs/suc.png" />
                <text class="text">注册成功</text>
            </div>
            <div class="tip">
                <text class="tip1">已为您开通手机银行服务</text>
                <text class="tip1">您可通过手机号及登陆密码登陆我行手机银行</text>
            </div>
            <div class="button4" @click="registSec2"><text class="text1">我是本行客户，直接加挂账户</text></div>
            <div class="button5" @click="toregister"><text class="text1">我不是本行客户，我要开电子账户</text></div>
            <div class="login" @click="confirm"><text class="tip2">不了,我要登录</text></div>
        </scroller> 
    </div>

</template>
<style scoped>
    .login{
        justify-content: center;
        align-items: center;
    }
    .button5{
        height: 88px;
	    margin-left:36px;
        margin-right: 36px;
        margin-top: 20;
        margin-bottom: 20px;
	    border-radius: 10px ;
	    background-color: white ;
        justify-content: center;
        align-items: center;
        border-color: rgb(216,10,48);
        border-width:2px;	
    }
    .button4{
        height: 88px;
	    margin-left:36px;
        margin-right: 36px;
        margin-top: 42px;
        margin-bottom: 20px;
	    border-radius: 10px ;
	    background-color: white ;
        justify-content: center;
        align-items: center;
        border-color: rgb(216,10,48);
        border-width:2px;	
    }
    .tip2{
        font-size: 34px;
        color: #666666;
        text-decoration:underline;
    }
    .tip1{
        font-size: 30px;
        color: #666666;
    }
    .tip{
        margin-top: 30px;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }
    .container{
        background-color: white;
        height: 1180px;
    }
    .titlebar{
	background-color: #FFFFFF;
	width: 750px;
	border: 15px;
}
    /* 返回按钮 */
    .left_icon{
        width: 18px;
        height: 35px;
        top: -60px;
        left: 20px;
    }
    .img_area{
        margin-top: 100px;
        background-color: white;
        /* margin-top: -34px; */
        width: 750px;
        height: 300px;
    }
    .successImg{
        width: 114px;
        height: 114px;
        margin-top: 59px;
        margin-left: 323px;
    }
    .text{
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: green;
        font-weight: bold;
        letter-spacing: -0.55px;
        margin-top: 49px;
        left: 315px;
    }
    .text1{
        font-size: 36px;
        color:rgb(216,10,48);
    }
    .confirm{
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
components: { Title},
  data() {
    return {};
  },
  created() {},
  methods: {
      // 确认按钮
      confirm(){
          context.sessionSetString('ResInfo','');
        //   context.finish();
             this.jump('/Login');
      },
      registSec2(){
          this.jump('/RegisterAccount');
      },
             toregister(){
                 this.jump("/RegisterCif");
            }
  },
   
};
</script>