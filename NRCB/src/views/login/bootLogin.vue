<template>
    <scroller class="home">
    <title titleJson="login/bootLogin_titlebar.json"></title>
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
    <div class="skipp" @click="skip">
        <text class="skip">跳过</text>
    </div>
    <confirm v-if="showConfirm" @cancel="cancel" :data="data"></confirm>
    <confirm v-if="showConfirm2" @cancel="cancel2" @confirm="confirm2" :data="data2"></confirm>
    <confirm v-if="showConfirm3" @cancel="cancel3" :data="data3"></confirm>
    <confirm v-if="showFinger" :data="fingerData" @cancel="cancelFinger"></confirm><!--指纹登录弹窗-->
    <confirm v-if="showLast" :data="lastData" @confirm="lastConfirm" @cancel="lastCancel"></confirm><!--最后弹框-->

  </scroller>
</template>
<style scoped>
.skipp{
    justify-content: center;
    align-items: center; 
    margin-top:150px;
}
.skip{
    font-size: 30px;
    color: rgb(102,102,102);
}
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
        fingerFlag:'',
        gestureSelected:'',
        showConfirm:false,  //是否显示弹窗（手势开启，是否开启指纹登录）
        showConfirm2:false,
        showConfirm3:false,
        showFinger:false,   //是否显示指纹验证弹窗
        showLast:false,     //是否显示最后弹窗

        data:{              //弹窗信息（是否开启指纹登录）
            title:"手势密码登录未开启",
            text:"如需开启，请前往“我的-安全设置-手势登录”，开启手势登录",
            cancel:"我知道了"
        },
        data2:{
            title:"开启指纹登录",
            text:"我行已支持touch ID指纹等了，登录更方便，账户更安全",
            ok:"立即开启",
            cancel:"取消"
        },
        data3:{
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
  created() {},
  methods: {
        comfirm(){
            this.showConfirm = false;
        },
        cancel(){
            this.showConfirm = false;
            this.showConfirm2 = true;
        },
        confirm2(){
            this.showConfirm2 = false;
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
        cancel2(){
            this.showConfirm2 = false;
            this.showConfirm3 = true;
        },
        cancel3(){
            this.showConfirm3 = false;
            context.launchStage("main.launcher");
        },
        cancelFinger(){
            this.showFinger = false;
            this.showConfirm3 = true;

        },
        lastConfirm(){
            this.showLast = false;
            this.showFinger = true;
        },
        lastCancel(){
            this.showLast = false;
            context.launchStage("main.launcher");
        },

        skip(){
            this.showConfirm = true;
        },
        onComplete(event) {
        this.gestureSelected=event.text;
        if(event.text.length<4){
            this.alertMsg('请绘制至少四个点');
            this.$refs.lockview.error();         
            setTimeout(()=> {          
            this.clear();                
            }, 2000);
            return; 
        }else{
        context.secureSetString('gestureSelected',this.gestureSelected);
        // context.secureSetString('gestureSelected',event.text);
        // this.$refs.lockview.error();
        this.jump("/TestBootLogin");
        };
        
      },
      clear(){
          this.$refs.lockview.clear();
      }
  }
};
</script>