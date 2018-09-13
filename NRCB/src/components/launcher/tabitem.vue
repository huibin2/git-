<template>
  <div :style="[{backgroundColor: backgroundColor},{height:height},{paddingBottom:bottom }]" class="container" @click="onclickitem">
    <image :src="icon" class="tab_icon" />
    <text :style="{ color: titleColor }" class="tab_text">{{title}}</text>
  </div>
</template>

<style scoped>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100px;
}
.tab_icon {
  margin-top: 5px;
  width: 46px;
  height: 46px;
}

.tab_logo {
  margin-top: 5px;
  width: 228px;
  height: 50px;
}
.tab_text {
  margin-top: 5px;
  text-align: center;
  font-size: 24px;
}
</style>

<script>
module.exports = {
  data() {
    return {
      height:"",
      bottom:""
    };
  },
  props: {
    index: { default: 0 },
    title: { default: "" },
    titleColor: { default: "#808080" },
    icon: { default: "" },
    backgroundColor: { default: "#ffffff" }
  },
  created(){
    this.getHeightAndBottom();
  },
  methods: {
    getHeightAndBottom(){
      var height = 100;
      var bottom = 0;
      if(this.$store.state.deviceModel=="iPhone X"){
        height = 120;
        bottom = 20;
      }
      this.height = height + "px";
      this.bottom = bottom + "px";
    },
    onclickitem: function(e) {
      var params = {
        index: this.index
      };
      this.$emit("tabItemOnClick", params);
    }
  }
};
</script>
