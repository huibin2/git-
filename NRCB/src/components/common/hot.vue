<template>
  <div class="container">
    <div class="banker-center">
      <text class="banker-center-left">{{title_name}}</text>
      <div class="banker-center-right">
        <text class="more" @click="jumpto(url)">{{more}}</text>
        <image class="img" :src="imgurl"></image>
      </div>
    </div>
    <!--内容-->
    <div class="content">
      <div class="wrapper" v-for="(finance , key) in financeList" :key="key">
        <!--图片-->
        <image :src="finance.src" @click="jumpTo(finance.url)" class="image"></image>
        <!--图片说明-->
        <text class="desc">{{finance.text}}</text>
        <!--费用，有则显示-->
        <div class="money" v-if="finance.money!=null">
          <text class="amount">{{finance.money}}</text>
          <text class="suf">起</text>
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
.content{
  width: 678px;
  flex-direction: row;
  background-color: #ffffff;
  border-bottom-color: #eeeeee;
  border-bottom-width: 1px;
  margin-left: 31px;
  margin-top:24px;
}

.wrapper {
  margin-left: 5px;
  margin-right: 5px;
  flex-direction: column;  
  justify-content: space-between;
  align-items: center;

}

.image{
  height: 128px;
  width:220px;
}
.desc{
  height: 62px;
  align-self: center;
  font-size: 30px;
  line-height: 62px;
  color: rgb(51, 51, 51)
}
.money{
  height: 51px;
  flex-direction: row;
  margin-bottom: 36px;
}
.amount{
  text-align: center;
  line-height: 51px;  
  font-size: 26px;
  font-weight: 50px;
  color: rgb(216,10,48);
}
.suf{
  line-height: 51px;  
  font-size: 20px;
  margin-left: 5px;
  color: rgb(102,102,102);
}
</style>
<script>
//理财类型： hot、black、presale 、setUp、soldOut
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");
export default {
  props: ["jsonurl"],
  data() {
    return {
      title_name:"",
      more:"",
      imgurl:"",
      financeList: []
    };
  },
  created() {
    this.getFinance();
  },
  methods: {
    jumpTo(url) {
      if (url) {
        context.launchStage(url);
      }
    },
    getFinance() {
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
            this.financeList = res.data.data.financeList;
          }
        );
      }
    }
  },
  watch: {
    jsonurl() {
      this.getFinance();
    }
  }
};
</script>