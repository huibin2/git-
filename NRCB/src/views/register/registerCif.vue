<template>
    <scroller class="open-account">
      <title class="titlebar" titleJson="register/titlebar.json"></title>
        <div class="up">
            <!-- <text class="account-text"></text> -->
            <text class="title">请拍摄</text><text class="titlecenter">本人</text><text class="title">中国第二代身份证原件</text>
        </div>
        <div class="content">
            <div class="card1-img">
               <image class="card1" :src="card1Src" v-if="card1Flag" @click="getCard1"/>
               <!-- 重拍 -->
                <image v-else class="card1" :src="card1Src1" @click="getCard1"/>
               <!-- 照相机 -->
            </div>
            <text class="account-text">身份证人像面</text>
            <text class="title-text">{{frontBase64}}</text>
            <div class="card2-img">
                   <image class="card2" :src="card2Src" v-if="card2Flag" @click="getCard2"/>
               <!-- 重拍 -->
                <image v-else class="card2" :src="card2Src1" @click="getCard2"/>
               <!-- 照相机 -->
            </div>
            <text class="account-text">身份证国徽面</text>
            <text class="title-text">{{backBase64}}</text>
        </div>
        <div  class="button3"  @click="doIt"><text class="text">下一步</text></div>
    </scroller>
</template>

<script>
import Title from "@/components/common/titlebar_func.vue";
import Router from 'vue-router';
const ocr = weex.requireModule("ocr");
// const etop_ocr = weex.requireModule("etop-ocr");
const context = weex.requireModule("context");

export default {
  components: { Title,Router },
  data() {
    return {
      form:{},
      card1Src: "./imgs/sfz_zp1.png",
      card1Src1: "./imgs/sfz_ps1.png",
      card2Src: "./imgs/sfz_zp2.png",
      card2Src1: "./imgs/sfz_ps2.png",
      card1Flag:false,
      card2Flag:false,
      IDname:"张三",
      CID:"110153198802045699",
      expiry_date:"2012.09.09——2012.09.09",
      frontBase64: "**********",
      backBase64: "**********",
      licence:
        "Mzg1NDE0bm9kZXZpY2Vjd2F1dGhvcml6ZZfk4+bn5+Tq3+bg5efm5Of65Obn4Obg5Yjm5uvl5ubrkeXm5uvl5uai6+Xm5uvl5uTm6+Xm5uDm1efr5+vn6+er4Ofr5+vn64vn5+Tm5+bn"
    };
  },
  methods: {
    setLicence() {
      ocr.setLicence(this.licence);
    },
    //正面
    getCard1() {
      // this.alertMsg(data);
      var card1Params = {
        flag: "front"
      };
      this.setLicence();
      
      // etop_ocr.idCardScan(data =>{
      //   this.alertMsg(data);
      // });
      ocr.ocrOpenCamera(JSON.stringify(card1Params), data => {
        //图片的url
        // this.alertMsg(data);
        var data = JSON.parse(data);
        this.card1Flag=true;
        //context.getMappedFileUrl("文件路径");
        this.card1Src = context.getMappedFileUrl(data.path);
        //this.frontBase64 = data.base64;
        //提取姓名，有效日期，身份证号。
        // this.name="张三";
        // this.CID="110153198802045699";
      });

    },
    //反面
    getCard2() {
      var card2Params = {
        flag: "back"
      };
      this.setLicence();
      ocr.ocrOpenCamera(JSON.stringify(card2Params), data => {
        //图片的url
        // this.alertMsg(data);
        var data = JSON.parse(data);
        this.card2Flag=true;
        // this.card2Src = context.getMappedFileUrl(data.path);//将数据的路径存给图片，但图片启动后自动回到登录页面。
        //this.backBase64 = data.base64;
      });
    },
    doIt(){
        // this.alertMsg('测试！');
        // if(!this.card1Flag){
        //   this.alertMsg("请上传身份证正面照片！")
        // }else if(!this.card2Flag){
        //   this.alertMsg("请上传身份证背面照片！")
        // }else{
          this.form={
           name:"张三",
          CID:"110153198802045699",
          expiry_date:"2012.09.09——2012.09.09"
          };
          let param = {
            name:"registersecond",
            params:{
              form:this.form
            }
          };
          this.$router.push(param);
          this.jump("/RegisterCifSecond");
        // }
        
    }
  }
};
</script>

<style scoped>
.cardcenter{
  z-index: 7;
}
.card1-img{
    justify-content: center;
    align-items: center;
}
.card2-img{
    justify-content: center;
    align-items: center;

}
.up{
    margin-top: 100px;
    justify-content: center;
    flex-direction: row;
    align-items: flex-end;
}
.title{
  color:black;
  font-size: 35px;

}
.titlecenter{
    color:red;
  font-size: 35px;

}
.titlebar{
  /* background-color:red; */
	width: 750px;
	border: 15px;
  color:white;
}
.button3{
  width: 678px;
  height: 88px;
  margin-left: 36px;
  margin-right: 36px;
  margin-bottom: 76.5px;
  margin-top: 50px;
  border-radius: 10px;
  background-color: rgb(216,10,48);
  justify-content: center;
  align-items: center;
}
.text {
  /* width: 100%; */
  font-size: 36px;
  color: #ffffff;
  font-weight:  Bold;
  /* margin-top: 22px; */
  /* margin-left: 280px; */
}
.open-account {
  flex:1;
}
.title {
  margin-top: 58px;
}
.title-text {
  text-align: center;
  color: white;
  font-size: 38px;
}
.content {
  margin-top: 100px;
}

.card1 {
  width: 470px;
  height: 297px;
  align-self: center;
}
.card2{
    width: 470px;
  height: 297px;
  align-self: center;
}
.account-text {
  text-align: center;
  color: gray;
  font-size: 30px;
  margin-top: 14px;
  margin-bottom: 14px;
}
.footer {
  align-items: center;
  margin-top: 40px;
}
.button {
  background-color: #d62b31;
  width: 700px;
  height: 86px;
  line-height: 86px;
  text-align: center;
  font-size: 36px;
  color: #fff;
}
</style>

