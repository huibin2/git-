<template>
   <scroller class="home" >
    <title class="titlebar" titleJson="register/titlebaraccount.json"></title>
	   
      <div class="wrapper">
            <div class="img_area">
                <image class="successImg" src="./imgs/suc.png" />
                <text class="text2">账户加挂成功</text>
                <text class="text3">您可以通过手机银行查询您的账户及其交易信息</text>
            </div>
		   <div  class="button4"  @click="registSec"><text class="text">马上登陆查看</text></div>
	
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
    font-size: 28px;
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
  font-size: 36px;
  color: #ffffff;
  font-weight:  Bold;
}
</style>
<script>
import Title from "@/components/common/titlebar_func.vue";
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
export default {
  components: { Title },
  data() {
  },
  created() {
  },
  methods: {
    registSec() {
        this.toregister();
    },
    toregister() {
      context.launchStage('main.login');
    },
  }
};
</script>