<template>
  <div class="container">
    <title-bar></title-bar>
    <scroller>
      <!-- <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
          <text class="load_refresh">松开马上为您刷新</text>
        <loading-indicator class="indicator"></loading-indicator>
      </refresh> -->
      <div v-for="(layout,key) in layoutlist" :key="key">
        <ad :jsonurl="layout.url" v-if="layout.type == 'AD'"></ad>
        <menu :jsonurl="layout.url" v-if="layout.type == 'MENU'"></menu>
        <recommend :jsonurl="layout.url" v-if="layout.type == 'PRODUCT'"></recommend>
        <may-need :jsonurl="layout.url" v-if="layout.type == 'NEED'"></may-need>
        <!-- <website :jsonurl="layout.url" v-if="layout.type == 'WEBSITE'"></website> -->
        <!-- <integral :jsonurl="layout.url" v-if="layout.type == 'INTEGRAL'"></integral> -->
      </div>
      <bottom></bottom>
    </scroller>
  </div>
</template>
<style scoped>
.container {
  width: 750;
  background-color: rgb(239, 239, 244);
}
.refresh {
  width: 750px;
  align-items: center;
  /* background-color: #323232; */
  background-color: #ffffff;
}
.indicator {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 40px;
  width: 40px;
  color: #0000ff;
}
.load_refresh{
  color: #888888;
  font-size: 28px;
  text-align: center;
}
</style>
<script>
import TitleBar from "@/components/common/titlebar.vue";
import Ad from "@/components/common/ad.vue";
import Menu from "@/components/common/menu.vue";
// import Website from "@/components/tab_loan/website.vue";
import Integral from "@/components/tab_loan/integral.vue";
import Bottom from "@/components/tab_loan/bottom.vue";
import Recommend from "@/components/tab_loan/recommend.vue";
import MayNeed from "@/components/tab_loan/mayneed.vue";
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");

export default {
  components: {
    TitleBar,
    Ad,
    Menu,
    Recommend,
    MayNeed,
    // Website,
    Integral,
    Bottom
  },
  data() {
    return {
      refreshing: false,
      layoutlist: [],
      laytou_url: "./json/tab_loan/layout.json"
    };
  },
  created() {
    //查询楼层
    this.qry();
  },
  methods: {
    qry(callback){
        stream.fetch(
          {
            method: "GET",
            url: this.laytou_url,
            type: "json"
          },
          response => {
            if (response.status === 200) {
              this.layoutlist = response.data.data;
              if(callback){
                callback()
              } 
            }
          },
          () => {}
        );
      },
    onrefresh(event) {
          this.refreshing = true;
          context.refreshRepo("");
        this.qry(()=>{
          this.refreshing = false;
        })
      },
  }
};
</script>