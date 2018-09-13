<template>
    <scroller class="home">
    <title titleJson="tab_user/safe_set/gestureNoSet_titlebar.json"></title>
    <div class="one" style="margin-top:168px;">
        <span v-if="table[0]" class="circle" style="margin-right: 15px;"></span>
        <span v-else class="circle1" style="margin-right: 15px;"></span>
        <span v-if="table[1]" class="circle" style="margin-right: 15px;"></span>
        <span v-else class="circle1" style="margin-right: 15px;"></span>
        <span v-if="table[2]" class="circle"></span>
        <span v-else class="circle1"></span>
    </div>
    <div class="one">
        <span v-if="table[3]" class="circle" style="margin-right: 15px;"></span>
        <span v-else class="circle1" style="margin-right:15px;"></span>
        <span v-if="table[4]" class="circle" style="margin-right: 15px;"></span>
        <span v-else class="circle1" style="margin-right: 15px;"></span>
        <span v-if="table[5]" class="circle"></span>
        <span v-else class="circle1"></span>
    </div>
    <div class="one">
        <span v-if="table[6]" class="circle" style="margin-right: 15px;"></span>
        <span v-else class="circle1" style="margin-right: 15px;"></span>
        <span v-if="table[7]" class="circle" style="margin-right: 15px;"></span>
        <span v-else class="circle1" style="margin-right: 15px;"></span>
        <span v-if="table[8]" class="circle"></span>
        <span v-else class="circle1"></span>
    </div>
    <div class="tip"><text class="text">再次绘制图案，进行确认</text></div>
        <div style="flex-direction: row;justify-content: center;">
            <weex-lockview ref="lockview" style="margin-top: 50px;width: 500px;height: 500px;" @onComplete="onComplete" lineWidth="8" normalColor="#B4B4B4" selectColor="#D80A30" errorColor="#007EFF" ratio="0.6"></weex-lockview>
        </div>
  


  </scroller>
</template>
<style scoped>
.one{
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.circle{
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: gray;
    
}
.circle1{
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: #D80A30;
    
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
        pgestureSelected:'',
        gestureSelected:'',
        table:[true,true,true,true,true,true,true,true,true],
    };
  },
  created() {
        this.pgestureSelected=context.secureGetString('gestureSelected');   
        if(this.pgestureSelected!=''){
        for(var i=0;i<this.pgestureSelected.length;i++){
            this.index=this.pgestureSelected.substring(i,i+1)-1;
            this.table[this.index]=false;
        };
        // this.alertMsg(this.table);
      };
  },
  methods: {
        onComplete(event) {
        this.gestureSelected=event.text;
        // this.alertMsg(this.gestureSelected+'--'+this.pgestureSelected);
        if(this.gestureSelected != this.pgestureSelected){
            this.alertMsg(this.gestureSelected+'--'+this.pgestureSelected+'两次绘制图案不一样');
            this.$refs.lockview.error();         
            setTimeout(()=> {          
            this.clear();                
            }, 2000);

            return;
        }else{
            context.secureSetString('user_gesture_lock',this.gestureSelected);
            // this.alertMsg(this.gestureSelected+'--'+this.pgestureSelected);
            this.jump("/SetGestureSuccess");
        };
      },

      clear(){
          this.$refs.lockview.clear();
      }

  }
};
</script>