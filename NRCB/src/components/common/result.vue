<template>
    <div class="container">
        <scroller>
            <div class="img_area">
                <image class="successImg" :src="imgsrc" />
                <text class="text">{{text}}</text>
            </div>
            <div class="button4" @click="goto(url)"><text class="text1">{{next}}{{second}}{{s}}</text></div>
        </scroller>
       
    </div>

</template>
<style scoped>
.button4 {
  height: 88px;
  margin-left: 36px;
  margin-right: 36px;
  /* margin-bottom:76.5px; */
  /* margin-top:42.5px; */
  margin-top: 42px;
  /* margin-bottom: 20px; */
  border-radius: 10px;
  background-color: #efeff4;
  justify-content: center;
  align-items: center;
  border-color: #f00000;
  border-width: 2px;
}
.container {
  background-color: #efeff4;
  height: 1180px;
  margin-top: 128px;
}
.img_area {
  background-color: white;
  /* margin-top: -34px; */
  width: 750px;
  height: 400px;
}
.successImg {
  width: 114px;
  height: 114px;
  margin-top: 100px;
  margin-left: 323px;
}
.text {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: green;
  font-weight: bold;
  letter-spacing: -0.55px;
  line-height: 86px;
  text-align: center;
}
.text1 {
  font-size: 32px;
  color: #f00000;
}
.confirm {
  width: 668px;
  height: 82px;
  margin-top: 117px;
  margin-left: 41px;
}
</style>

<script>
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");

export default {
  props: {
    jsonurl: {
      default: "common/result.json"
    }
  },
  data() {
    return {
      text: "", //文字提示
      next: "", //下一步
      second: "", //倒计时间
      s: "", //单位 秒
      timer: "" ,//计时器
      url:"",  //跳转路径
      imgsrc:"",
      countDownTime:""
    };
  },
  created() {
    this.getRecommend();
  },
  mounted(){
  },
  methods: {
    // 确认按钮
    goto(url) {
      this.jump(url);
    },
    //获取json数据
    getRecommend() {
      stream.fetch(
        {
          method: "GET",
          url: "./json/" + this.jsonurl,
          type: "json"
        },
        res => {
          this.text = res.data.data.text;
          this.next = res.data.data.next;
          this.url = res.data.data.url;
          this.second = res.data.downtext.second;
          this.s = res.data.downtext.s;
          this.imgsrc = res.data.data.imgsrc;
          this.countDownTime = res.data.downtext.isExist;
          this.countDown();
        }
      );
    },
    countDown() {
      if(this.countDownTime == "Y"){
        this.timer = setInterval(() => {
          this.second--;
          if (this.second <= 0) {
            clearInterval(this.timer);
            this.goto(this.url);
          }
        }, 1000);
       }
    }
  }
};
</script>