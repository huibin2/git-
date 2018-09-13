<template>
   <scroller class="home" >
    <title class="titlebar" titleJson="register/titlebarphone.json"></title>
	   <div class="wrapper">
		   <div class="banker" style="margin-top: 20px;">
			   <div class="banker-bottom" >
				   <text class="title">设置登录密码</text>
					   <input class="tit" type="password" minLength="6" maxlength="12" v-model="registerPsw" placeholder="6-12位数字字母组合"/>
			   </div> 
			   <div class="line"></div>
			   <div class="banker-bottom" >
				   	<text class="title">确认登录密码</text>
					<input class="tit" type="password" minLength="6" maxlength="12" v-model="registerPswCfm" placeholder="请再次输入登陆密码"/>
		   </div>
		   </div>
		   <div  class="button4"  @click="checkPassWord"><text class="text">确定</text></div>
	   </div>
  
  </scroller> 
</template>

<style scoped>

.titlebar{
	background-color: #EFEFF4;
	width: 750px;
	border: 15px;
	margin-bottom: 15px;
}
.home {
  margin-top: 118px;
  width: 750px;
  background-color: #efeff4;
}
.banker-bottom {
  height: 88px;
  width: 750px;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 88px;
  background-color: #ffffff;
}
.title {
  font-size: 30px;
  line-height: 88px;
  margin-left: 36px;
  color: rgb(102,102,102);
}
.tit {
  font-size: 30px;
  width: 500px;
  color: rgb(102,102,102);
  /* padding-left:64px; */
  height: 88px;
  line-height: 88px;
  text-align: right;
  margin-right: 36px;
  placeholder-color:rgb(153,153,153);
}
.box{
  font-size:28px;
  width: 500px;
  color: #404561;
  padding-left:64px;
  height:100px;
  line-height: 100px;
}
.tips {
    font-size: 28px;
    width: 290px;
    color: #404561;
    height: 100px;
    line-height: 100px;
	margin-left:30px;
  }
.boxl{
	font-size:28px;
	width: 500px;
	color: #404561;
	height:100px;
	line-height: 100px;
}
.banker-bot{
 height:100px; 
 flex-direction:row;
 background-color: #FFFFFF;
 margin-top:15px;
 margin-bottom:3px;
}
.banker {
  background-color: white;
}
.imgL {
    width: 200px;
    height: 70px;
    margin-top: 15px;
    margin-right: 15px;
  }
    .disimg {
    display: block;
    width: 200px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 24px;
    color: #C0C0C0;
    border-radius: 70px;
    border-style: solid;
    border-width: 1px;
    border-color: #C0C0C0;
    margin-top: 15px;
    margin-right: 15px;
  }
.button3{
	width: 669.9975px;
	height: 84.9975px;
	margin-left:37.5px;
	margin-bottom:76.5px;
	margin-top:42.5px;
	border-radius: 53.4975px ;
	background-color: #C0C0C0;
}
.button4 {
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

.line{
  height: 3px;
  /* width: 500px; */
  background-color: #efeff4;
  margin-left: 36px;
}
.checkebox {
	flex-direction: row;
}
.memory_text {
	font-size: 24px;
	color: #545454;
	margin-top: 26px;
	margin-left: 20px;
}
.xieyi{
	margin-left: 20px;
	margin-top: 26px;
}
.mtext{
	font-size: 24px;
	color: #00B9F4;
}

.text {
  /* width: 100%; */
  font-size: 36px;
  color: #ffffff;
  font-weight: bold;
  /* margin-top: 22px; */
  /* margin-left: 280px; */
}
.unckecked {
	width:26px;
	height: 26px;
	margin-top: 30px;
	margin-left: 29px;
}
</style>
<script>
	import Title from "@/components/common/titlebar_func.vue";
	const context= weex.requireModule("context");
	const stream = weex.requireModule("stream");
export default {
  components: { Title },
  data(){
			return{
				registerPsw:"",
				registerPswCfm:"",
				version: "",
        		jsfmVersion: "",
       			platform: "",
        		osVersion: "",
        		appName: "",
        		appVersion: "",
        		deviceModel: "",
       			deviceWidth:"",
        		deviceHeight:"",
            resolution: "",
            //防重码
            tokenName:"",
            //加挂回显：1注册手机号
            RegisterPhoneNum:"",
            //加挂回显：2tipmessage
            TipMessage:"",
			}
		},
		created() {
      this.getToken();
		},
		methods:{
       getToken(){
		  	this.postDo("GenToken.do",{},data =>{
        this.tokenName=data._tokenName;
			  });
		  },
			checkPassWord(){
				if (this.registerPsw == "") {
        this.alertMsg("请输入密码");
        return;
      }
      var exp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;  //密码格式正则表达式
      if (
        !exp.test(this.registerPsw) ||
        !exp.test(this.registerPswCfm)
      ) {
        this.alertMsg("密码格式为6-12位数字字母，请检查后重新输入");
        return;
      }
      
      if (this.registerPswCfm == "") {
        this.alertMsg("请输入确认密码");
        return;
      }

      if (this.registerPsw != this.registerPswCfm) {
        this.alertMsg("两次密码输入不一致");
      } 
      this.registSec();
			},
        registSec(){
			var data  = {
            MobilePhone:context.sessionGetString('RegisterMobilePhone'),
            NewPassword:this.registerPsw,
            ConfirmPassword:this.registerPswCfm,
            _tokenName:this.tokenName
		  };
            this.postDo('MobileRegister.do', data,(data) => {
            context.sessionSetString('RegisterTipMessage',data.TipMessage)
            context.sessionSetString('HostMobilePhone',data.MobilePhone);
			      this.toregister();
          }, data => {
            this.alertMsg(data._RejMessage);
            this.getToken();
            });
            },
        toregister(){				
                this.jump('/RegisterPhoneSuccess');
        },
		}
};
</script>