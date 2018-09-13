<template>
  <div class="Bg">
       <!-- <image class="backgroud" :src="backgroudimage"> -->
       <!-- <title :title="Title" :show="Show"></title> -->
      
       <!-- <image class="logoImg" :src="logoUrl"> -->
       
       <div class="container">
       <div class="default-box">
      <weex-lockview class="default" defaultSelected="1,2,5,8,9" inStealthMode="true" lineWidth="6" normalColor="#A5D5FF" selectColor="#017AD6" ratio="0.6"></weex-lockview>
    </div>
    <div class="active-box">
      <weex-lockview ref="lockview" class="active" @onComplete="onComplete" lineWidth="8" normalColor="#A5D5FF" selectColor="#017AD6" errorColor="#F84646" ratio="0.6"></weex-lockview>
    </div>

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
          fingerprintImageurl:this.$store.state.imgBaseUrl + "fingerprintImage.png"
      }
    },
    created(){
      this.UserName=context.secureGetString('remuserName');
    },
    methods:{
      onComplete(event) {
      if (event.text == "12589") {
        // modal.alert({
        //   message: "设置成功",
        //   duration: 0.3
        // });
        this.toLogin()
        this.$refs.lockview.clear();
      } else {
        this.$refs.lockview.error();
        modal.alert({
          message: "手势不一致",
          duration: 0.3
        });
        setTimeout(() => {
          this.$refs.lockview.clear();
        }, 1500);
      }
    },
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



        // const params = {
        //    "LoginId":this.UserName,
        //    "Password":this.UserPwd,
        //    "LoginType":"C"
        // };
        // stream.fetch({
        //   method: 'POST',
        //   url: `/uauth/pweb-common.Login.do`,
        //   type: 'json',
        //   body: this.toParams(params)
        // }, response => {
        //   if (response.status == 200) {
        //      modal.alert({
        //       message:"返回码"+response.data.JSON._RejCode,
        //        duration: 3
        //        }, function (value) {
        //         console.log('confirm callback', value)
        //        })
        //     if (response.data.JSON._RejCode=="000000") {
        //       //拿到token执行setToken
        //       if(context.setToken(response.data.JSON.Token) == 0){
        //         context.next();
        //     }else{
        //       modal.alert({
        //       message:"错误",
        //        duration: 3
        //        }, function (value) {
        //         console.log('confirm callback', value)
        //        })
        //     }
        //     }else{
        //       modal.alert({
        //       message:response.data.jsonError[0]._exceptionMessage,
        //        duration: 3
        //        }, function (value) {
        //         console.log('confirm callback', value)
        //        })
        //     }  
            
        //   } else {}
        // }, () => {});
       },
       //注册
       toRegister(){
          this.jump("/register")
       },
       fingerprintAction(){
        fingerprint.identify(data => {
        if (data == "1") {
          modal.alert({
            message: "指纹登录成功",
            duration: 0.3
          });
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