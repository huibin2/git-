<template>
  <div class="header" :style="{backgroundColor:bgcolor}">
    <image class="bg-img" src="./imgs/tit_bg.png"></image>
    <div class="main">

      <div class="title-left">
        <div v-if="leftElement.exist">
          <div class="imgDiv" v-if="leftElement.head.exist">
            <image class="codeImg" :src="leftElement.head.src" @click="goto(leftElement.head.url)" />
          </div>
          <div class="backDiv" v-if="leftElement.back.exist" @click="goBack">
            <image class="backImg" :src="leftElement.back.src" />
          </div>
          <div class="imgDiv" v-if="leftElement.qrcode.exist">
            <image class="qrImg" :src="leftElement.qrcode.src" @click="goto(leftElement.qrcode.url)" />
          </div>
        </div>
      </div>
      <div class="title-box">
        <div v-if="centerElement.exist">
          <div class="title-text-box" v-if="centerElement.title.exist">
            <text class="title" :style="{color: fontcolor}">{{centerElement.title.text}}</text>
          </div>
          <div class="logo-box" v-if="centerElement.logo.exist">
            <image class="logo" :src="centerElement.logo.src" />
          </div>
        </div>
      </div>
      <div class="title-right">
        <div v-if="rightElement.exist">
          <div class="imgDiv" v-if="rightElement.login.exist">
            <image class="qrImg" :src="rightElement.login.src" @click="goto(rightElement.login.url)" />
          </div>
          <div class="title-text-box" v-if="rightElement.titl.exist">
            <text class="title">{{rightElement.titl.text}}</text>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    /*height: 133px;*/
    width: 750px;
    padding-top: 18px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .bg-img {
    width: 750px;
    height: 133px;
    margin-top: -18px;
    margin-left: -20px;
  }

  .main {
    margin-top: -110px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .bgclass {
    position: absolute;
    /* width: 1080px;
    height: 116px; */
    width: 750px;
    height: 100px;
  }
  .title-left {
    flex: 1;
    /*margin-top: -120px;*/
    position: relative;
    /*z-index: 9;*/
  }
  .imgDiv {
    height: 100px;
    width: 80px;
    justify-content: center;
     align-items: center;
  }
  .backDiv {
    height: 100px;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 100px;
  }
  .backImg {
    width: 46px;
    height: 46px;
    margin-top:20px;
  }
  .back-text {
    font-size: 34px;
    color: #00b9f4;
  }
  .qrImg {
    width: 50px;
    height: 50px;
    margin-top: 20px;
  }
  .title-box {
    flex: 2;
  }
  .title {
    font-size: 36px;
    text-align: center;
    font-weight: bolder 1px;
    margin-top:20px;
  }
  .logo-box {
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  .logo {
    /* width: 337px;
    height: 73px; */
    width: 277px;
    height: 60px;
  }
  .title-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .rightDiv {
    height: 100px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .codeImg {
    width: 62px;
    height: 62px;
  }
</style>
<script>
  const context = weex.requireModule("context");
  const stream = weex.requireModule("stream");
  export default {
    props: {
      titleJson: {
        default: "login/titlebar.json"
      }
    },
    data() {
      return {
        leftElement: {
          exist: true,
          back: {
            exist: true,
            src: "./imgs/login/back-white.png",
            url: ""
          },
          head: {
            exist: false,
            src: "./imgs/titlebar/head.png",
            url: ""
          },
          qrcode: {
            exist: false,
            src: "./imgs/titlebar/qrcode.png",
            url: ""
          }
        },
        centerElement: {
          exist: true,
          title: {
            exist: true,
            text: "登录"
          },
          logo: {
            exist: false,
            src: "./imgs/titlebar/logo.png",
            url: ""
          }
        },
        rightElement: {
          exist: false,
          login: {
            exist: false,
            src: "./imgs/titlebar/login@3x.png",
            url: ""
          },
          titl: {
            exist: true,
            text: "安全退出"
          },
        },
        bgcolor: "#ffffff",
        fontcolor: "#000000"
      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        stream.fetch(
          {
            method: "GET",
            url: "./json/" + this.titleJson,
            type: "json"
          },
          res => {
            // this.title = res.data.data.title;
            this.fontcolor = res.data.fontcolor;
            this.bgcolor = res.data.bgcolor;
            this.leftElement = res.data.leftElement;
            this.centerElement = res.data.centerElement;
            this.rightElement = res.data.rightElement;
          }
        );
      },
        goto(url) {
          context.replaceStage(url);
        }
    }
  };
</script>