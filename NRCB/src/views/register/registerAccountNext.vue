<template>
   <scroller class="home" >
    <title class="titlebar" titleJson="register/titlebaraccount.json"></title>
	   <div class="wrapper">
		   <div class="banker" style="margin-top: 20px;">
			   <div class="banker-bottom">
				      <text class="title">卡号/账号</text>
				      <input class="tit" v-model="AcNo" minlength="6" maxlength="32" placeholder="请输入本行卡号/账号信息" @input="getAcNo" type="number"/>
         </div>
         <div class="line"></div>
				<div class="banker-bottom">
				   <text class="title">取款密码</text>
				   <input class="tit" maxlength="6" v-model="TrsPassword" placeholder="请输入6位取款密码" @input="getTrsPassword" type="number"/>
			   </div>
		   </div>
		   <div class="button4"  @click="confirm"><text class="text">确定</text></div>
	   </div>
  </scroller> 
</template>
<style scoped>
.banker {
  background-color: white;
  margin-bottom: 100px;
}
.line {
  height: 3px;
  /* width: 500px; */
  background-color: #efeff4;
  margin-left: 36px;
}
.right {
  height: 88px;
  width:500px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.code {
  color: rgb(209, 154, 95);
  font-size: 28px;
}
.titlebar {
  background-color: #efeff4;
  width: 750px;
  /* border: 15px; */
  /* margin-bottom: 15px; */
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
.title1 {
  font-size: 30px;
  line-height: 88px;
  margin-right: 36px;
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
  placeholder-color:rgb(152,153,153);
}
.tit1{
    font-size: 30px;
  width: 300px;
  color: rgb(153,153,153);
  /* padding-left:64px; */
  height: 88px;
  line-height: 88px;
  text-align: right;
  margin-right: 10px;
  
}
.box {
  font-size: 28px;
  width: 500px;
  color: #404561;
  padding-left: 64px;
  height: 100px;
  line-height: 100px;
}
.tips {
  font-size: 28px;
  width: 290px;
  color: #404561;
  height: 100px;
  line-height: 100px;
  margin-left: 30px;
}
.boxl {
  font-size: 28px;
  width: 500px;
  color: #404561;
  height: 100px;
  line-height: 100px;
}
.banker-bot {
  height: 100px;
  flex-direction: row;
  background-color: #ffffff;
  margin-top: 15px;
  margin-bottom: 3px;
}
.imgL {
  /* width: 190px;
    height: 60px;
    margin-top: 15px;
    margin-right: 36px;
    border-color: rgb(209,154,95);
    border-radius: 10px; */
  display: block;
  width: 190px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
  color: rgb(209, 154, 95);
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(209, 154, 95);
  /* margin-top: 15px;*/
     margin-right: 36px;  
     justify-content: center;
     align-items: center;
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
.checkebox {
  flex-direction: row;
}
.memory_text {
  font-size: 24px;
  color: #545454;
  margin-top: 26px;
  margin-left: 20px;
}
.xieyi {
  margin-left: 20px;
  margin-top: 26px;
}
.mtext {
  font-size: 24px;
  color: #00b9f4;
}

.text {
  /* width: 100%; */
  font-size: 36px;
  color: #ffffff;
  font-weight:  Bold;
  /* margin-top: 22px; */
  /* margin-left: 280px; */
}
.unckecked {
  width: 26px;
  height: 26px;
  margin-top: 30px;
  margin-left: 29px;
}
</style>
<script>
import Title from "@/components/common/titlebar_func.vue";
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
export default {
  components: { Title },
  data() {
    return {
     AcNo:"",
     pwd:"",
     tokenName:"",
     phoneNo:"",
     TrsPassword:""
    };
  },
  created() {
      this.getToken();
      this.phoneNo = context.sessionGetString('RegisterMobilePhone');
  },
  methods: {
    getToken(){
		  	this.postDo("GenToken.do",{},data =>{
        this.tokenName=data._tokenName;
			  });
		  },
    getAcNo(event){
       this.AcNo = event.value;
    },
    getTrsPassword(event){
        this.TrsPassword = event.value;
    },
    confirm() {
            var data  = {
            MobilePhone:this.phoneNo,
            AcNo:this.AcNo,
            TrsPassword:this.TrsPassword,
            _tokenName:this.tokenName
          };
            this.postDo('RegRelaActAdd.do', data,success=> {
            context.sessionSetString('RegisterMobilePhone',this.phoneNo); 
            this.toregister();            
          }, failture => {
            this.alertMsg(failture._RejMessage);
            this.getToken();
            });
    },
    toregister() {
      this.jump('/RegisterAccountResult');
    },
  }
};
</script>