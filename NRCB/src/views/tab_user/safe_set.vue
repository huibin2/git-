<template>
<div class="container">
  <title-bar titleJson="tab_user/titlebar.json"></title-bar>
	<scroller>
  	<safe-cell></safe-cell>
  </scroller>
</div>
</template>
<style scoped>
.container {
  width: 750;
  background-color: #fff;
}
</style>
<script>
import TitleBar from "@/components/common/titlebar_func.vue";
// import TitleBar from "@/components/tab_user/safe_setting/titlebar.vue";
import TFinance from "@/components/tab_user/finance_component.vue";
import topNeedLogin from "@/components/tab_user/topNeedLogin.vue";
import Menu from "@/components/tab_user/menu_component.vue";
import Homepage from "@/components/tab_user/homepage_component.vue";
import HomePageNeedLogin from "@/components/tab_user/homePage_NeedLogin.vue";
import Hottalk from "@/components/tab_user/hottalk_component.vue";
import MadpCell from "@/components/tab_user/madp_cell_component.vue";
import SafeCell from "@/components/tab_user/safeSet_cell_component.vue"
const modal = weex.requireModule("modal");
const context = weex.requireModule("context");
export default {
  components: {
    SafeCell,
    TitleBar,
    
    TFinance,
    Menu,
    Homepage,
    Hottalk,
    MadpCell,
    topNeedLogin,
    HomePageNeedLogin
  },
  data() {
    return {
      dir: "examples",
      login: this.$store.state.login
    };
  },
  created: function() {},
  //		mounted() {
  //			modal.alert({
  //				message: context.sessionGetString("isLogin")
  //			})
  //			this.login = context.sessionGetString("isLogin");
  //		},
  methods: {
    //			clickText() {
    //				modal.alert({
    //					message: context.sessionGetString("isLogin")
    //				})
    //			}
  }
};
</script>