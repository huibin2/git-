<template>
<div class="container">
<slider class="slider" interval="5000" auto-play="true" @change="getIndex">
<div class="frame" v-for="(ad,index) in ad_list" :key="index">
  <image class="image" resize="cover" @click="jumpTo(ad.url)" :src="ad.src" />
 

</div>

<!-- <indicator class="indicator"></indicator> -->

</slider>
  <div class="indication" :style="{height: height + 'px', width: (width+14)*length + 'px'}">
    <div class="point" v-for="(ad,key) in ad_list" v-if="key>=0" :style="{height: height + 'px', width: width + 'px'}">
      <image :src="over" class="point1" v-if="key==index" :style="{height: height + 'px', width: width + 'px'}"></image>
      <image :src="nover" class="point2" v-else :style="{height: height + 'px', width: width + 'px'}"></image>
    </div>
  </div>
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
/* .indicator {
  position: absolute;
  top: 60px;
  width: 750px;
  height: 300px;
  item-color: white;
  item-selected-color: red;
  item-width: 10px;
  item-height: 10px;
} */
.image {
  width: 750px;
  height: 232px;
}

.indication{
  /* height: 4px;
  width:108px; */
  flex-direction: row;
  position: absolute;
  top: 210px;
  left: 321px;
}
.point {
  /* height: 4px;
  width: 22px; */
  margin-left: 7px;
  margin-right: 7px;
}
.point1{
  /* height: 4px;
  width: 22px; */
}
 .point2{
  /* height: 4px;
  width: 22px; */
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
      ad_list: [],
      length:"",
      over:"",
      nover:"",
      index:"",
      height:"",
      width:""     
    };
  },
  mounted() {
    this.getAd();
  },
  methods: {
    getAd() {
      stream.fetch(
        {
          method: "GET",
          url: this.$store.state.jsonBaseUrl + this.jsonurl,
          type: "json"
        },
        res => {
          this.ad_list = res.data.data;
          this.over = res.data.point.src.over;
          this.nover = res.data.point.src.nover;
          this.height = res.data.point.height;
          this.width = res.data.point.width;
          this.length = ad_list.length;
        }
      );
    },
    getIndex(event){
      this.index = event.index;
    }
  }
};
</script>