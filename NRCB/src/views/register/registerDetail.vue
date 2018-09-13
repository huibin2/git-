<template>
   <scroller class="home" >
    <div class="wrapper">
     <title class="titlebar" titleJson="register/titlebardetail.json"></title>
	   
		   <div class="banker" style="margin-top:20px;flex-direction:column;">
	
         <div class="bottomstate">
           <text class="titletop">
              南海农商银行电子账户客户服务协议
           </text>
			   </div>

			   <div class="bottomstate">
           <text class="wxtss">
              甲方：（个人客户）
           </text>
           <text class="wxtss">
              乙方：（南海农商银行）
           </text>
			   </div>
			  
         <div class="bottomstate">
           <text class="wxtss">
              电子账户申请人（以下简称甲方）基于知悉并理解本协议各项条款，自愿申请办理子账户，经与南海农商银行（以下简称乙方）协商一致，就甲方向乙方申请使用电子账户有关事宜达成如下协议：
           </text>
			   </div>

          <div class="bottomstate">
           <text class="wxtss">
             一、本协议所称电子账户是指乙方为甲方提供，由甲方以实名自助申请方式开立的无卡片实物介质的结算账户，具有账户管理、购买理财产品、小额网上支付、小额充值缴费等金融服务功能的新型电子结算工具。
           </text>
			   </div>

         <div class="bottomstate">
           <text class="wxtss">
             二、本协议所称电子账户是指乙方为甲方提供，由甲方以实名自助申请方式开立的无卡片实物介质的结算账户，具有账户管理、购买理财产品、小额网上支付、小额充值缴费等金融服务功能的新型电子结算工具。
           </text>
			   </div>

         <div class="bottomstate">
           <text class="wxtss">
             三、本协议所称电子账户是指乙方为甲方提供，由甲方以实名自助申请方式开立的无卡片实物介质的结算账户， 具有账户管理、购买理财产品、小额网上支付、小额充值缴费等金融服务功能的新型电子结算工具。
           </text>
			   </div>

         <div class="bottomstate">
           <text class="wxtss">
             四、本协议所称电子账户是指乙方为甲方提供，由甲方以实名自助申请方式开立的无卡片实物介质的结算账户，具有账户管理、购买理财产品、小额网上支付、小额充值缴费等金融服务功能的新型电子结算工具。
           </text>
			   </div>

          <div class="bottomstate">
           <text class="wxtss">
             五、本协议所称电子账户是指乙方为甲方提供，由甲方以实名自助申请方式开立的无卡片实物介质的结算账户，具有账户管理、购买理财产品、小额网上支付、小额充值缴费等金融服务功能的新型电子结算工具。
           </text>
			   </div>

          <div class="bottomstate">
           <text class="wxtss">
             六、本协议所称电子账户是指乙方为甲方提供，由甲方以实名自助申请方式开立的无卡片实物介质的结算账户，具有账户管理、购买理财产品、小额网上支付、小额充值缴费等金融服务功能的新型电子结算工具。
           </text>
			   </div>
         
	   </div>
    </div>
  </scroller> 
</template>
<style scoped>
.home {
  margin-top: 118px;
  width: 750px;
  background-color: #efeff4;
}
.titlebar {
  background-color: #efeff4;
  width: 750px;
}
.titletop{
    /* background-color: yellow; */
    font-size: 30px;
    color: rgb(102,102,102);
    text-align: center;
    position:relative;
    left:-60px;
}
.title{
  font-size: 32px;
  text-align: center;
  /* height: 60px;
  line-height: 60px; */
}

/* .bottomstate{
  margin-left: 36px;
}  */

.wxtss{
  font-size: 24px;
  color: rgb(102,102,102);
  margin-right: 36px;
}

/* .ll{
  font-size: 24px;
  color: rgb(102,102,102);
  lines:3;
  margin-right: 36px;
} */

</style>
<script>
import Title from "@/components/common/titlebar_func.vue";
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
export default {
  components: { Title },
  data() {
    return {
    };
  },
  created() {
   
  },
  methods: {
       }
};
</script>