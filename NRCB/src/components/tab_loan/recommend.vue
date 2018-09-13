<template>
  <div class="container">
    <div class="banker-center">
      <text class="banker-center-left">{{title_name}}</text>
       <text class="more" @click="jumpto(url)">{{more}}</text>
       <image class="img" :src="imgurl"></image>
    </div>
    <div class="wrapper" v-for="(recommend, key) in recomList" :key="key" @click="jumpTo(recommend.url)">

      <text class="recommend_name">{{recommend.recommend_name}}</text>
      <div class="buy_pro">
        <div  class="rate">
          <div class="per_box">
            <text class="per">{{recommend.rate}}</text>
            <text class="symbol">%</text>
          </div>
          <text class="down_text">{{recommend.introduce}}</text>
           
        </div>
         <div class="right">
          <div>
            <text class="detail">{{recommend.detail}}</text>
            <text class="remain">{{recommend.remain}}</text>
          </div>
          <div class="point">
            <text class="point1">{{recommend.point1}}</text>
            <text class="point2">{{recommend.point2}}</text>
            <text class="point2">{{recommend.point3}}</text>
          </div>
        </div>
      </div> 
    </div>
  </div>

</template>
<style scoped>
.container {
  width: 750px;
  background-color: #ffffff;
  margin-top: 20px;
}
.banker-center {
  flex-direction: row;
  margin-left: 36px;
  background-color: #ffffff;
  height: 89px;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: rgb(229, 229, 229);
  border-bottom-width: 1px;
}

.banker-center-left {
  font-size: 34px;
  font-weight: 600;
  color: rgb(51, 51, 51);
}
.more {
  font-size: 28px;
  color: rgb(153, 153, 153);
  margin-left: 400px;
}
.wrapper {
  width: 750px;
  /* justify-content: space-between; */
  background-color: #ffffff;
  border-bottom-color: rgb(229, 229, 229);
}
.remain {
  position: absolute;
  top: 13px;
  right: 50px;
  color: #ef3034;
  font-size: 20px;
}

.recommend_name {
  font-size: 32px;
  margin-left: 36px;
  margin-top: 30px;
  height: 40px;
  line-height: 40px;
  color: rgb(51, 51, 51);
}
.rate {
  margin-left: 18px;
  width: 216px;
}
.buy_pro {
  margin-top: 28px;
  flex-direction: row;
  margin-left: 15px;
  height: 120px;
  margin-bottom: 42px;
}
.per {
  color: rgb(216, 10, 48);
  font-size: 42px;
  font-weight: 50px;
}
.symbol {
  color: rgb(216, 10, 48);
  font-size: 32px;
  font-weight: 50px;
  padding-top: 10px;
}
.down_text {
  font-size: 25px;
  color: rgb(153, 153, 153);
  margin-top: 28px;
}
.per_box {
  flex-direction: row;
}
.detail {
  font-size: 30px;
}
.right {
  margin-top: 12px;
}
.point {
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 21px;
}
.point1 {
  color: rgb(216, 10, 48);
  border-color: rgb(216, 10, 48);
  border-width: 1px;
  border-radius: 4px;
  font-size: 24px;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;
  line-height: 40px;
}
.point2 {
  color: rgb(153, 153, 153);
  border-color: rgb(153, 153, 153);
  margin-left: 16px;
  border-width: 1px;
  border-radius: 4px;
  font-size: 24px;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;
  line-height: 40px;
}
</style>
<script>
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");
export default {
  props: ["jsonurl"],
  data() {
    return {
      recomList: [],
      title_name: "",
      more: "",
      imgurl: ""
    };
  },
  created() {
    this.getRecommend();
  },
  methods: {
    jumpTo(url) {
      if (url) {
        context.launchStage(url);
      }
    },
    getRecommend() {
      if (this.jsonurl) {
        stream.fetch(
          {
            method: "GET",
            url: this.$store.state.jsonBaseUrl + this.jsonurl,
            type: "json"
          },
          res => {
            this.more = res.data.data.more;
            this.imgurl = res.data.data.imgurl;
            this.title_name = res.data.data.title_name;
            this.recomList = res.data.data.recomList;
          }
        );
      }
    }
  },
  watch: {
    jsonurl() {
      this.getRecommend();
    }
  }
};
</script>
