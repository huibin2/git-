<template>
  <div class="container1">
    <title-bar></title-bar>
    <scroller>
      <!-- <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
        <text class="load_refresh">松开马上为您刷新</text>
        <loading-indicator class="indicator"></loading-indicator>
      </refresh> -->
      <div class="container-content" v-if="!$store.state.isSearch">

        <div v-for="(layout,key) in layoutlist" :key="key">
          <!-- <menu1 :jsonurl="layout.url" v-if="layout.type == 'MENU1'"></menu1> -->
          <menu :jsonurl="layout.url" v-if="layout.type == 'MENU'"></menu>
          <menu1 :jsonurl="layout.url" v-if="layout.type == 'MENU1'"></menu1>
          <div class="ads" v-if="layout.type == 'AD'">
          <ad :jsonurl="layout.url" v-if="layout.type == 'AD'"></ad>
          </div>
          <notice :jsonurl="layout.url" v-if="layout.type == 'NOTICE'"></notice>
          <integral-mall :jsonurl="layout.url" v-if="layout.type == 'INTEGRALMALL'"></integral-mall>
          <gold :jsonurl="layout.url" v-if="layout.type == 'GOLD'"></gold>
          <hot-finance :jsonurl="layout.url" v-if="layout.type == 'HOTFINANCE'"></hot-finance>
          <!-- <hot-recommend :jsonurl="layout.url" v-if="layout.type == 'HOTRECOMMEND'"></hot-recommend> -->
        </div>
        <!-- <bottom></bottom> -->
      </div>
    </scroller>
  </div>
</template>
<style scoped>
.container1 {
  width: 750px;
  background-color: rgb(240,240,240);
}
.ads{
  margin-top: 20px;
  margin-bottom: 20px;
}
/* .container-content {
  position: absolute; 
}
/* .refresh {
  width: 750px;
  align-items: center;
  /* background-color: #323232; 
  background-color: #ffffff;
}
.indicator {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 40px;
  width: 40px;
  color: #0000ff;
}
.load_refresh {
  color: #888888;
  font-size: 28px;
  text-align: center;
} */
</style>
<script>
import TitleBar from "@/components/common/titlebar.vue";
// import SearchBar from "@/components/tab_home/searchBar.vue";
import Ad from "@/components/common/ad.vue";
import Menu from "@/components/tab_home/menu.vue";
import Menu1 from "@/components/tab_home/menu1.vue";
import Notice from "@/components/tab_home/notice.vue";
import IntegralMall from "@/components/tab_home/integralmall.vue";
import Gold from "@/components/tab_home/gold.vue";
import HotFinance from "@/components/common/current.vue";
//import HotRecommend from "@/components/tab_home/hotrecommend.vue";
//import Bottom from "@/components/tab_home/bottom.vue";

const stream = weex.requireModule("stream");
const modal = weex.requireModule("modal");
const context = weex.requireModule("context");
export default {
  components: {
    TitleBar,
    // SearchBar,
    Ad,
    Menu,
    Menu1,
    Notice,
    IntegralMall,
    Gold,
    HotFinance
    //HotRecommend,
    //Bottom
  },
  data() {
    return {
      refreshing: false,
      layoutlist: [],
      theme: "./json/themeVersion.json",
      laytou_url: "./json/tab_home/layout.json"
    };
  },
  created() {
    //查询楼层
    this.queryTheme(() => {
      this.qry();
    });
  },
  methods: {
    queryTheme(callback) {
      stream.fetch(
        {
          method: "GET",
          url: this.theme,
          type: "json"
        },
        response => {
          if (response.status === 200) {
            this.laytou_url = "./json/tab_home/" + response.data.data.theme1;
            if (callback) {
              callback();
            }
          }
        }
      );
    },
    qry(callback) {
      stream.fetch(
        {
          method: "GET",
          url: this.laytou_url + "?v=" + Math.random(),
          type: "json"
        },
        response => {
          if (response.status === 200) {
            this.layoutlist = response.data.data;
            if (callback) {
              callback();
            }
          }
        },
        () => {}
      );
    },
    onrefresh(event) {
      this.refreshing = true;
      context.refreshRepo("");
      this.queryTheme(() => {
        this.qry(() => {
          this.refreshing = false;
        });
      });
    }
  }
};
</script>