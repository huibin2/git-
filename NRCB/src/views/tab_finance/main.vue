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
        <div class="menu" v-if="layout.type == 'MENU'">
          <menu :jsonurl="layout.url"></menu>
        </div>
        <current :jsonurl="layout.url" v-if="layout.type == 'CURRENT'"></current>
        <regular :jsonurl="layout.url" v-if="layout.type == 'REGULAR'"></regular>
        <optimization :jsonurl="layout.url" v-if="layout.type == 'OPTIMIZATION'"></optimization>
        <hot :jsonurl="layout.url" v-if="layout.type == 'HOT'"></hot>
        <gold :jsonurl="layout.url" v-if="layout.type == 'GOLD'"></gold>
      </div>
    </scroller>
  </div>
</template>
<style scoped>
  .container {
    width: 750;
    background-color: rgb(240, 240, 240);
  }
  .menu{
    margin-bottom:20px;
  }
  /* .refresh {
  width: 750px;
  align-items: center;
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
}*/
</style>
<script>
  import TitleBar from "@/components/common/titlebar.vue";
  import Menu from "@/components/common/menu.vue";
  import Ad from "@/components/common/ad.vue";
  import Current from "@/components/common/current.vue"
  import Optimization from "@/components/tab_finance/Optimization.vue"
  import Regular from "@/components/tab_finance/regular.vue"
  import Hot from "@/components/common/hot.vue";
  import Gold from "@/components/tab_finance/gold.vue";

  const stream = weex.requireModule("stream");
  const context = weex.requireModule("context");

  export default {
    components: {
      TitleBar,
      Menu,
      Ad,
      Current, 
      Regular,
      Hot,
      Optimization,
      Gold
    },
    data() {
      return {
        refreshing: false,
        layoutlist: [],
        laytou_url: "./json/tab_finance/layout.json"
      };
    },
    created() {
      //查询楼层
      this.qry();
    
    },
    methods: {
      qry(callback){
        stream.fetch({
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