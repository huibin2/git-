<template>
  <div class="wrapper">
    <image class="notice-image" :src="notice_img" />
    <div id="marquee" class="marquee">
      <div class="container" ref="container" :style="{top:m_top+'px'}">
        <text class="title" @click="goto(topList.url)">{{topList.title}}</text> 
          <div v-for="(item,key) in marqueelist" :key="key" @click="goto(item.url)" class="item_div">
            <text class="title">{{item.title}}</text>
            <text class="time">{{item.time}}</text>
          </div>
        <text class="title" @click="goto(bottomList.url)">{{bottomList.title}}</text> 
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 92px;
  line-height: 92px;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  /* padding-left: 20px;
  padding-right: 20px; */
}
.item_div{
  flex-direction: row;
} 
.notice-image {
  width: 30px;
  height: 30px;
  margin-left: 40px;
}
.marquee {
  width: 500px;
  height: 50px;
  margin-left: 20px;
  overflow: hidden;  
}
.container {
  height: 300px;
  position: absolute;
}
.title {
  height: 50px;
  line-height: 50px;
  text-overflow: ellipsis;
  font-size: 28px;
  color:rgb(51,51,51);
}
.time{
  font-size: 28px;
  color: rgb(153,153,153);
  margin-left: 20px;
  height: 50px;
  line-height: 50px;
}
</style>

<script>

const stream = weex.requireModule("stream");
const context = weex.requireModule("context");

module.exports = {
  /**
   * Props 接受父组件的传值
   * @prop {Json} jsonurl 跑马灯组件的json文件路径
   */
  props: ["jsonurl"],
  data() {
    return {
      notice_img: this.$store.state.imgBaseUrl + "tab_home/notice/icon_gg.png",
      marqueelist: [],
      topList: null,
      bottomList: null,
      m_length: null,
      m_top: -50,
      timer: null,
      duration: 3000,
      l_bottom: null
    };
  },
  created() {
    this.getNotice();
  },
  watch: {
    jsonurl() {
      this.getNotice();
    }
  },
  methods: {
    goto(url) {
      context.launchStage(url);
    },
    getNotice() {
      if (this.jsonurl) {
        stream.fetch(
          {
            method: "GET",
            url: this.$store.state.jsonBaseUrl + this.jsonurl,
            type: "json"
          },
          res => {
            this.marqueelist = res.data.data;
            this.m_length = this.marqueelist.length;
            this.topList = this.marqueelist[this.m_length - 1];
            this.bottomList = this.marqueelist[0];
            this.l_bottom = -50 * this.m_length;
            this.loading();
          }
        );
      }
    },
    loading() {
      this.timer = setInterval(() => {
        this.animate(-50);
      }, this.duration);
    },
    animate(offset) {
      var _this = this;
      var newLeft = this.m_top + offset;
      var time = 300; //位移总时间
      var interval = 10; //位移间隔时间
      var speed = offset / (time / interval); //每次位移量

      function go() {
        if (
          (speed < 0 && _this.m_top > newLeft) ||
          (speed > 0 && _this.m_top < newLeft)
        ) {
          _this.m_top = _this.m_top + speed;
          setTimeout(go, interval);
        } else {
          _this.m_top = newLeft;

          if (newLeft > -50) {
            _this.m_top = _this.l_bottom;
          }
          if (newLeft < _this.l_bottom) {
            _this.m_top = -50;
          }
        }
      }
      go();
    }
  }
};
</script>