<template>
    <div>
        <div class="tab">
            <div class="menuItem" :style="{width:itemWidth}" v-for="(item,key) in menuList" :key="key" @click="JumpTo(item.url)">
                <image class="image" :src="item.src" />
                <text class="title">{{item.name}}</text>
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
}

.menuItem {
  align-items: center;
  width: 180px;
  padding-top: 30px;
  padding-bottom: 30px;
}

.image {
  width: 66px;
  height: 60px;
  margin-bottom: 15px;
}

.title {
  font-size: 28px;
  color: rgb(51,51,51);
}
</style>

<script>
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
const modal = weex.requireModule("modal");

export default {
  props: ["jsonurl"],
  data() {
    return {
      tabWidth: 750,
      menu_columns: 4,
      menuList: []
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
