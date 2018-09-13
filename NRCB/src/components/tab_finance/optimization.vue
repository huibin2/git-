<template>
  <div class="container">
    <div class="banker-center">
      <text class="banker-center-left">{{title_name}}</text>
      <div class="banker-center-right">
        <text class="more" @click="jumpto(url)">{{more}}</text>
        <image class="img" :src="imgurl"></image>
      </div>
    </div>
    <div class="wrapper" v-for="(recommend, key) in recomList" :key="key" @click="jumpTo(recommend.url)">

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
            <text class="point2" v-if="recommend.point!=null">{{recommend.point3}}</text>
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
  margin-bottom: 20px;
}
 .banker-center {
  flex-direction: row;
  padding-left: 36px;
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
.banker-center-right{
  height: 28px;
  line-height: 28px;
  align-items: center;
  flex-direction: row;
}
.more{
  line-height: 28px;
  height:28px;
  margin-right: 53px;
  align-self: center;
  font-size: 28px;
  color: rgb(153,153,153);
}
.img{
  width:13px;
  height:24px;
  position: absolute;
  right: 36px;
}
.wrapper {
  width: 750px;
  /* justify-content: space-between; */
  background-color: #ffffff;
  border-bottom-color: #eeeeee;
}
.right{
}
.remain{
  position: absolute;
  top: 10px;
  right: 0px;
  color: rgb(216,10,48);
  font-size: 20px;
}
.recommend_name{
  font-size: 32px;
  margin-left: 36px;
  margin-top: 30px;
  height: 40px;
  line-height: 40px;
  color: black;
}
.rate{
  margin-left: 18px;
  width: 268px;
}
.buy_pro {
  margin: 42px 0px 42px 18px;
  flex-direction: row;
}
.per{
  color: rgb(216, 10, 48);
  font-size: 42px;
  font-weight: 50px;

}
.symbol{
  color: rgb(216, 10, 48);
   font-size: 32px;
  font-weight: 50px;
  padding-top: 10px;
}
.down_text{
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  color:#D0D0D0;
  margin-top: 18px; /* 28-10 */
}
.per_box {
  flex-direction:row;
  height: 50px;
}
.detail{
  font-size: 30px;
  height: 50px;
}
.point{
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 18px; /* 28-10 */
    height:40px;
}
.point1{
  color: rgb(216, 10, 48);
    border-color: rgb(216, 10, 48);
    border-width: 1px;
    border-radius: 4px;
    font-size: 24px;
    padding-left: 10px;
    padding-right: 10px;
    height:40px;
    line-height: 40px;       
}
.point2{
    color: rgb(153, 153, 153);
    border-color: rgb(153, 153, 153);
    margin-left: 16px;
    border-width: 1px;
    border-radius: 4px;
    font-size: 24px;
    padding-left: 10px;
    padding-right: 10px;
    height:40px;
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
     title_name:"",
     more:"",
     imgurl:"",
    
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
