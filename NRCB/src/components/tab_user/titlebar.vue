<template>
  <div class="container" :style="{height:height}">
    <image  :src="bg_img" class="bg" :style="{height:height}"/>
    <div class="row" >
      <image class="imgQrcode" :src="qrcode_img" @click="testQRCode" />  
      <image class="imgLogo" :src="logo_img" @click="goTo()" />
      <image class="imgNews" :src="news_img" @click="goToNews()"  />
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 128px;
}
.bg {
  height: 128px;
  width: 750px;
}
.row {
  margin-top: -128px;
  height: 128px;
  line-height: 128px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 42px;
  /* background-color: hotpink; */
}
.imgQrcode {
  width: 48px;
  height: 48px;
  position: absolute;
  left: 26px;
  top: 58px;
  align-self: center;
}
.imgLogo {
  width: 240px;
  height: 50px;
  align-content: center;
}

.imgNews {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 26px;
  top: 58px;
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
const stream = weex.requireModule("stream");
import SearchBar from "@/components/tab_home/searchBar.vue";

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      showSearch: false,
      switch_img:
        this.$store.state.imgBaseUrl + "tab_home/titlebar/switch@3x.png",
      qrcode_img:
        this.$store.state.imgBaseUrl + "tab_home/titlebar/tit_ic_sys.png",
      logo_img: this.$store.state.imgBaseUrl + "tab_home/titlebar/logo.png",
      news_img:
        this.$store.state.imgBaseUrl + "tab_home/titlebar/tit_ic_xx.png",
      bg_img: this.$store.state.imgBaseUrl + "tab_home/titlebar/tit_bg.png",
      userInfo: "",
      height:"128px",  //titlebar高度
      hasFringe:false,
      fringes:[],

    };
  },
  created(){
    this.getHeight();
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
    getHeight() {
      stream.fetch(
        {
          method:"GET",
          url:"json/common/phone_type.json",
          type:"json"
        },
        res => {
          this.fringes = res.data.data.fringes;
          for(var i = 0;i < this.fringes.length;i++){
            if(this.$store.state.deviceModel == this.fringes[i]){
              this.hasFringe = true;
              break;
            }
          }
          if(this.hasFringe){
            this.height = "158px";
          }else{
            this.height = "128px";
          }
        }
      );
    },

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
