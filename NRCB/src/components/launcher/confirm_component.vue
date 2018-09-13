<template>
  <div class="wrapper">
    <wxc-overlay v-if="show" :show="true" :hasAnimation="false" opacity="0.6"></wxc-overlay>
    <div v-if="show" class="container" :style="{top:top}">
      <div class="content">
        <div class="content-title">
          <text class="content-text">是否确认退出客户端？</text>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left" @click="confirm">
          <text class="bottom-left-text">确认</text>
        </div>
        <div class="bottom-right" @click="cancel">
          <text class="bottom-right-text">取消</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcOverlay } from "weex-ui";
export default {
  components: { WxcOverlay },
  props: {
    show: {
      type: Boolean,
      default: false
    }
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
  left: 105px;
  width: 540px;
  height: 300px;
  background-color: #fff;
  border-radius: 20px;
  align-items: center;
}
.content {
  height: 180px;
  width: 300px;
  justify-content: center;
  align-items: center;
}
.content-title {
  align-items: center;
}
.content-text {
  margin-top: 8px;
  text-align: center;
  font-size: 29px;
  color: #222;
}
.bottom {
  width: 540px;
  height: 120px;
  justify-content: center;
  flex-direction: row;
}
.bottom-left {
  width: 180px;
  height: 66px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: #00a0e8;
}
.bottom-right {
  width: 180px;
  height: 66px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: #aaaaaa;
}
.bottom-left-text {
  font-size: 28px;
  color: #ffffff;
}
.bottom-right-text {
  font-size: 30px;
  color: #ffffff;
}
</style>
