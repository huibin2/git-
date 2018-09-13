<template>
<div >
  <title-bar></title-bar>
	<scroller class="home">
	  
		<!-- <t-finance v-if="this.$store.state.login == false"></t-finance> -->
		<topNeedLogin v-if="this.$store.state.login == false"></topNeedLogin>
    <top-logged v-if="this.$store.state.login"></top-logged>
		<!-- <homepage v-if="this.$store.state.login == false "></homepage>	 -->
    <login-info v-if="this.$store.state.login"></login-info>
    <div>
		<madp-cell></madp-cell>
    <confirm v-if="show" :data="data" @confirm="confirm" @cancel="cancel"></confirm>
    </div>
    <div class="btn" @click="safeExit" v-if="this.$store.state.login">
       <text class="btntext" style="font-size:36px">安全退出</text>
    </div>
   
      
		<!-- <hottalk></hottalk> -->
	</scroller>
</div>
</template>
<style scoped>
.home {
  width: 750px;
  background-color: #f8f8f8;
}

.btn {
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 36px;
  width: 678;
  height: 88;
  margin-right: 36px;
  justify-content: center;
  border-radius: 10px;
  border-color:#f00000;
  border-width: 2px;
  /* background-color: red; */
}
.btntext {
  color:#f00000;
  font-size: 36px;
  text-align: center;
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
<script>
import TitleBar from "@/components/tab_user/titlebar.vue";
import TFinance from "@/components/tab_user/finance_component.vue";
import topNeedLogin from "@/components/tab_user/topNeedLogin.vue";
import topLogged from "../../components/tab_user/topLogged_component.vue";
import loginInfo from "../../components/tab_user/loginInfo_component.vue";
import Menu from "@/components/tab_user/menu_component.vue";
import Homepage from "@/components/tab_user/homepage_component.vue";
import HomePageNeedLogin from "@/components/tab_user/homePage_NeedLogin.vue";
import Hottalk from "@/components/tab_user/hottalk_component.vue";
import MadpCell from "@/components/tab_user/madp_cell_component.vue";
import confirm from "@/components/common/confirm.vue";

const modal = weex.requireModule("modal");
const context = weex.requireModule("context");
export default {
  components: {
    TitleBar,
    TFinance,
    Menu,
    Homepage,
    Hottalk,
    MadpCell,
    topNeedLogin,
    topLogged,
    loginInfo,
    HomePageNeedLogin,
    confirm
  },
  data() {
    return {
      dir: "examples",
      login: this.$store.state.login,
      data:{       
              "text":"是否安全退出？",
              "ok":"确定",
              "cancel":"取消"               
      },
      show:false,
      token:[],
      
    };
  },
  created() {
    this.isLogin();
     
  },

  // mounted() {
  // 			modal.alert({
  // 				message: context.sessionGetString("isLogin")
  // 			})
  // 			this.login = context.sessionGetString("isLogin");
  // },
  methods: {
    //			clickText() {
    //				modal.alert({
    //					message: context.sessionGetString("isLogin")
    //				})
    //			}
    confirm(){
      this.show=false;
      context.sessionSetString("isLogin","false");
      context.clearToken();  
      this.$store.state.login=false;
      
    },
    cancel(){
     this.show=false;
    //  this.$store.state.login=true;
    },

    safeExit(){   
      this.postDo("Logout.do",{},res=>{
         this.show=true; 
      },res=>{
        this.alertMsg(res._RejMsg);
      })
                     	     
    },
    isLogin(){    
      
      this.token = context.checkToken();
      
      if (this.token==1) {
        // this.$store.state.login = true;
        context.sessionSetString("isLogin","true");
      } else {
        // this.$store.state.login = false;
        context.sessionSetString("isLogin","false");
        
      }
    }
  }
};
</script>