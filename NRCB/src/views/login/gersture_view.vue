<template>
    <scroller class="home">
    <title titleJson="login/titlebar1.json"></title>
      <NoFirstLogin :name="name" :url="url" :is-pwd="isPwd" nowLoginPage="GESTURE">
        <div style="flex-direction: row;justify-content: center">
            <weex-lockview ref="lockview" style="margin-top: 50px;width: 500px;height: 500px;" @onComplete="onComplete" lineWidth="8" normalColor="#B4B4B4" selectColor="#D80A30" errorColor="#007EFF" ratio="0.6"></weex-lockview>
        </div>

      </NoFirstLogin>


  </scroller>
</template>
<style scoped>
.center{
    top:140px;
    background-color: #B4B4B4;
    color: #D80A30;
    border-color: #007EFF;
}

</style>

<script>

import NoFirstLogin from "@/components/login/nofirstlogin_component.vue";
import Title from "@/components/login/titlebar_component.vue";


export default {
  components: {NoFirstLogin,Title},
  data() {
    return {
        defaultSelected:'',
        name: '123****3456',
        url: './imgs/login/login_tx.png',
        isPwd: false,
        count:0,        //解锁次数
        text:"",
    };
  },
  created() {},
  methods: {
      onComplete(event) {
        this.$refs.lockview.error();
        this.text = event.text;
        if(this.text!="1236"){
            this.count++;
        }else{
            this.count = 0;
        }
        if(this.count>3){
            this.alertMsg("手势密码登录连续错误3次，手势密码被锁定，重置手势密码后可使用");
            this.$refs.lockview.inStealthMode = "hide";
        }
      }
  }
};
</script>