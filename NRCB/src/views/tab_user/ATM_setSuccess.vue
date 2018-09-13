<template>
    <div class="container">
        <title class="titlebar" titleJson="tab_user/safe_set/ATM_titlebar.json"></title>
        <scroller>
            
            <!-- <image @click="goBack" class="left_icon" src="./imgs/right.png"/> -->

            <div class="img_area">
                <image class="successImg" src="./imgs/register/success.png" />
                <text class="text">ATM限额修改成功</text>
            </div>

           
            <!-- <div class="button4" @click="toregister"><text class="text1">继续完成开户</text></div> -->
            <!-- <div class="button5" @click="registSec2"><text class="text1">我不是本行客户，我要开电子账户</text></div> -->
            <div class="button4" @click="confirm"><text class="text1">返回</text></div>
        </scroller>
       
    </div>

</template>
<style scoped>
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

  margin-bottom: 50px;
  border-radius: 53.4975px;
  background-color: #00a0e8;
  justify-content: center;
  align-items: center;
}
.button4 {
  height: 88px;
  margin-left: 36px;
  margin-right: 36px;
  /* margin-bottom:76.5px; */
  /* margin-top:42.5px; */
  margin-top: 42px;
  /* margin-bottom: 20px; */
  border-radius: 10px;
  background-color: #efeff4;
  justify-content: center;
  align-items: center;
  border-color: #f00000;
  border-width: 2px;
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
.container {
  background-color: #efeff4;
  height: 1180px;
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
  margin-top: 148px;
  background-color: white;
  /* margin-top: -34px; */
  width: 750px;
  height: 400px;
}
.successImg {
  width: 114px;
  height: 114px;
  margin-top: 100px;
  margin-left: 323px;
}
.text {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: green;
  font-weight: bold;
  letter-spacing: -0.55px;
  line-height: 86px;
  text-align: center;
}
.text1 {
  font-size: 32px;
  color: #f00000;
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
      context.launchStage("main.safeSet")
    }
  }
};
</script>