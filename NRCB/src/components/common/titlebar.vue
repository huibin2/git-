<template>
  <div class="container" :style="{height:height}">
    <!--背景图片-->
    <image :src="title_bg" class="blueBg"  :style="{height:height}"/>
    <!--顶部内容-->
    <div class="row">
      <!--二维码扫描图片-->
      <image class="qr_scan" :src="qr_img" @click="testQRCode"></image>
    
      <search-bar @cancel="canceldoIt" @transTo="doIt"></search-bar>
      <image class="imgMessage" :src="message_img" @click="goTo()" />
    </div>
  </div>
</template>
<style scoped>
.container{
  height: 128px;
}
.blueBg {
  height: 128px;
  width: 750px;
}
.row {
  margin-top: -128px;
  height: 128px;
  line-height: 128px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 42px;
}
.qr_scan{
  height: 48px;
  width: 48px;
  position: absolute;
  top: 58px;
  left: 26px;
  align-self: center
}
.search{
  height: 55px;
  width: 542px;
}
.search_img{
  height:30px;
  width:30px;
  position: absolute;
  left:20px;
  top:13px;
  z-index: 5;
}
.key_search{
  height: 56px;
  width: 542px;
  padding-left:63px;
  border-radius: 5px;
  background-color: rgba(255,255,255, 0.3);
  font-size: 28px;
  line-height: 50px;
  color: rgb(252, 208, 211);
  letter-spacing: 1px;
  placeholder-color: rgb(252, 208, 211);
}
.key_search::-webkit-input-placeholder {
  color: rgb(252, 208, 211)
}
.imgMessage {
  height: 48px;
  width: 48px;
  position: absolute;
  right: 26px;
  top: 58px;
}
.title_font {
  font-size: 36px;
  color: #ffffff;
  font-weight: 600;
}
</style>
<script>
import SearchBar from "@/components/common/searchBar.vue";
const qrCode = weex.requireModule("qr-code");
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
const modal = weex.requireModule("modal");
// export default {
//   data() {
//     return {
//       search_img:this.$store.state.imgBaseUrl + "common/titlebar/icon_search.png",
//       qr_img:this.$store.state.imgBaseUrl + "common/titlebar/tit_ic_sys.png",
//       title_bg: this.$store.state.imgBaseUrl + "common/titlebar/tit_bg.png",
//       message_img: this.$store.state.imgBaseUrl + "common/titlebar/tit_ic_xx.png",
//       keyword:'',
//     };
//   }
// };

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      showSearch: false,
      titleHeight: "",
      switch_img:
        this.$store.state.imgBaseUrl + "tab_home/titlebar/switch@3x.png",
      qrcode_img:
        this.$store.state.imgBaseUrl + "tab_home/titlebar/qrcode@3x.png",
      logo_img: this.$store.state.imgBaseUrl + "tab_home/titlebar/logo@3x.png",
      user_img: this.$store.state.imgBaseUrl + "search@3x.png",
      userInfo: "",
      title_bg: this.$store.state.imgBaseUrl + "common/titlebar/tit_bg.png",
      qr_img:this.$store.state.imgBaseUrl + "common/titlebar/tit_ic_sys.png",
      message_img: this.$store.state.imgBaseUrl + "common/titlebar/tit_ic_xx.png",
      height:"128px",  //titlebar高度
      hasFringe:false,
      fringes:[],
    };
  },
  created(){
    this.getHeight(); //根据机型选择不同高度
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
          url:this.$store.state.jsonBaseUrl + "json/common/phone_type.json",
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
