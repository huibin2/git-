<template>
  <div class="tab">
    <image class="image_bg" :src="bgImg" />
    <div class="big_div">
      <div class="menuItem" :style="{width:itemWidth}" v-for="(item,key) in menuList" :key="key" @click="JumpTo(item.url)">
        <image class="image" :src="item.src" :style="{'width':imgWidth+'px','height':imgHeight+'px'}"/>
        <text class="title" :style="{'color':fontColor ,'font-size':fontSize+'px'}">{{item.name}}</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .tab {
    width: 750px;
    background-color: #ffffff;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    border-bottom-color: #eeeeee;
    border-bottom-width: 1px;
    height:214px;
  }
  .image_bg{
    width: 750px;
    height: 214px;
    position: absolute;
    top: 0;
  }
  .big_div{
    margin-top: -34px; 
    flex-direction: row;
  }
  .menuItem {
    align-items: center;
    width: 180px; 
    /* padding-top: 30px;
    padding-bottom: 30px; */
   
  }

  .image {
    /* width: 50px;
    height: 50px;
    margin-bottom: 20px; */
  }

  .title {
    font-size: 24px;
    color: #404561;
    margin-top: 20px;
  }
</style>

<script>
/**
 * @module 主菜单组件
 * @description 主菜单weex组件
 * @example  <menu jsonurl="menu.json"></menu>
 */

  const context = weex.requireModule("context");
  const stream = weex.requireModule("stream");
  const modal = weex.requireModule("modal");

  export default {
    /**
   * Props 接受父组件的传值
   * @prop {Json} jsonurl 主菜单组件的json文件路径
   */
    props: ["jsonurl"],
    data() {
      return {
        tabWidth: 750,
        menu_columns: 4,
        bgImg:"",
        menuList: [],
        imgHeight: 60,
        imgWidth: 60,
        fontColor: "#333333",
        fontSize: 24,
      };
    },
    computed: {
      itemWidth: function () {
        return this.tabWidth / this.menu_columns;
      }
    },
    methods: {
      JumpTo(url) {
        context.launchStage(url);
      },
      getMenu() {
        stream.fetch({
            method: "GET",
            url: this.$store.state.jsonBaseUrl + this.jsonurl,
            type: "json"
          },
          response => {
            if (response.status === 200) {
              var tmp = response.data.data;

              this.menu_columns = tmp.columns;
              this.menuList = tmp.menuList;
              this.bgImg=tmp.bgImg;
              this.imgWidth = tmp.imgSize.imgWidth;
              this.imgHeight = tmp.imgSize.imgHeight;

              this.rows = tmp.columns;
              this.fontColor = tmp.fontColor;
              this.fontSize = tmp.fontSize;
            }
          },
          () => {}
        );
      }
    },
    created() {
      this.getMenu();
    }
  };
</script>