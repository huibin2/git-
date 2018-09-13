<template>
  <div class="down">
    <div class="integral_text">
      <text class="integral">积分兑换网点</text>
      <text class="more" @click="jumpTo(more.url)">{{more.title}}</text>
    </div>
    <image class="spring_img" :src="singleImg.src" @click="jumpTo(singleImg.url)" />
    <div class="tab">
      <div class="menuItem" v-for="(item,key) in websiteList" :key="key">
        <image class="image" :src="item.src" @click="jumpTo(item.url)" />
        <text class="title">{{item.name}}</text>
      </div>
    </div>
  </div>
</template>
<style scoped>
.down {
  width: 750px;
  margin-top: 15px;
  background-color: #ffffff;
}
.integral_text {
  height: 80px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-color: #eeeeee;
  border-bottom-width: 1px;
}
.integral {
  font-size: 30px;
  color: #404561;
  font-weight: 600;
}
.spring_img {
  width: 690px;
  height: 180px;
  margin-top: 20px;
  margin-left: 30px;
}
.more {
  font-size: 26px;
  color: #848996;
}
.tab {
  width: 710px;
  margin-left: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}
.menuItem {
  align-items: center;
  width: 345px;
  padding-bottom: 20px;
}
.image {
  width: 325px;
  height: 180px;
}
.title {
  font-size: 24px;
  color: #242424;
  margin-top: 15px;
}
</style>
<script>
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
export default {
  props: ["jsonurl"],
  data() {
    return {
      more: {
        title: "",
        url: ""
      },
      singleImg: {
        url: "",
        src: ""
      },
      websiteList: []
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      stream.fetch(
        {
          method: "GET",
          url: this.$store.state.jsonBaseUrl + this.jsonurl,
          type: "json"
        },
        response => {
          if (response.status === 200) {
            var tmp = response.data.data;

            this.singleImg = tmp.singleImg;
            this.websiteList = tmp.websiteList;
          }
        }
      );
    },
    jumpTo(url) {
      if (url) {
        context.launchStage(url);
      }
    }
  }
};
</script>
