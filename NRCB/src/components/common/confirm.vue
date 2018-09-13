<template>
  <div class="wrapper">
    <wxc-overlay :hasAnimation="false" opacity="0.6"></wxc-overlay>
    <!--指纹验证弹出框-->
    <div class="container" :style="{top:top}">
      <div class="title" v-if="data.title!=null&&data.title!=''">
        <text class="title_text">{{data.title}}</text>
      </div>
      <div class="content">
        <image class="fingerPic" v-if="data.img_url!=null" :src="data.img_url"></image>
        <div class="content-title">
          <text class="content-text">{{data.text}}</text>
        </div>
      </div>
      <div class="bottom" v-if="data.ok==''||data.ok==null">
        <text class="bottom-text1" @click="cancel" >{{data.cancel}}</text>
      </div>
      <div class="bottom" v-else>
        <text class="bottom-text2" @click="confirm" >{{data.ok}}</text>
        <text class="bottom-text2" @click="cancel" >{{data.cancel}}</text>
      </div>

    </div>  
  </div>
</template>

<script>
import { WxcOverlay } from "weex-ui";
const stream = weex.requireModule("stream");

export default {
  components: { WxcOverlay },
  props:{
    data:{},  //弹窗信息
  },
  data() {
    return {
      top: "0px"
    };
  },
  mounted() {
    this.getHeight();
  },
  methods: {

    confirm() {
      this.$emit("confirm");
    },

    cancel() {
      this.$emit("cancel");
    },
    getHeight() {
      const { env: { deviceHeight, deviceWidth } } = weex.config;
      var pageHeight = deviceHeight / deviceWidth * 750;
      this.top = pageHeight / 2 - 150 + "px";
    }

  }
};
</script>

<style scoped>
.wrapper {
  position: fixed;
  width: 750px;
  /*兼容H5异常*/
  z-index: 99999;
}
.container {
  position: fixed;
  left: 75px;
  width: 600px;
  background-color: #fff;
  border-radius: 20px;
  align-items: center;
}
.content {
  width: 516px;
  justify-content: center;
  align-items: center;
  margin: 42px;
}
.title{
  width: 516px;
  margin: 42px 42px 0px 42px;
  justify-content: center;
  align-items: center;
}
.title_text{
  width: 516px;
  font-size: 40px;
  color: black;
  height:50px;
  line-height: 50px;
  text-align: center;
}
.fingerPic{
  height: 153px;
  width: 153px;
  margin-bottom: 42px;
}
.content-title {
  align-items: center;
}
.content-text {
  width: 516px;
  line-height: 42px;
  text-align: center;
  font-size: 30px;
  color: rgb(51, 51, 51);
}
.bottom {
  width: 600px;
  height: 98px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-width:1px;
  border-color: rgb(229, 229, 229); 
}
.bottom-text1{
  height: 98px;
  width: 300px;
  line-height: 98px;
  text-align: center;
  font-size: 32px;
  color:rgb(216, 10, 48);
}
.bottom-text2{
  border-width:1px;
  border-color: rgb(229, 229, 229); 
  height: 98px;
  width: 300px;
  line-height: 98px;
  text-align: center;
  font-size: 32px;
  color:rgb(216, 10, 48);
}

</style>
