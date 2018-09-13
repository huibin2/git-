<template>
  <div class="container" :style="{backgroundColor:backgroundColor}">
    <div class="cell" v-for="(items,index) in cellData" :key="index">
      <div class="row" v-for="(item,key) in items.cell" v-if="item.url!='/fingerLoginSet'||isFingerProvided=='1'" :key="key" @click="jumpTo(item.url)" :class="[key+1==items.cell.length ? 'm-btm0' : '']">
        
        <div class="row-left">  
          <image class="item-src" :src="item.src"/>                   
          <text class="title">{{item.title}}</text>
        </div>
        <div class="row-right">
          <text v-if="item.content" class="content">{{item.content}}</text> 
          <image class="arrow" src="./imgs/tab_user/homepage/showe@3x.png" />
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 750;
  margin-top: 20px;
}
.row {
  height: 88px;
  width: 750px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
  padding-left: 20px;
  padding-right: 43px;
  background-color: #ffffff;
}
.m-btm0 {
  margin-bottom: 0px;
}
.title {
  margin-left: 24px;
  margin-right: 36px;
  font-size: 30px;
  color:(51,51,51);
}
.row-left {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.row-right {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.content {
  margin-right: 27px;
  font-size: 28px;
  color: #b0b0b0;
}
.arrow {
  width: 20px;
  height: 38px;
}
.item-src{
  margin-left: 36 px;
  width: 42px;
  height: 38px;
}
</style>
<script>
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");
const fingerprint = weex.requireModule("fingerprint");
export default {
  props: {
    cell: {
      type: String,
      default: "tab_user/safecell.json"
    }
  },
  created() {
    this.getData();
    // this.fingerFlag = context.secureGetString('FingerFlag');     // 指纹登录
    // this.grapFlag = context.secureGetString('GrapFlag');         // 手势登录
    // this.faceFlag = context.secureGetString('HumanFaceFlag');// 刷脸登录
  },
  data() {
    return {
      isFingerProvided:"",
      backgroundColor: "#F8F8F8",
      cellData: [],
      fingerFlag:"",
      grapFlag:"",
      faceFlag:"",
    };
  },
  methods: {
    getData() {
      this.isFingerProvided = context.sessionGetString("isFingerProvided");
      if (this.cell) {
        stream.fetch(
          {
            method: "GET",
            url: "./json/" + this.cell,
            type: "json"
          },
          res => {
            this.cellData = res.data.data;
          }
        );
      }
    },
    jumpTo(url) {
      if (url) {
        // context.launchStage(url);
        this.jump(url);
      }
    }
  }
};
</script>