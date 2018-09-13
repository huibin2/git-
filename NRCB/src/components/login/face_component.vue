<template>
  <div class="Bg">
      <div class="container">
      <text @click="getFace">人脸登录</text>
      </div>
  </div>

</template>

<style scoped>

  .Bg {
    flex:1;
  }
   .backgroud{
    width: 750px;
    height: 420px;
    align-items: center;
    /* background-color: #999999; */
  }
  .title {
    height: 120px;
    width: 750px;
    top: 0px;
    flex-direction: row;
    position: fixed;
  }
  .backbutton {
    width: 50px;
    height: 50px;
    top: 50px;
    left: 20px;
  }
  .titletext {
    width: 100px;
    height: 50px;
    top: 55px;
    left: 290;
    font-size: 35px;
    color: #fcfafa;
  }
  .homepage {
    width: 100px;
    height: 50px;
    top: 58px;
    margin-left: 500px;
    margin-right: 30px;
    color: #fcfafa;
  }
  .logoImg {
     height: 90px;
     width: 570;
     left: 80px;
     margin-top: -200px;
  }
  
  .container {
      top: 110px;
      margin-bottom: -20px;
      /* flex-direction: column; */
      /* justify-content: center; */
      align-items: center;
      flex-direction: column;
      background-color: white;
      border-top-color: #707070;
      /* border-top-width: 1px; */
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      flex:1;
      /* box-shadow: 0 15px 30px rgba(0, 0, 0, 0.281);  */
  }
  .phoneNum {
    width: 460px;
    height: 70px;
    top: -35px;
    border-radius: 35px;
    text-align: center;
    background-color: white;
    padding-top: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.281);
  }
  .fingerprintImage {
    top: 100px;
    width: 125px;
    height: 125px;
  }
  .fingerprintText {
    top: 150px;
  }
  .selectButon {
    top: 300px;
    font-size: 30px;
    color:#59b4f9;
    /* width: 300; */
  }
  .default-box {
  width: 750px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}
.default {
  width: 250px;
  height: 250px;
}
.active-box {
  width: 750px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}
.active {
  width: 600px;
  height: 600px;
}
</style>
<script>

  // import Title from '../components/title.vue'

  const modal = weex.requireModule('modal')
  const stream = weex.requireModule('stream')
  const context = weex.requireModule('context')
  // const face = weex.requireModule("face");
  const techshinoface = weex.requireModule("techshino");

  export default {
    components: {
      // Title
    },
    data () {
      return {
          Title:"登录",
          licence:
        "MjUyNjE1bm9kZXZpY2Vjd2F1dGhvcml6Zd3l5ubm5+Ti/+fg5efm4+f+5Obm4Obg5Yjm5uvl5ubrkeXm5uvl5uai6+Xm5uvl5uTm6+Xm5uDm1efr5+vn6+er4Ofr5+vn66vn5+Tm5uXl",
        techshinoParam: {
        faceCfg:
          "<param><imgWidth>360</imgWidth><imgHeight>440</imgHeight><imgCompress>85</imgCompress><pupilDistMin>180</pupilDistMin><pupilDistMax>260</pupilDistMax><isActived>2</isActived><isAudio>1</isAudio><timeOut>45</timeOut><version>v2.0</version><deviceIdx>0</deviceIdx><definitionAsk>15</definitionAsk><cryptType>0</cryptType><interfaceType>4</interfaceType><cryptKey>37010519820902167800</cryptKey><action>3</action><headLeft>-15</headLeft><headRight>15</headRight><headLow>-12</headLow><headHigh>12</headHigh><eyeDegree>30</eyeDegree><mouthDegree>30</mouthDegree><outType>0</outType><supportLow>1</supportLow><actionlist>123456A</actionlist><actionorder>1*A</actionorder></param>",
        customInfo: "1234567890",
        serialno: "123456789012"
      }
      }
    },
    created(){
      this.getFace();
    },
    methods:{
        getFace(){
          // face.setLicence(this.licence);
          // face.startAliveCheck(data => {
          //   context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ");
          //   context.sessionSetString('isLogin','true');
          //   context.finish();
          //   console.log(data.base64);
          // });
            techshinoface.start(JSON.stringify(this.techshinoParam), data => {
                context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ");
                context.sessionSetString('isLogin','true');
                modal.alert({
                message: data,
                duration: 0.3
                },()=>{
                    context.finish()
                });
                
            });
        }
    }
  }
</script>