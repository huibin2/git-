<template>
  <div>
   
      <image  :src="bg_img" class="bg" />
      
      <div class="row" >
        <image class="ret" :src="ret_img" @click="goBack" />  
        <text class="name">修改登录密码</text>
        <image class="home" :src="home_img" @click="goToNews()"  />  
      </div>
  </div>
</template>
<style scoped>
.bg{
  height: 120px;
  width: 750px;
}
.row {
  margin-top: -120px; 
  height: 120px;
  line-height: 120px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  /* background-color: hotpink; */
}
.ret {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 30px;
  
  top: 37px;
}
.name {
  font-size: 34px;
  
  margin-bottom: 25px;
  color: white;
}
.imgUser {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 120px;
  top: 57px;
}
.home {
  width: 60px;
  height: 60px;
  position: absolute;
  right: 30px;
  top: 37px;
  
}
.switch {
  position: absolute;
  left: 30px;
  top: 57px;
  width: 160px;
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(117, 36, 128);
  border-radius: 6px;
}
.switch-img {
  width: 24px;
  height: 23px;
  margin-right: 10px;
}
.switch-text {
  font-size: 22px;
  color: rgb(117, 36, 128);
}
</style>
<script>
/**
 * @module 头部菜单组件
 * @description 头部菜单weex组件
 * @example  <title-bar></title-bar>
 *
 *
 **/
const context = weex.requireModule("context");
const qrCode = weex.requireModule("qr-code");
import SearchBar from "@/components/tab_home/searchBar.vue";

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      showSearch: false,
      titleHeight: "",
     
      ret_img:
        this.$store.state.imgBaseUrl + "tab_home/titlebar/tit_ic_ret.png",
      
      home_img: this.$store.state.imgBaseUrl + "tab_home/titlebar/tit_ic_home.png",
      bg_img: this.$store.state.imgBaseUrl + "tab_home/titlebar/tit_bg.png",
      userInfo: ""
    };
  },
  mounted() {
    setTimeout(() => {
      let userInfo = context.sessionGetString("LoginMsg");
      // this.alertMsg(userInfo)
      if (!userInfo) {
        return;
      }
      this.userInfo = JSON.parse(userInfo);
    }, 0);
  },
  methods: {
    testQRCode() {
      // qrCode.scanQRcode();
      qrCode.scanQRcode(data => {
        if (!this.userInfo) {
          this.alertMsg("请先登录！");
          return;
        }
        this.getQueryOrder(data);
      });
    },
    //扫一扫二维码查询
    getQueryOrder(Qrdata) {
      // this.alertMsg(Qrdata);
      // this.alertMsg(this.userInfo);
      var arr = Qrdata.split("-"); //TRANSSEQNBR（订单号）+SUBMERID（商户号）+Paytypcd（付款方式）+TransAmt（支付金额）
      const params = {
        TransFlg: arr[0] == "P" ? "Pay" : "return", //	交易方式
        Transseqnbr: arr[1], //	订单号
        Submerid: arr[2], //	二级商户号
        Mersettlenbr: "", //	商户结算账号
        Payeeacctnbr: "", //	用户号
        Custnid: this.userInfo.AcctList[0].VouId, //	付款账号
        Payeracctnbr: this.userInfo.AcctList[0].VouId, //	收款账号
        Transamt: arr[4] //	交易金额
        // transdatetime:"",//	交易时间
        // transstate:"",//	交易状态：1已付款 2已退款
      };
      // this.alertMsg(JSON.stringify(params));
      this.postDo("UserCodePay.do", params, data => {
        // this.alertMsg(JSON.stringify(data));
        
        this.alertMsg("支付成功！");
        //判断是否是银联或者人到人转账
        //   let data={OrderTp:'31',BankType:'0'}
        //   context.sessionSetString("orderType", data.OrderTp);
        //   if(data.OrderTp=="31"){
        //         if(data.BankType=="0"){
        //             //走行内转账
        //             // context.sessionSetString("PayeeAcctNo",data.PayeeAcctNo);
        //             // context.sessionSetString("BankType",data.BankType)
        //             context.launchStage("main.transferaccouts");
        //         }else{
        //             //他行转账
        //             this.alertMsg('无法解析该二维码，当前扫码内容不在本行业务范围内，请更换二维码重新扫描！')
        //         }
        //   }else if(data.OrderTp=="10" || data.OrderTp=="11" || data.OrderTp=="12" || data.OrderTp=="14" || data.OrderTp=="15"){
        //     //走银联
        //  context.sessionSetString('Qr',Qrdata);
        //  context.launchStage("main.qrcode");
        //   }else{
        //       this.alertMsg("无法解析该二维码，当前扫码内容不在本行业务范围内，请更换二维码重新扫描！")
        //   }

        // },fail =>{
      });
    },
    canceldoIt() {
      this.showSearch = false;
    },
    doIt(url) {
      this.showSearch = false;
      setTimeout(() => {
        context.launchStage(url);
      }, 0);
    },
    goToSearch() {
      this.showSearch = true;
    },
    switchVersion() {
      // var platform = weex.config.env.platform.toLowerCase();
      // if (platform == "android") {
      context.replaceStage("launcherOld");
      // } else if (platform == "ios") {
      //   context.launchStage('launcherOld')
      // }
    }
  }
};
</script>
