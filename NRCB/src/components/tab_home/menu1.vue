<template>
  <div class="tab">
   
    <div class="menu-box">
      <div class="menuItem" :style="{width:itemWidth}" v-for="(item,key) in menuList" :key="key" @click="JumpTo(item.url)">
        <image class="image" :src="item.src" :style="{'width':imgWidth+'px','height':imgHeight+'px'}" />
        <text class="title" :style="{'color':fontColor ,'font-size':fontSize+'px'}">{{item.name}}</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab {
  width: 750px;
  height: 320px; 
  background-color: #ffffff;
  border-bottom-color:rgb(211, 211, 224);
  border-bottom-width: 1px; 
  position: relative;
}

.menu-box {
  width: 750px;
  /* margin-left: 15px; */
  height:320px;
  position: absolute;
  top:0px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.menuItem {
  align-items: center;
  width: 180px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.image {
  /* width: 50px;
  height: 50px; */
  margin-bottom: 15px;
}

.title {
  font-size: 15px;
  color: #404561;
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
      bgImg: "",
      menuList: [],
      imgHeight: 50,
      imgWidth: 50,
      fontColor: "#333333",
      fontSize: 24
    };
  },
  computed: {
    itemWidth: function() {
      return this.tabWidth / this.menu_columns;
    }
  },
  methods: {
    JumpTo(url) {
      context.launchStage(url);
    },
    getMenu() {
      stream.fetch(
        {
          method: "GET",
          url: this.$store.state.jsonBaseUrl + this.jsonurl,
          type: "json"
        },
        response => {
          if (response.status === 200) {
            var tmp = response.data.data;

            this.menu_columns = tmp.columns;
            this.menuList = tmp.menuList;
            this.bgImg = tmp.bgImg;
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