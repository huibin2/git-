<template>
	<div class="background" @click="goLogin">
		<div class="line"></div>
		<text class="text">点击查看您的资产负债情况</text>
	</div>
</template>
<style scoped>
.background {
  /*background-color: #F8F8F8;*/
  height: 230px;
}
.line {
  background-color: #f8f8f8;
  height: 15px;
  width: 750px;
}
.text {
  margin-top: 55px;
  height: 105px;
  margin-left: 100px;
  width: 550px;
  color: dodgerblue;
  text-align: center;
  line-height: 105px;
  border-style: dashed;
  border-width: 1px;
  border-color: #000000;
}
</style>
<script>
const context = weex.requireModule("context");
export default {
  data() {
    return {};
  },
  methods: {
    goLogin() {
      context.launchStage("main.login");
    }
  }
};
</script>