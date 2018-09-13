<template>
  <div class="container">
    <!--背景图片-->
    <image :src="title_bg" class="blueBg" />
    <!--顶部内容-->
    <div class="row">
      <!--二维码扫描图片-->
      <image class="qr_scan" :src="qr_img"></image>
      <!--搜索功能菜单-->
      <!-- <text class="title_font">理财</text> -->
      <div class="search">
        <image class="search_img" src="./imgs/tab_finance/titlebar/icon_search.png"></image>
        <input class="key_search" placeholder="随存随取天天盈" v-model="keyword"/>
      </div>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 42px;
}
.qr_scan{
  height: 48px;
  width: 48px;
  position:absolute;
  left: 26px;  
  top: 58px;
}
.search{
  height: 56px;
  width: 542px;
  align-content: center;
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
  line-height: 56px;
  color: rgb(255,255,255);
  letter-spacing: 1px;
  placeholder-color: rgb(252, 208, 211);
}
.key_search::-webkit-input-placeholder {
  color: rgb(252, 208, 211)
}.imgMessage {
  height: 48px;
  width: 48px;
  position:absolute;
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
export default {
  data() {
    return {
      qr_img:this.$store.state.imgBaseUrl + "tab_loan/titlebar/tit_ic_sys.png",
      title_bg: this.$store.state.imgBaseUrl + "tab_loan/titlebar/tit_bg.png",
      message_img: this.$store.state.imgBaseUrl + "tab_loan/titlebar/tit_ic_xx.png",
      keyword:'',
    };
  }
};
</script>
