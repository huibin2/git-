<template>
    <div class="container">
        
        <scroller>
            <title class="titlebar" titleJson="register/titlebarresult.json"></title>
            <div class="img_area">
                <image class="successImg" src="./imgs/register/success.png" />
                <text class="text">验证不通过</text>
            </div>
            <div class="button4" @click="toregister"><text class="text1">返回首页</text></div>
            
        </scroller>
       
    </div>

</template>
<style scoped>
    .login{
        justify-content: center;
        align-items: center;
        margin-top: 48px;
    }
    .button4{
        height: 88px;
	    margin-left:36px;
        margin-right: 36px;
        margin-top: 42px;
	    border-radius: 10px ;
	    background-color: #EFEFF4 ;
        justify-content: center;
        align-items: center;
        border-color: rgb(216,10,48);
        border-width:2px;	
    }
    .tip2{
        font-size: 30px;
        color: rgb(102,102,102);
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
        background-color: #EFEFF4;
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
        font-size: 32px;
        color:red;
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
       toregister(){
       }
  },
   
};
</script>