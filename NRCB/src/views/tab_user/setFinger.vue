<template>
  <div>
    <title-bar titleJson="tab_user/safe_set/finger_titlebar.json"></title-bar>
    <scroller class="home">
      <div class="container">
        <div class="option">
            <text class="text">指纹登录</text>
            <switch class="switch" @change="func()" :checked="fingerFlag=='Y'"></switch>
        </div>
        <div class="desc">
        <text class="desc">开启后可使用指纹认证完成快速登录，设置仅对本机生效。如需修改指纹，请在系统设置中操作。</text>
        </div>
    </div>
    <confirm v-if="showConf" :data="data" @confirm="confirm" @cancel="cancel"></confirm>
  </scroller>
  </div>
</template>

<style>
.home {
  width: 750px;
  background-color: rgb(240, 240, 240);
}
.option {
  height: 88px;
  margin: 20px 0px 20px 0px;
  padding: 0px 36px 0px 36px;
  width: 750px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
}
.text {
  font-size: 30px;
  color: rgb(102, 102, 102);
  height: 88px;
  line-height: 88px;
}
.switch {
  height: 60px;
}
.desc {
  padding: 20px 18px 20px 18px;
  font-size: 28px;
}
</style>

<script>
import TitleBar from "@/components/common/titlebar_func.vue";
import Confirm from "@/components/common/confirm.vue";

const modal = weex.requireModule("modal");
const fingerprint = weex.requireModule("fingerprint");
const context = weex.requireModule("context");

export default {
  components: {
    TitleBar,
    Confirm
  },
  data() {
    return {
      fingerFlag: "", //指纹登陆是否启用
      showConf: false,
      fingerShow: false,
      isOpen: this.flag,
      data: {},
      log_info: {
        data1: {
          img_url: "imgs/login/fingerprint.png",
          text: "请验证指纹",
          cancel: "取消"
        },
        data2: {
          text: "是否关闭指纹登录？",
          ok: "确定",
          cancel: "取消"
        }
      }
    };
  },
  created(){
    this.fingerFlag = context.secureGetString("FingerFlag");
  },
  methods: {
    confirm() {
      this.fingerFlag = "N";
      this.showConf = false;
      context.secureSetString("FingerFlag", this.fingerFlag);
    },

    cancel() {
      if(this.data === this.log_info.data1){
        this.fingerFlag = "N";
      }else if(this.data === this.log_info.data2){
        this.fingerFlag = 'Y';
      }
      this.showConf = false;
      context.finishStage();
      context.secureSetString("FingerFlag", this.fingerFlag);
    },

    func() {
      if (this.fingerFlag != 'Y') {
        this.data = this.log_info.data1;
        //开启指纹登录
        this.fingerShow = true;
        this.fingerFlag = "Y";
        fingerprint.identify(data => {
          if (data == "1") {
            this.fingerFlag = 'Y';
            modal.toast({
              message: "指纹验证成功",
              duration: 3
            });
            context.secureSetString("FingerFlag", this.fingerFlag);
            this.showConf = false;
          } else {
            this.fingerFlag = "N";
            modal.toast({
              message: "指纹验证失败",
              duration: 3
            });
            context.secureSetString("FingerFlag", this.fingerFlag);
            this.showConf = false;
          }
        });
      } else {
        this.data = this.log_info.data2;
        //关闭指纹登录
        this.fingerFlag = "N";
        this.fingerShow = false;
      }
      this.showConf = true;

      // if(this.flag){
      // }else{
      //     this.showConf = true;
      // }
    }
  }
};
</script>
