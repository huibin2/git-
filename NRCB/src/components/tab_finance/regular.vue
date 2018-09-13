<template>
  <div class="container">

    <div class="banker-center">
      <text class="banker-center-left">{{title_name}}</text>
      <div class="banker-center-right">
        <text class="more" @click="jumpTo(url)">{{more}}</text>
        <image class="img" :src="imgurl"></image>
      </div>
    </div>


    <div class="content">
      <div class="wrapper" v-for="(finance , key) in financeList" :key="key">
        <div class="pro_rate" @click="jumpTo(finance.url)">
          <text class="finance_name">{{finance.finance_type}}</text>
          <div class="per_box">
            <text class="per">{{finance.rate}}</text>
            <text class="symbol">%</text>
          </div>
          <text class="down_text">预期年化收益率</text>
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
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 36px;
}
.wrapper {
  width: 250px;
  background-color: #ffffff;
  border-left-color: #eeeeee;
  border-left-width: 2px;
}

.finance_name {
  font-size: 30px;
  height: 30px;
  line-height: 30px;
  align-self: center;
  color:rgb(51, 51, 51);
}

.per_box{
  flex-direction: row;
  align-self: center;  
  margin-top: 40px;
}

.per {
  font-size: 42px; 
  color: rgb(216, 10, 48);
}

.symbol {
  margin-top: 15px;
  margin-left: 5px;
   color: rgb(216, 10, 48);
  font-size: 30px;
}

.down_text {
  height: 24px;
  line-height: 24px;
  font-size: 23px;
  align-self: center;
  color: rgb(153, 153, 153);
  margin-top: 26px
}


.pro_intro{
  width: 450px;
  position: absolute;
  left: 300px;
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
      imgurl:"",
      more:"",
      details: {
        title: "",
        url: ""
      },
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
            this.title_name = res.data.data.title_name;
            this.imgurl = res.data.data.imgurl;
            this.more = res.data.data.more;
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