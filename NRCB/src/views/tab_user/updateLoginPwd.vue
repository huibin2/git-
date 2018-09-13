<template>
<div>
   <title-bar titleJson="tab_user/safe_set/updatePwd_titlebar.json"></title-bar>
   <scroller class="home">
    
	   <div class="wrapper" style="margin-top: 20px;">
		   <div class="banker" style="background-color:white;">
			   
			    <div class="banker-bottom" >
				   <text class="title">原登录密码</text>
				   <div class="tit">
					   <input class="boxl" type="password" maxlength="20" v-model="loginPwd" placeholder="请输入原登录密码" @input="getPw"/>
				     <!-- <password-input  class="boxl" encryptType = "22"  minLength="6" maxLength="6"  kbdType="Number"  ref="Pwd1" kbdName="logingPw2"  placeholder="请输入您的交易密码"></password-input> -->
                     <!--<password-input class="boxl" minLength="6" encryptType="22" maxLength="16" kbdType="Number"  ref="Pwd1" kbdName="logingPw1"  placeholder="请输入您的登录密码"></password-input>-->
				   </div>
			   </div>

			   <div class="bottom"></div>

			   <div class="banker-bottom" >
				  
				   <text class="title">新登录密码</text>
				   <div class="tit">
					   <input class="boxl" type="password" maxlength="20" v-model="loginNewPwd" placeholder="请输入新登录密码" @input="getNewPwd"/>
				     <!-- <password-input  class="boxl" encryptType = "22"  minLength="6" maxLength="6"  kbdType="Number"  ref="Pwd1" kbdName="logingPw2"  placeholder="请输入您的交易密码"></password-input> -->
                     <!--<password-input class="boxl" minLength="6" encryptType="22" maxLength="16" kbdType="Number"  ref="Pwd1" kbdName="logingPw1"  placeholder="请输入您的登录密码"></password-input>-->
				   </div>
				   
			   </div>
			   <div class="bottom"></div>
			   <div class="banker-bottom" >
				   <text class="title">确认新密码</text>
				   <div class="tit">
					   <input   class="boxl" type="password" maxlength="20" v-model="loginPwdCfm" placeholder="请再次输入新登录密码" @input="getPwdCfm"/>
				     <!-- <password-input  class="boxl" encryptType = "22"  minLength="6" maxLength="6"  kbdType="Number"  ref="Pwd2" kbdName="logingPw2"  placeholder="请输入您的交易密码"></password-input> -->
                     <!--<password-input class="boxl" minLength="6" encryptType="22" maxLength="16" kbdType="Number"  ref="Pwd1" kbdName="logingPw1"  placeholder="请输入您的登录密码"></password-input>-->
				   </div>
			   </div>
				<!-- <div class="banker-bottom" style="margin-top: 15px;">
					<text class="title">{{msgCodeTitle}}</text>
					<input ref="msgcoderef" type="number" class="tips" maxLength="6" placeholder="请输入短信验证码" @input="getMsgCode"/>
					<image src="./imgs/found.png" class="imgL" @click="sendSmS" v-if="isTimerStop==false" />
					<text class="disimg" v-else>{{msgCodeBtnText}}</text>
				</div> -->
			   <!-- <div class="checkebox">
				   <div v-if="checked" @click="check">
					   <image class="unckecked" src="./imgs/register/unchecked.png" />
				   </div>

				   <div v-else @click="check">
					   <image class="unckecked" src="./imgs/register/checked.png" />
				   </div>
				   <text class="memory_text">我已阅读并同意</text>
				   <div class="xieyi">
					   <text class="mtext" @click="Agreement('9')">《手机银行电子银行个人客户服务协议》</text>
					   <text class="mtext" @click="Agreement('18')">《手机银行电子银行章程》</text>
				   </div>

			   </div> -->
		   </div> 
		    <!-- <div  class="button3" v-if="checked"><text class="text" >确认</text></div> 
		    <div  class="button4"  @click="registSec" v-else><text class="text">确认</text></div>  -->
			<div  class="setbutton" @click="checkPwd"><text class="btntext" >确定</text></div>
	   </div>

  </scroller> 
