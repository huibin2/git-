<template>
    <scroller class="home">
    <title titleJson="tab_user/safe_set/gestureNoSet_titlebar.json"></title>
    <div class="one" style="margin-top:168px;">
        <span class="circle" style="margin-right: 15px;"></span>
        <span class="circle" style="margin-right: 15px;"></span>
        <span class="circle"></span>
    </div>
    <div class="one">
        <span class="circle" style="margin-right: 15px;"></span>
        <span class="circle" style="margin-right: 15px;"></span>
        <span class="circle"></span>
    </div>
    <div class="one">
        <span class="circle" style="margin-right: 15px;"></span>
        <span class="circle" style="margin-right: 15px;"></span>
        <span class="circle"></span>
    </div>
    <div class="tip"><text class="text">绘制手势登录图案，请至少连接四个点</text></div>
        <div style="flex-direction: row;justify-content: center;">
            <weex-lockview ref="lockview" style="margin-top: 50px;width: 500px;height: 500px;" @onComplete="onComplete" lineWidth="8" normalColor="#B4B4B4" selectColor="#D80A30" errorColor="#007EFF" ratio="0.6"></weex-lockview>
        </div>
  


  </scroller>
</template>
<style scoped>
.circle{
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: gray;
}
.one{
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.text{
    font-size: 30px;
    color:black;
}
.tip{
    justify-content: center;
    align-items: center;
    margin-top:60px;
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
    };
  },
  created() {},
  methods: {
        onComplete(event) {
        this.gestureSelected=event.text;
        if(event.text.length<4){
            this.alertMsg('请绘制至少四个点');
            // this.alertMsg(this.gestureSelected);
            this.$refs.lockview.error();         
            setTimeout(()=> {          
            this.clear();                
            }, 2000);

            return;
        }else{
        context.secureSetString('gestureSelected',this.gestureSelected);
        // context.sessionSetString('gestureSelected',event.text);
        // this.alertMsg(this.gestureSelected);
        // this.$refs.lockview.error();
        this.jump("/TestGestureLock");
        };
        
      },
      clear(){
          this.$refs.lockview.clear();
      }
  }
};
</script>