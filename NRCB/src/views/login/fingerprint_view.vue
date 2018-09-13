<template>
  <scroller class="home">
    <title titleJson="login/titlebar2.json"></title>
    <!--<Fingerprint class="center"></Fingerprint>-->
    <NoFirstLogin :name="name" :url="url" :is-pwd="isPwd" nowLoginPage="FINGERPRINT">
      <div class="finger_click" @click="fingerLogin">
        <image class="click_img" src="./imgs/login/fingerprint.png"></image>
        <text class="click_text">点击登录</text>
      </div>
    </NoFirstLogin>
    <confirm v-if="alertShow" @cancel="cancel":data="data"></confirm>
  </scroller>
</template>
<style scoped>
.center {
  top: 140px;
}
.finger_click {
  width: 750px;
  height: 300px;
  margin-top: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.click_img {
  width: 120px;
  height: 120px;
}
.click_text {
  font-size: 30px;
  margin-top: 20px;
}
</style>

<script>

// import Fingerprint from "@/components/login/fingerprintLogin.vue";
import Title from "@/components/login/titlebar_component.vue";
import NoFirstLogin from "@/components/login/nofirstlogin_component.vue";
import Confirm from "@/components/common/confirm.vue";
const fingerprint = weex.requireModule("fingerprint");
const modal = weex.requireModule("modal");


export default {
  components: {
      // Fingerprint,
      NoFirstLogin,
      Title,
      Confirm
  },
  data() {
    return {
        name: '123****3456',
        url: './imgs/login/login_tx.png',
        isPwd: false,
        alertShow:false,
        isDeviceEabled: false,
        data:{
          "img_url":"imgs/login/fingerprint.png",
          "text":"请验证指纹",
          "cancel":"取消"
        }
    };
  },
  created() {
      fingerprint.isHardwareEnable(data => {
          if (data == 1) {
              this.isDeviceEabled = true;
          }
      })
  },
  methods: {
    cancel() {
      this.alertShow = false;
    },

    fingerLogin(){
        if(!this.isDeviceEabled) {
            modal.alert({
                message: '该设备不支持指纹登录'
            });
            return ;
        }
      this.alertShow=true;
      fingerprint.identify(data => {
        if (data == "1") {
          modal.toast({
            message: "指纹验证成功",
            duration: 3
          });
          this.alertShow = false;
        } else {
          modal.toast({
            message: "指纹验证失败",
            duration: 3
          });
          this.alertShow = false;
        }
      });
    }
  }
};
</script>