<template>
    <scroller class="home">
    <title titleJson="tab_user/safe_set/gestureTestSet_titlebar.json"></title>
        <div style="flex-direction: row;justify-content: center;">
            <weex-lockview ref="lockview" style="margin-top: 300px;width: 500px;height: 500px;" @onComplete="onComplete" lineWidth="8" normalColor="#B4B4B4" selectColor="#D80A30" errorColor="#007EFF" ratio="0.6"></weex-lockview>
        </div>
  


  </scroller>
</template>
<style scoped>
.text{
    font-size: 30px;
    color:black;
}
.tip{
    justify-content: center;
    align-items: center;
    margin-top:158px;
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
        gestureSelected:'',
        puser_gesture_lock:'',
    };
  },
  created() {},
  methods: {
        onComplete(event) {
        this.puser_gesture_lock=context.secureGetString('user_gesture_lock');    
        this.gestureSelected=event.text;
        // this.alertMsg(this.gestureSelected+'--'+this.pgestureSelected);
        if(this.gestureSelected != this.puser_gesture_lock){
            this.alertMsg(this.gestureSelected+'--'+this.puser_gesture_lock+'验证图案错误，请重新绘制');
            this.$refs.lockview.error();         
            setTimeout(()=> {          
            this.clear();                
            }, 2000);
            return;
        }else{
            // this.alertMsg(this.gestureSelected+'--'+this.puser_gesture_lock);
             this.jump("/VerifyGestureLock");
        };
        
      },
      clear(){
          this.$refs.lockview.clear();
      }
  }
};
</script>