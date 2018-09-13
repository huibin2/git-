<template>
  <div class="Bg">
       <!-- <image class="backgroud" :src="backgroudimage" /> -->
       <!-- <title :title="Title" :show="Show"></title> -->
       <!-- <div class="title">
         <image class="backbutton" :src="backbuttonimage"></image>
         <text class="titletext">{{Title}}</text>
         <text class="homepage">主页</text>
       </div> -->
       <!-- <image class="logoImg" :src="logoUrl" /> -->
       
       <div class="container">
        <text class="phoneNum">{{UserName}}</text>
        <image class="fingerprintImage" :src="fingerprintImageurl" @click="fingerprintAction" />
        <text class="fingerprintText">点击进行指纹登录</text>
        <!-- <text class="selectButon" @click="selectButonAction">切换登录方式&#9660</text> -->

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
      top: 120px;
      height:650px;
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
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.281); 
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
    top: 150px;
    width: 125px;
    height: 125px;
  }
  .fingerprintText {
    top: 200px;
  }
  .selectButon {
    top: 300px;
    font-size: 30px;
    color:#59b4f9;
    /* width: 300; */
  }
   
</style>
<script>

  // import Title from '../components/title.vue'

  const modal = weex.requireModule('modal')
  const stream = weex.requireModule('stream')
  const context = weex.requireModule('context')
  const fingerprint = weex.requireModule("fingerprint")

  export default {
    components: {
      // Title
    },
    data () {
      return {
          Title:"登录",
          Show:true,
          UserName:"",
          UserPwd:"",
          logoUrl:this.$store.state.imgBaseUrl + "logo.png",
          nameUrl:this.$store.state.imgBaseUrl + "userimage.png",
          pwdUrl:this.$store.state.imgBaseUrl + "passwordimage.png",
          backgroudimage:"",
          backbuttonimage:this.$store.state.imgBaseUrl + "backbuttonimage.png",
          btnimageurl:this.$store.state.imgBaseUrl + "login_btbg.png",
          fingerprintImageurl:this.$store.state.imgBaseUrl + "login/fingerprintImage.png"
      }
    },
    created(){
      this.UserName=context.secureGetString('remuserName')
    },
    methods:{
      //获取用户名
      getName(event){
          this.UserName = event.value;
      },
      //获取密码
      getPwd(event){
        this.UserPwd = event.value;
      },
      //忘记密码
      toForget(){
          this.jump("/forgetpwdone")
      },
      //立即登录
      toLogin(){
        const params={
          LoginName:this.UserName,
          UserPwd:"12589",
          SigninTypCd:"2",
          LoginType:"P",
          LoginTypeWay:"1",
          EquipmentId:"1234567890",
        }
        this.postDo("login.do",params,data =>{
              context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ");
              context.sessionSetString('isLogin','true');
              context.finish();
        });
       },
       //注册
       toRegister(){
          this.jump("/register")
       },
       fingerprintAction(){
        fingerprint.identify(data => {
        if (data == "1") {
          // modal.alert({
          //   message: "指纹登录成功",
          //   duration: 0.3
          // });

          this.toLogin();



          } else {
          modal.alert({
            message: data,
            duration: 0.3
          });
          }
         });
       },
       selectButonAction() {
         modal.alert({message:context.getParam("name")});
         
       }
    }
  }
</script>