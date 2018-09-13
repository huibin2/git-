<template>
<div class="container">
<slider class="slider" interval="5000" auto-play="true">
<div class="frame" v-for="(ad,key) in ad_list" :key="key">
<image class="image" resize="cover" @click="goto(ad.url)" :src="ad.src" />
</div>
<indicator class="indicator"></indicator>
</slider>
</div>
</template>

<style scoped>
.container {
  width: 750px;
  height: 232px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.slider {
  width: 750px;
  height: 232px;
}
.frame {
  width: 750px;
  height: 232px;
}
.indicator {
  position: absolute;
  top: 60px;
  width: 750px;
  height: 300px;
  item-color: white;
  item-selected-color: red;
  item-width: 10px;
  item-height: 10px;
}
.weex-indicator-item {
  height: 4px;
  width: 22px;
  margin-left: 7px;
  margin-right: 7px;
}
.image {
  width: 750px;
  height: 232px;
}
</style>
<script>
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");
const modal = weex.requireModule("modal");
export default {
  props: ["jsonurl"],
  data() {
    return {
      ad_list: []
    };
  },
  mounted() {
    this.getAd();
  },
  methods: {
    goto(url) {
      context.launchStage(url);
    },
    getAd() {
      stream.fetch(
        {
          method: "GET",
          url: this.$store.state.jsonBaseUrl + this.jsonurl,
          type: "json"
        },
        res => {
          this.ad_list = res.data.data;
        }
      );
    }
  }
};
</script>