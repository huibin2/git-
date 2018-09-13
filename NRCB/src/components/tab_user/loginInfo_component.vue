<template>
	<div class="background">
		<div v-for="(item,key) in financeData" :key="key" >
            <text class="text">这是您第{{lastLoginTime}}次登录，{{item.clone}}{{lastLoginTime}}</text>

        </div>
		
	</div>
</template>
<style scoped>
.background {
  background-color: white;
  height: 88px;
}
.line {
  background-color: #f8f8f8;
  height: 15px;
  width: 750px;
}
.text {
  line-height: 88px;
  margin-left: 36px;
  color: rgb(152,153,153);
  font-size: 30 px;
  
}
</style>
<script>
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");
export default {
  props: {
		finance: {
			type: String,
			default: "tab_user/finance.json"
		}
	},
  created() {
    this.getData();
    this.lastLoginTime = context.secureGetString('LastLoginTime');
		this.alertMsg("上次登录时间"+this.lastLoginTime)

	},
  data() {
    return {
        financeData: [],
        lastLoginTime:""
    };
  },
  methods: {
    goLogin() {
      context.launchStage("main.login");
    },
    getData() {
				if(this.finance) {
					stream.fetch({
							method: "GET",
							url: "./json/" + this.finance,
							type: "json"
						},
						res => {
							this.financeData = res.data.data;
						}
					);
				}
			}
  }
};
</script>