</div>
</template>
<style scoped>

.wrapper{
  width: 750px;
  background-color: rgb(240, 240, 240);
}
.home {
  background-color: rgb(255, 255, 255);
  margin-top: 20px;
}

.banker-bottom{
 height:88px; 
 position: relative;
 flex-direction:row;
 line-height: 88px;
 /* margin-bottom: 3px; */
 background-color: #FFFFFF;

}
 .bottom{
	
	height: 3px;
	margin-left: 36px;
	background-color: #f8f8f8;
}  
.title{
  font-size: 30px;
  line-height: 88px; 
  width: 170px;
  margin-left: 36px;
  color:#404561;
}
.tit{
  font-size:30px;
  width: 508px;
  color: #404561;
  /* padding-left:64px; */
  height:88px;
  line-height: 88px;
  /* margin-right: 36px; */
  
}
.box{
  font-size:30px;
  width: 300px;
  color: #404561;
  padding-left:64px;
  height:88px;
  line-height: 88px;
}
.tips {
    font-size: 28px;
    width: 290px;
    color: #404561;
    height: 88px;
    line-height: 88px;
	margin-left:30px;
  }
.boxl{
	font-size:30px;
	width: 508px;
	color: #404561;
	height:88px;
	line-height: 88px;
	text-align: right;
	/* margin-right: 36px; */
	
}
.banker-bot{
 height:100px; 
 flex-direction:row;
 background-color: #FFFFFF;
 margin-top:15px;
 margin-bottom:3px;
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
.button4{
	width: 669.9975px;
	height: 84.9975px;
	margin-left:37.5px;
	margin-bottom:76.5px;
	margin-top:42.5px;
	border-radius: 53.4975px ;
	background-color: #00A0E8 ;
}
.setbutton{
	width: 678px;
	height: 88px;
	margin-left:36px;
	margin-bottom:76.5px;
	margin-top:50px;
	border-radius: 10px ;
	background-color: #f0002c ;
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
	width: 100%;
	font-size: 36px;
	color: #FFFFFF;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	margin-top: 22px;
	margin-left:280px;

}
.btntext {
	
	font-size: 36px;
	color: #FFFFFF;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	text-align: center;
  	padding-bottom: 20px;
  	padding-top: 20px;

}
.unckecked {
	width:26px;
	height: 26px;
	margin-top: 30px;
	margin-left: 29px;
}
</style>
<script>
    import TitleBar from "@/components/common/titlebar_func.vue";
	// import Title from "@/components/register/titlebar_component.vue";
	const context= weex.requireModule("context");
	const stream = weex.requireModule("stream");
export default {
  components: { TitleBar

  },
  data(){
			return{
				Name:'',
				msgCodeTitle:"短信验证码",
				msgCodeBtnText:'',
				isTimerStop:false,
				time: 60,
				msgCode:"",
				
                backgroundColor: "#F8F8F8",
                checked:true,
                UserPwd: "",
                idNo:"",
                phoneNo: "",
                cardNo: "",
                sttttttamp:'',
                pubbbbbkey:'',
				url:"",
				loginPwd:"",
				loginNewPwd:"",
				loginPwdCfm:""
			}
		},
		created() {
			// const  ResInfo = JSON.parse(context.sessionGetString('ResInfo'));
			// this.Name=ResInfo.username;
			// this.idNo=ResInfo.idno;
			// this.cardNo=ResInfo.cardno;
			// this.phoneNo=ResInfo.phoneno;

		},
		methods:{
			getName(event){
				this.Name=event.value;
			},
			getIdNo(event){
                this.idNo=event.value;
            },
            getCardNo(event){
                this.cardNo=event.value;
            },
            getPhoneNo(event){
                this.phoneNo = event.value;
			},
			getMsgCode(event) {
				this.msgCode = event.value;
				if(event.value.length == 6){
					this.$refs['msgcoderef'].blur();
				}
			},
			getNewPwd(event){
				this.loginNewPwd = event.value;
			},
			getPwdCfm(event){
				this.loginPwdCfm = event.value;
			},
			getPwd(event){
				this.loginPwd = event.value;
			},
            goto(id) {
                context.launchStage(id);
            },
            check:function(){
                this.checked = !this.checked;
			},
			//获取短信验证码
		  	sendSmS(){
			    this.timeBuild();
			    let info=context.sessionGetString('RegisterInfo');
				// const params={
				// 	MsgMobile:JSON.parse(info).MobilePhone,
				// 	OTPSn:JSON.parse(info)._OTPToken,
				// 	Challenge:this.sttttttamp
				// }
				const params={
					UserID:"",
					ApprTyp:"1",//1-注册验证；2-交易验证；
					PhoneNbr:this.phoneNo,
					VerifyTag:"N",//N-不验证；Y-验证
					VerifyScene:"",//VerifyTag为Y时候必输 例如本次交易为行内转账则填入行内转账
					MAinInfo:""//VerifyTag为Y时候必输:符号进行分割例如 :转出账号:转入：金额
				}
				this.postDo("GenPhoneTokenForPublic.do",params,data =>{
					this.alertMsg("短信已发送！");

				});
			},
			//倒计时
            timeBuild(){
                var timer = setInterval(() => {
                    if (this.time < 0) {
                        this.time = 60;
                        this.isTimerStop=false;
                        clearInterval(timer);
                    } else {
                        this.isTimerStop=true;
                        this.msgCodeBtnText = "重新获取(" + this.time-- + "s)";
                    }
                }, 1000);
            },
            Agreement(id){
			    // const params = {
                //     ProductNo:id,
                //     BankType:"pmbs"
				// };
			    // this.postDo(`NormalNoticeDetail.do`,params,data =>{
                //     this.url =this.$store.state.BaseUrl+data.FileDir;
                //     const titleName = id =="9" ? "服务协议":"章程" ;
                //     context.launchStage("main.webview?url="+this.url+"&title="+titleName);
				// });
			},
            registSec(){


				if(!this.check){
			      this.alertMsg('请阅读并勾选同意该协议！');
				   return true;
				}
				if(this.propfirst(this.Name,this.idNo,this.phoneNo))return
				this.propUser();
                // this.$refs.Pwd1.getKbdLength(length =>{
                //     if(Number(length) !=6){
                //         this.alertMsg('请输入6位交易密码');
                //         return;
                //     }else{
                //         this.propUser();
                //     }
                // })

            },
            getTimeStamp(){
               this.postDo("Timestamp.do",{},data =>{
                   this.sttttttamp=data.Timestamp;
                   this.pubbbbbkey=context.sessionGetString('sm2PublicKey');
                   this.toregister();
               });
            },
            toregister(){
                // this.$refs.Pwd1.getValue(this.sttttttamp,this.pubbbbbkey,data => {
                //     context.sessionSetString('registerPassword',data);
                //     this.UserPwd=data;
                //     const params = {
                //         MobilePhone: this.phoneNo,
                //         TrsPassword: this.UserPwd,
                //         BankAcType: "03",
                //         IsMobileFlag:"N",
                //         IdNo:this.idNo,
                //         AcName:this.Name,
                //         AcNo:this.cardNo,
                //         IdType:'00'
                //     };
                    // this.postDo("OnlineRegisterConfirm.do",params,data =>{
                    //     this.$refs.Pwd1.clear();
                    //     context.sessionSetString('RegisterInfo',JSON.stringify(data))
                    //     //保存用户信息回显
                    //     const info = {
                    //         username:this.Name,
                    //         idno:this.idNo,
                    //         phoneno:this.phoneNo,
                    //         cardno:this.cardNo
                    //     }
                    //     context.sessionSetString('ResInfo',JSON.stringify(info));
                    //     this.jump('/RegisterSecond')
                    // });

				// })
				        //保存用户信息回显
                        // const params = {
                        //     // IdName:this.Name,//姓名
						// 	// UserSex:"男",//性别
						// 	// IdNum:this.idNo,//证件号码
						// 	// PhoneNbr:this.phoneNo,//手机号码
						// 	// VouId:this.cardNo,//银行卡卡号
						// 	// CardPwd:"",//一类户卡密
						// 	// ContTypCd:"1"//1-电子账户；2-本行借记卡；3-本行贷记卡；8-他行借记卡

						// 	UserPwd:this.loginPwd,//登录密码
						// 	UserPwdConfirm:this.loginPwdCfm,//登录密码确认
						// 	PhoneNbr:this.phoneNo,//手机号
						// 	IdName:this.Name,//姓名
						// 	UserSex:"男",//性别
						// 	IdNum:this.idNo,//证件号码
						// 	UserSmsId:"",//短信验证码
						// 	SmsNbr:""//短信序号

						// }
						const params={
							UserPwd:this.loginPwd,//登录密码
							UserPwdConfirm:this.loginPwdCfm,//登录密码确认
							PhoneNbr:this.phoneNo,//手机号
							IdName:this.Name,//姓名
							UserSex:"1",//性别
							IdNum:this.idNo,//证件号码
							IssueDt:"2013-02-03",//证件签发日
							ExpiryDt:"2015-06-07",//证件到期日
							IssueOrg:"356",//证件签发机构
							IdenAddr:"356",//证件地址
							UserSmsId:this.msgCode,//短信验证码
							SmsNbr:"8583069713",//短信序号
							Pic1Url:"123",//证件正面照片地址
							Pic2Url:"123",//证件反面照片地址
							Pic3Url:"123"//手持证件照片地址
						}
					this.postDo("RegisterStepOne.do",params,data =>{
                    //     this.$refs.Pwd1.clear();
                        context.sessionSetString('RegisterInfo',JSON.stringify(params))
                    //     //保存用户信息回显
                    //     const info = {
                    //         IdName:this.Name,//客户姓名
                    //         IdenNum:this.idNo,//客户身份证号
                    //         PhoneNbr:this.phoneNo,//手机号
                    //     }
                    //     context.sessionSetString('ResInfo',JSON.stringify(info));
                        this.jump('/RegisterCif')
                    });
                        // context.sessionSetString('ResInfo',JSON.stringify(info));
                        // this.jump('/RegisterSecond')
            },
            propUser(){
                // const params = {
                //     MobilePhone:this.phoneNo
                // };
                // this.postDo("OnlineRegisterPre.do",params,data =>{
                //     if(data.IsMobileFlag =="Y"){
                //         this.alertMsg('您已开通过手机银行,请登录,若忘记密码请自助修改！');
                //         return true;
                //     }else{
                        // this.getTimeStamp();
                //     }
				// });
				this.toregister();
			},
			checkPwd(){
				var pwdN = this.loginNewPwd;
				var pwdC = this.loginPwdCfm;
				var pwd = this.loginPwd;
				var length = pwdC.length;
				var order=/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{6,12}$/
				if (length<6||length>12){
					this.alertMsg("密码长度必须6-12位！");
					return;
				}else if(!order.test(pwdC)){
					this.alertMsg("密码格式为6-12位数字字母，请检查后重新输入")
				}else if(pwdN!= pwdC) {
					this.alertMsg("两次密码输入不一致！");
				}else if(pwdN==''||pwdC==""||pwd==""){
					this.alertMsg("密码不能为空！");
				}else{

					this.jump("/updateLoginPwd_success");
				}
			}
		}
};
</script>