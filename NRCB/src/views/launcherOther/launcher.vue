<template>
  <div>
    <osc-tabbar :unselectedColor="unselectedColor" :selectedColor="selectedColor" :tabItems="tabItems" @tabBarOnClick="tabBarOnClick" />
  </div>
</template>

<script>
import oscTabbar from "@/components/launcher/tabbar.vue";
// const modal = weex.requireModule("modal");
const stream = weex.requireModule("stream");

export default {
  data() {
    return {
      dir: "examples",
      tabItems: [],
      unselectedColor: "",
      selectedColor: ""
    };
  },
  components: { oscTabbar },
  created: function() {
    var baseURL = weex.config.bundleUrl.replace("/weex/index.weex.js?Page=LauncherOther", "");

    //获取tab
    stream.fetch(
      {
        method: "GET",
        url:  "./json/tabOther.json",
        type: "json"
      },
      res => {
        var res_data = res.data.data;
        this.tabItems = res_data.tabs;
        this.unselectedColor = res_data.unselectedColor;
        this.selectedColor = res_data.selectedColor;
        for (var i = 0; i < this.tabItems.length; i++) {
          var tabItem = this.tabItems[i];
          tabItem.src = baseURL + tabItem.src;
          // tabItem.src = this.getBuddleUrl() + tabItem.src;
          // modal.alert({
          //   message: tabItem.src,
          //   duration: 1
          // });
          tabItem.image =  tabItem.image;
          tabItem.selectedImage = tabItem.selectedImage;
        }
      }
    );
  },
  methods: {
    tabBarOnClick: function(e) {
      console.log("tabBarOnClick", e.index);
    }
  }
};
</script>