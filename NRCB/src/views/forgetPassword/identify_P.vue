<template>
    <scroller class="home" >
      <title class="titlebar" titleJson="login/forgetpwd_title.json"></title>
	  <div class="wrapper">
	    <div class="banker" style="margin-top: 20px;">
		  <div class="banker-bottom">
            <text class="title">姓名</text>
            <input class="tit" v-model="cif_name" placeholder="请输入您的姓名" type="text"/>
          </div>
          <div class="line"></div>
          <down-list :jsonurl="jsonurl" @sendValue="sendValue"></down-list>

          <div class="line"></div>
          <div class="banker-bottom">
            <text class="title">证件号码</text>
            <input class="tit" v-model="id_number" placeholder="请输入您的证件号码" type="number"/>
          </div>
		</div>
		<div  class="button4"  @click="verify"><text class="text">下一步</text></div>
	  </div>

    </scroller> 
</template>
<style scoped>
.banker {
  background-color: white;
}
.line {
  height: 3px;
  background-color: #efeff4;
  margin-left: 36px;
}
.right {
  height: 88px;
  width: 500px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.code {
  color: rgb(209, 154, 95);
  font-size: 28px;
}
.titlebar {
  background-color: #efeff4;
  width: 750px;
}
.home {
  margin-top: 118px;
  width: 750px;
  background-color: #efeff4;
}
.banker-bottom {
  height: 88px;
  width: 750px;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 88px;
  background-color: #ffffff;
}
.title {
  font-size: 30px;
  line-height: 88px;
  margin-left: 36px;
  color: rgb(102, 102, 102);
}
.title1 {
  font-size: 30px;
  line-height: 88px;
  margin-right: 36px;
  color: rgb(102, 102, 102);
}
.tit {
  font-size: 30px;
  width: 500px;
  color: rgb(102, 102, 102);
  height: 88px;
  line-height: 88px;
  text-align: right;
  margin-right: 36px;
  placeholder-color: rgb(152, 153, 153);
}
.tit1 {
  font-size: 30px;
  width: 300px;
  color: rgb(153, 153, 153);
  height: 88px;
  line-height: 88px;
  text-align: right;
  margin-right: 10px;
}
.box {
  font-size: 28px;
  width: 500px;
  color: #404561;
  padding-left: 64px;
  height: 100px;
  line-height: 100px;
}
.tips {
  font-size: 28px;
  width: 290px;
  color: #404561;
  height: 100px;
  line-height: 100px;
  margin-left: 30px;
}
.boxl {
  font-size: 28px;
  width: 500px;
  color: #404561;
  height: 100px;
  line-height: 100px;
}
.banker-bot {
  height: 100px;
  flex-direction: row;
  background-color: #ffffff;
  margin-top: 15px;
  margin-bottom: 3px;
}
.imgL {
  display: block;
  width: 190px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
  color: rgb(209, 154, 95);
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(209, 154, 95);
  margin-right: 36px;
  justify-content: center;
  align-items: center;
}
.disimg {
  display: block;
  width: 190px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
  color: #c0c0c0;
  border-radius: 70px;
  border-style: solid;
  border-width: 1px;
  border-color: #c0c0c0;
  margin-right: 36px;
}
.button3 {
  width: 669.9975px;
  height: 84.9975px;
  margin-left: 37.5px;
  margin-bottom: 76.5px;
  margin-top: 42.5px;
  border-radius: 53.4975px;
  background-color: #c0c0c0;
}
.button4 {
  width: 678px;
  height: 88px;
  margin-left: 36px;
  margin-right: 36px;
  margin-bottom: 76.5px;
  margin-top: 50px;
  border-radius: 10px;
  background-color: rgb(230, 60, 80);
  justify-content: center;
  align-items: center;
}

.checkebox {
  flex-direction: row;
}
.memory_text {
  font-size: 24px;
  color: #545454;
  margin-top: 26px;
  margin-left: 20px;
}
.xieyi {
  margin-left: 20px;
  margin-top: 26px;
}
.mtext {
  font-size: 24px;
  color: #00b9f4;
}

.text {
  font-size: 36px;
  color: #ffffff;
  font-weight: Bold;
}
.unckecked {
  width: 26px;
  height: 26px;
  margin-top: 30px;
  margin-left: 29px;
}
</style>
<script>
import Title from "@/components/common/titlebar_func.vue";
import DownList from "@/components/common/down_list.vue";
const context = weex.requireModule("context");
const stream = weex.requireModule("stream");
const modal = weex.requireModule("modal");
const picker = weex.requireModule("picker");

export default {
  components: { Title,DownList },
  data() {
    return {
      jsonurl:"json/common/id_type.json",
      cif_name: "", //用户名
      id_type: "", //选中的身份证类型编号
      id_number: "", //身份证号码
      phoneNumber:"",//手机号
      form: {} //传自上一页面的数据
    };
  },
  created() {
  },
  mounted() {
    this.form = this.$route.params.form;
    this.phoneNumber = this.form.phoneNumber;
  },
  methods: {
    toSend(to) {
      //向下一页面传值
      let param = {
        name: to,
        params: {
          form: this.form
        }
      };

      this.$router.push(param);
    },
    verify() {
      if (this.cif_name == "") {
        this.alertMsg("请输入姓名");
      }
      if (this.id_number == "") {
        this.alertMsg("请输入证件号码");
      }
      var params = {
        MobilePhone: this.phoneNumber,
        CifName: this.cif_name,
        IdType: this.id_type,
        IdNo: this.id_number
      };
      this.postDo(
        "UserInfoCheck.do",
        params,
        success => {
          this.toSend("FindPassword");
        },
        failture => {
          this.alertMsg(failture._RejMessage);
        }
      );
    }
  }
};
</script>