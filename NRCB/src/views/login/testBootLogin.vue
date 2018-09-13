<template>
    <scroller class="home">
    <title titleJson="tab_user/safe_set/bootLogin_titlebar.json"></title>
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
    <div class="tip" v-if="succ"><text class="text">再次绘制图案，进行确认</text></div>
    <div class="tip" v-else><text class="text">手势密码设置成功</text></div>
    <div style="flex-direction: row;justify-content: center;">
        <weex-lockview ref="lockview" style="margin-top: 50px;width: 500px;height: 500px;" @onComplete="onComplete" lineWidth="8" normalColor="#B4B4B4" selectColor="#D80A30" errorColor="#007EFF" ratio="0.6"></weex-lockview>
    </div>

    <confirm v-if="showConfirm" @cancel="cancel" @confirm="confirm" :data="data"></confirm>
    <confirm v-if="showConfirm2" :data="data2" @cancel="cancel2"></confirm>
    <confirm v-if="showFinger" :data="fingerData" @cancel="cancelFinger"></confirm><!--指纹登录弹窗-->
    <confirm v-if="showLast" :data="lastData" @confirm="lastConfirm" @cancel="lastCancel"></confirm><!--最后弹框-->

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
  background-color: white;
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
import Confirm from "@/components/common/confirm.vue";

const context = weex.requireModule("context");
const fingerprint = weex.requireModule("fingerprint");
const modal = weex.requireModule("modal");
 
export default {
  components: {
      Title,
      Confirm
  },
  data() {
    return {
        fingerFlag:"",
        pgestureSelected:'',
        gestureSelected:'',
        table:[true,true,true,true,true,true,true,true,true],
        succ:true, 

        //弹窗
        showConfirm:false,  //是否显示弹窗（手势开启，是否开启指纹登录）
        showConfirm2:false, //是否显示第二弹窗（未开启指纹登录提示）
        showFinger:false,   //是否显示指纹验证弹窗
        showLast:false,     //是否显示最后弹窗
        data:{              //弹窗信息（是否开启指纹登录）
            text:"手势密码设置成功，是否开启指纹登录？",
            ok:"开启",
            cancel:"取消"
        },
        data2:{             //（未开启指纹登录提示）
            title:"指纹登录未开启",
            text:"如需使用指纹登录，您可以在“我的-安全设置-指纹登录”中再次开启",
            cancel:"我知道了"
        },
        fingerData:{        //（指纹验证弹窗）
          img_url: "imgs/login/fingerprint.png",
          text: "请验证指纹",
          cancel: "取消"
        },
        lastData:{          //最后弹窗
            text: "指纹设置成功，您可以在“我的-安全设置-指纹登录”中进行关闭",
            cancel: "我知道了",
            ok: ""
        }

    };
  },
  created() {
        this.fingerFlag = context.secureGetString("FingerFlag");
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
        confirm(){
            this.showConfirm = false;
            this.showFinger = true;
            fingerprint.identify(data => {
                if (data == "1") {
                    this.fingerFlag = "Y";
                    modal.toast({
                        message: "指纹验证成功",
                        duration: 3
                    });
                    context.secureSetString("FingerFlag", this.fingerFlag);
                    this.lastData.text = "指纹设置成功，您可以在“我的-安全设置-指纹登录”中进行关闭";
                    this.lastData.ok = "";
                    this.showFinger = false;
                    this.showLast = true;
                } else {
                    this.fingerFlag = "N";
                    modal.toast({
                        message: "指纹验证失败",
                        duration: 3
                    });
                    context.secureSetString("FingerFlag", this.fingerFlag);
                    this.showFinger = false;
                    this.lastData.text = "指纹设置失败，重新设置或者您也可以在“我的-安全设置-指纹登录”中进行设置";
                    this.lastData.ok = "重新设置";
                    this.showLast = true;
                }
            });

        },
        cancel(){
            this.showConfirm = false;
            this.showConfirm2 = true;
            this.fingerFlag = 'N';
        },
        cancel2(){
            this.showConfirm2 = false;
            context.launchStage("main.launcher");
        },
        cancelFinger(){
            this.showFinger = false;
            this.showConfirm2 = true;
        },
        lastConfirm(){
            this.showLast = false;
            this.showFinger = true;
        },
        lastCancel(){
            this.showLast = false;
            context.launchStage("main.launcher");
        },
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
             this.succ=false;
             this.showConfirm = true;
        };
      },
      clear(){
          this.$refs.lockview.clear();
      }
  }
};
</script>