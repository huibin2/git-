<template>
  <div @clickbackitem="goBack"  @viewappear="viewappear">
    <!--主界面-->
    <router-view style="flex:1"></router-view>
    <the-mask></the-mask>
    <confirm v-if="$store.state.show" :data="data" @confirm="confirm" @cancel="cancel"></confirm>
  </div>
</template>

<script>

const context = weex.requireModule("context");
const modal = weex.requireModule("modal");

import TheMask from "@/components/TheMask.vue" 
import confirm from "@/components/common/confirm.vue";
export default {
  components:{TheMask,confirm},
  data() {
    return {
    data:{
      "text":"是否确认退出客户端？",
      "ok":"确定",
      "cancel":"取消"
      }
    };
  },
  created() {
    this.$store.state.deviceModel = WXEnvironment.deviceModel;
    fingerprint.isHardwareEnable(
      data => {
        this.$store.state.isFingerProvided = data;
       
      } 
    );    
  },
  methods:{
    confirm() {
      context.shutdown();
    },
    cancel() {
      this.$store.state.show = false;
    },
    viewappear() {
				let islogin = context.sessionGetString("isLogin");
				if(islogin=='true'){
					this.$store.state.login=true;
				}else{
					this.$store.state.login=false;
				}
				// modal.alert({
				// 	message: context.sessionGetString("qrCode")
				// })
			}
  }
};
</script>
