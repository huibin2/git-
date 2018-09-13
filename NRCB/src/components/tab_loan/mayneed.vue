<template>
  <div class="down">
    <div class="title">
      <text class="needs">猜您需要</text>
    </div>
    
    <div class="tab">
      <div class="menuItem" v-for="(item,key) in needList" :key="key">
        <image class="image" :src="item.src" @click="jumpTo(item.url)" />
        <!-- <text class="title">{{item.name}}</text> -->
         <div class="menulife">
            <div class="menu" v-for="(menu,key) in item.menuList" :key="key" @click="JumpTo(menu.url)">
                  <image class="img" :src="menu.menusrc" />
                  <text class="name">{{menu.menuname}}</text>
            </div>
          </div>
          </div>
        
      </div>
    </div>
 
</template>
<style scoped>
.down {
  width: 750px;
  margin-top: 20px;
  background-color: #ffffff;
}
.needs{
   font-size: 34px;
  font-weight: 600;
  color: rgb(51,51,51);
  margin-top: 15px;
}
.image {
  width: 326px;
  height: 151px;
}
.img{
  height: 42px;
  width: 72px;
  margin-top: 12px;
  margin-left: 40px;
  margin-right: 40px;
}
.title {
  font-size: 24px;
  color: #242424;
  margin-top: 20px;
  padding-left: 36px;
  padding-right: 20px;
  background-color: #ffffff;
  height: 80px;
  justify-content: space-between;
  border-bottom-color: #eeeeee;
  border-bottom-width: 1px;
}
.name{
  font-size: 26px;
  color: (51,51,51);
  height: 42px;
  font-family: '华方粗体';
  margin-left: 25px;
  margin-right: 25px;
}
.tab{
    flex-direction: row;
    width: 704px;
    height: 315px;
    margin-left: 23px;
    margin-right: 23px;
   
}
.menuItem{
    flex-direction: column;
    margin-left: 13px;
    margin-right: 13px;
    border-width: 1px;
    border-color: rgb(229,229,229);
    height:259px;
    border-radius: 10px;
    margin-top: 28px;
    width: 328px;
    
}
.menulife{
  flex-direction: row;
  width:304px;
  margin-left: 15px;
  margin-right: 15px;
}
.menu{
    flex-direction: column;
    
   
}
</style>
<script>
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
export default {
  props: ["jsonurl"],
  data() {
    return {
      needList: []
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
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
            this.needList = tmp.needList;
          }
        }
      );
    },
    jumpTo(url) {
      if (url) {
        context.launchStage(url);
      }
    }
  }
};
</script>
