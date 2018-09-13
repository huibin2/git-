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
      
       <!--用数组下标去除第一个div-->
        <div class="first_div" @click="jumpTo(integralmallList.url)">
          <div class="first_div_null"></div>
          <div class="first_div_text">
            <text class="text1">{{integralmallList[0].text}}</text>
            <text class="small_text1">{{integralmallList[0].small_text}}</text>
          </div>
          <div class="first_div_img">
            <image :src="integralmallList[0].src" class="img1"></image>
          </div>
        </div>

        <!--不是第一个div-->
       <div class="no_first_bigdiv">
        <div class="wrapper" v-for="(integral , key) in integralmallList" @click="jumpTo(integral.url)" :key="key" v-if='key!=0'>
        <!-- <div class="no_first_div" v-if='key!=0'>  -->
          <div class="no_first_div_text">
            <text class="text">{{integral.text}}</text>  
            <text class="small_text">{{integral.small_text}}</text>  
          </div>
          <div class="no_first_div_img">
            <image :src="integral.src" class="imgs"></image>
          </div>
        <!-- </div> -->
       </div>
       <div class="no_first_div_null"></div>
      </div>
      
    </div>
    <!--底边线-->
    <div class="bottom_line"></div>

  </div>

</template>

<style scoped>
.container {
  width: 750px;
  background-color:#ffffff;
  /* margin-bottom: 20px; */

  /* height: 528px; */
}
.content{
  height: 528px;
  margin-right: 36px;
  /* background-color: red;   */
}
.first_div{
  width:750px; 
  height:286px;
} 
.first_div_null{
  height:32px;
}
.first_div_text{
  height:72px;
}

.img1{
  height: 125px;
  width:200px;
  margin-top: 30px;
  margin-left: 270px;
}
.text1{
  font-weight: bold;
  color:rgb(51, 51, 51);
  font-size: 36px;
  text-align: center;
}
.small_text1{
  font-size: 28px;
  color:rgb(102, 102, 102);
  text-align: center;
  }

.first_div_img{
  height:182px;
}

.no_first_bigdiv{
  flex-direction: row;
  height: 242px;
  /* background-color: yellow; */
}
 
.wrapper{
  /* background-color: #eeeeee; */
  flex-direction: column;  
  float: left; 
  width:245px;
}
.no_first_div_text{
  height: 86px;
  margin-right: 20px;
  /* background-color:red; */
}
.no_first_div_img{
  margin-top:12px;
  height: 124px;
  margin-left: 20px;
}
.no_first_div_null{
  height: 32px;
  /* background-color: black; */
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
.bottom_line{
   width: 750px;
   background-color:rgb(240, 240, 240);
   height:20px;
   /* margin-top: 20px; */
}



.imgs{
  height: 100px;
  width:100px;
  margin-left: 40px;
}
.text{
  font-size: 30px;
  color:rgb(51, 51, 51);
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
}
.small_text{
  font-size: 24px;
  color:rgb(102, 102, 102);
  color:#848996;
  text-align: center;
  margin-top: 8px;
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
      details: {
        title: "",
        url: ""
      },
      integralmallList: []
    };
  },
  created() {
    this.getIntegral();
  },
  methods: {
    jumpTo(url) {
      if (url) {
        context.launchStage(url);
      }
    },
    getIntegral() {
      if (this.jsonurl) {
        stream.fetch(
          {
            method: "GET",
            url: this.$store.state.jsonBaseUrl + this.jsonurl,
            type: "json"
          },
          res => {
         
            this.integralmallList = res.data.data.integralmallList;
            this.more = res.data.data.more;
            this.imgurl = res.data.data.imgurl;
            this.title_name = res.data.data.title_name;
           
          }
        );
      }
    }
  },
  watch: {
    jsonurl() {
      this.getIntegral();
    }
  }
};
</script>