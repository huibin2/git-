<template>
  <div class="tab" >
    <div class="menuItem" v-for="(item,key) in menuList" :key="key" @click="jumpTo(item.url)">

      
      <image class="image"  :src="item.src" /> 
      
      <text class="title" >{{item.name}}</text>
      
      <div  v-if="key == 0" class="line"></div>
      
    </div>
  </div>
</template>

<style scoped>

.line{
  width:2px;
  margin-left: 78px;
  border-right-width:2px;
  height: 48px;
  border-right-color: white;
  background-color: white;

}
.tab {
  width: 750px;
  flex-direction: row;
  /* justify-content: flex-start; */
  align-items: center;

  
}

.menuItem {
  width: 375px;
  margin-top: 68px;
  padding-left: 88px;
  padding-right: 88px;
  margin-bottom: 42px;
  align-items: center;
  flex-direction: row;
  /* width: 250px;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center; */
}

.image {
  width: 52px;
  height: 48px;
  
  /* margin-left: 100px; */
}

.title {
 
  font-size: 32px;
  color: white;
  margin-left: 24px;
  
 
}

</style>

<script>
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
const modal = weex.requireModule("modal");

export default {
  data() {
    return {
      tabWidth: 750,
      tabColor: "#ffffff",
      tabMarginLeft: 0,
      rows: 4,
      imgHeight: 60,
      imgWidth: 60,
      fontColor: "white",
      fontSize: 26,
      menuList: [],
      menu: "tab_user/menu.json"
    };
  },
  computed: {
    itemWidth: function() {
      return this.tabWidth / this.rows;
    }
  },
  methods: {
    jumpTo(id) {
      //拿到id，进行跳转
      if (id) {
        context.launchStage(id);
      }
    },
    getMenu() {
      stream.fetch(
        {
          method: "GET",
          url: "./json/" + this.menu,
          type: "json"
        },
        response => {
          if (response.status === 200) {
            var tmp = response.data.data;
            // this.tabColor = tmp.backgroundColor;

            this.imgWidth = tmp.imgSize.imgWidth;
            this.imgHeight = tmp.imgSize.imgHeight;

            this.rows = tmp.columns;
            this.fontColor = tmp.fontColor;
            this.fontSize = tmp.fontSize;
            this.menuList = tmp.menuList;
          }
        },
      );
    }
  },
  created() {
    this.getMenu();
  }
};
</script>
