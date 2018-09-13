<template>
  <div>
    <title v-if="user_gesture" titleJson="tab_user/safe_set/gestureSeted_titlebar.json"></title>
    <title v-else titleJson="tab_user/safe_set/gestureNoSet_titlebar.json"></title>
    <scroller class="container">
        <div class="home">
        <!-- 根据用户登录情况，显示不同页面，当user_gesture为true时，为已设置手势登录，为false时，为未设置手势登录。 -->
    <div v-if="user_gesture" style="background-color:white;">
        <div class="banker-bottom" @click="CloseGestureLock">
                <image class="img" src="./imgs/tab_user/safe_set/ic_set_ssmmsz.png"/>
                <text class="title">关闭手势登录</text>
        </div>
        <div class="line"></div>
        <div class="banker-bottom" @click="VerifyGestureLock">
                <image class="img" src="./imgs/tab_user/safe_set/ic_set_ssmmsz.png"/>
                <text class="title">修改手势登录</text>
        </div>
    </div>
    <div v-else>
        <div class="banker-bottom" @click="SetGestureLock">
                <image class="img" src="./imgs/tab_user/safe_set/ic_set_ssmmsz.png"/>
                <text class="title">开通手势登录</text>
        </div>
    </div>
  

    </div>
  </scroller>
  </div>
</template>
<style scoped>
.container {
  width: 750px;
  background-color: rgb(240, 240, 240);
}
.home {
  background-color: rgb(255, 255, 255);
  margin-top: 20px;
}

.line{
      height: 3px;
  /* width: 500px; */
  background-color: #efeff4;
  margin-left: 36px;
}
.title{
    margin-left: 20px;
    font-size: 30px;
}
.img-right{
    width: 40px;
    height: 38px;
    margin-right: 36px;
}
.banker-left{
    flex-direction: row;
    justify-content: flex-start;
    text-align: center;
}
.center{
    top:140px;
    background-color: #B4B4B4;
    color: #D80A30;
    border-color: #007EFF;
}
.home {
  /* margin-top: 118px; */
  width: 750px;
  background-color: #efeff4;
}
.banker-bottom{
  height: 88px;
  width: 750px;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  line-height: 88px;
  background-color: #ffffff;
}
.img{
    width: 42px;
    height:38px;
    margin-left: 36px;
}
</style>

<script>

import Title from "@/components/common/titlebar_func.vue";
const context = weex.requireModule("context");

export default {
  components: {Title},
  data() {
    return {
        data:'123',
        user_gesture_lock:'',
        user_gesture:false,
    };
  },
  created() {
      this.user_gesture_lock=context.secureGetString('user_gesture_lock'); 
      if(context.secureGetString('GrapFlag') == 'true'){
          this.user_gesture=true;
      }else if(context.secureGetString('GrapFlag') == 'false'){
          this.user_gesture=false;
      };  
    //   this.alertMsg(this.user_gesture);
  },
  methods: {
      VerifyGestureLock(){
          this.jump("/VerifyTestGestureLock");
      },
      CloseGestureLock(){
          this.jump("/CloseGestureLock");

      },
      SetGestureLock(){
          
          this.jump("/SetGestureLock");
      },
      onComplete() {
          this.$refs.lockview.error();
      }
  }
};
</script>