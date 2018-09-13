<template>
    
    <div>
        <title-bar titleJson="tab_user/safe_set/POS_titlebar.json"></title-bar>
         <scroller class="container">
        <div class="home">
        <div class="bank_top">
            <div class="bank">
            <text class="cardid">银行卡号:</text>
            <text class="choose" @click="pick">{{card_id | cardFormat}}</text>
            </div>
            <div class="bank">
            <text class="cardid">限额信息:</text>
            <input type="number" placeholder="请输入限额信息" class="input" @input="getMessage" >
            </div>
            <div class="bank">
                <text class="cardid">当前可用限额:</text>
                <text class="number" v-bind="remain">{{remain | NumFormat }}元</text>
            </div>
        </div>
        </div>
        <div class="home">
        <div class="bank_center">
           
                <text class="cardid">请选择安全认证方式</text>
                <div class="radio_text">
                    <div class="left" @click="show1">
                        <div class="test">
                        <image :src="imgsrc" class="image"></image>
                        <text class="message">短信验证码</text>
                        </div>
                    </div>
                    <div class="left" @click="show2">
                         <div class="test">
                       <image :src="imgurl"  class="image"></image>
                        <text class="message">动态令牌</text>
                         </div>
                    </div>

                </div>
                <div class="num_code" v-if="verify=='msg'" >
                    <text class="msg">短信验证码:</text>
                    <input type="number" class="input1" v-model="msgcode" placeholder="请输入验证码" maxlength="6" />
                      <div class="getcode" @click="changeYZM()">
                      <text class="code" v-if="yzmFlag==true">{{msg}}</text>
                       <text class="disimg" v-else>{{msg}}({{soudes}}s)</text>
                       </div>
                </div>
                <div class="bank" v-else>
                     <text class="msg">验证码:</text>
                     <input type="number" class="input2" placeholder="请输入验证码" v-model="code">
                </div>
                <div class="bank">
                     <text class="cardid">交易密码:</text>
                     <!-- <password-input placeholder="请输入交易密码" kbdType="Number" kbdVibrator="false"
                     maxLength=6 minLength=6 autofocus="false" kbdName="secret" kbdMode="PopupBtn" 
                     encryptType=22 publicKey kbdRandom="true" class="input">
                     </password-input> -->
                     <input type="password" class="input2" maxlength="6" placeholder="请输入交易密码" @input="getPwd">
                </div>
                
                </div>
            </div>
            <div class="bank_bottom" @click="success">
                <text class="confirm">确 定</text>
            </div>
         </scroller>
    </div>

</template>
<style scoped>
.container {
  width: 750px;
  background-color: rgb(240, 240, 240);
}
.home {
  background-color: rgb(255, 255, 255);
  margin-top: 20px;
}
.bank_top {
  flex-direction: column;
  margin-left: 36px;
}
.bank {
  font-size: 30px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: rgb(229, 229, 229);
  height: 88px;
}
.cardid {
  color: rgb(102, 102, 102);
  font-size: 30px;
  line-height: 88px;
  width: 300px;
}
.choose {
  width: 378px;
  color: rgb(102, 102, 102);
  font-size: 30px;
  line-height: 88px;
  text-align: right;
}
.input {
  width: 378px;
  line-height: 88px;
  placeholder-color: rgb(153, 153, 153);
  color: rgb(102, 102, 102);
  text-align: right;
}
.number {
  color: rgb(102, 102, 102);
  font-size: 35px;
  line-height: 88px;
  width: 378px;
  text-align: right;
}
.bank_center {
  padding-top: 28px;
  margin-left: 36px;
}

.radio_text {
  flex-direction: row;
  width: 560px;
  height: 88px;
  margin-left: 89px;
}
.left {
  flex-direction: row;
  width: 280px;
  line-height: 88px;
}
.test {
  flex-direction: row;
  margin-left: 30px;
}
.message {
  align-self: center;
  font-size: 28px;
  margin-left: 10px;
  color: rgb(102, 102, 102);
}
.safety {
  height: 0px;
  width: 0px;
}
.num_code {
  flex-direction: row;
  height: 88px;
  border-bottom-width: 1px;
  border-bottom-color: rgb(229, 229, 229);
}
.image {
  width: 28px;
  height: 28px;
  align-self: center;
}
.msg {
  font-size: 30px;
  color: rgb(102, 102, 102);
  line-height: 88px;
  width: 300px;
}
.input1 {
  width: 188px;
  border-color: rgb(229, 229, 229);
  color: rgb(102, 102, 102);
  placeholder-color: rgb(153, 153, 153);
  line-height: 88px;
  font-size: 30px;
}
.input2 {
  width: 378px;
  border-color: rgb(229, 229, 229);
  line-height: 88px;
  color: rgb(102, 102, 102);
  text-align: right;
  placeholder-color: rgb(153, 153, 153);
}
.code {
   height: 60px;
  width: 190px;
  color: rgb(209, 154, 95);
  font-size: 28px;
  text-align: center;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgb(209, 154, 95);
  margin-top: 10px;
 line-height: 60px;
 
}
.disimg {
  display: block;
  height: 60px;
  width: 190px;
  font-size: 28px;
  text-align: center;
  align-self: center;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgb(153, 153, 153);
  color: rgb(153, 153, 153);
  line-height: 60px;
  margin-top: 10px;
}
.bank_bottom {
  margin-top: 100px;
  width: 678px;
  height: 88px;
  background-color: rgb(216, 10, 48);
  border-width: 1px;
  border-radius: 10px;
  margin-left: 36px;
}
.confirm {
  font-size: 36px;
  color: rgb(255, 255, 255);
  align-self: center;
  line-height: 88px;
}
</style>
</script>

<script>
const stream = weex.requireModule("stream");
import TitleBar from "@/components/common/titlebar_func.vue";
const picker = weex.requireModule("picker");
export default {
  components: {
    TitleBar
  },
  data() {
    return {
      index: 0, 
      limitMessage: "",  //限额信息
      
      msg: "获取验证码",  //验证码提示框
      soudes: "", //倒计时
     
      
      msgcode: "", //短信验证码
      code: "", //令牌验证码
      verify: "msg",  //选择验证方式  msg-短信  order-令牌

      bankcard: {},  //银行卡
      card_id: "",  //银行卡号
      remain: "",  //银行卡余额
      items: [],  //银行卡列表
      id_list: [], //卡号列表

      check: this.$store.state.imgBaseUrl + "radioOn.png",
      nocheck: this.$store.state.imgBaseUrl + "radio.png",
      imgsrc: this.$store.state.imgBaseUrl + "radioOn.png",
      imgurl: this.$store.state.imgBaseUrl + "radio.png",
      yzmFlag: true
    };
  },
  
  created() {
    this.getRecommend();
  },
  methods: {
    success() {
      if (this.card_id.length < 16) {
        this.alertMsg("请选择银行卡");
        return;
      }
      if (this.limitMessage.length == 0) {
        this.alertMsg("请输入限额信息");
        return;
      }
      if (this.code == "" && this.msgcode == "") {
        this.alertMsg("验证码不能为空");
        return;
      }
      this.jump("/POS_SetSuccess");
    },
    pick() {
      picker.pick(
        {
          index: this.index,
          items: this.id_list
        },
        event => {
          if (event.result === "success") {
            this.bankcard = this.items[event.data];
            this.remain = this.bankcard.remain;
            this.card_id = this.bankcard.id;
            this.index = event.data;
            
          }
        }
      );
    },
    getRecommend() {
      stream.fetch(
        {
          method: "GET",
          url: this.$store.state.jsonBaseUrl + "./json/tab_user/account.json",
          type: "json"
        },
        res => {
          this.items = res.data.data.cardList;
          this.card_id = this.items[0].id;
          this.remain = this.items[0].remain;
          for (var i = 0; i < this.items.length; i++) {
            this.id_list[i] = this.items[i].id;
          }
        }
      );
      
    },
    getMessage(event) {
      this.limitMessage = event.value;
    },
    show1() {
      if (this.verify == "order") {
        this.verify = "msg";
        this.imgsrc = this.check;
        this.imgurl = this.nocheck;
      }
    },
    show2() {
      if (this.verify == "msg") {
        this.verify = "order";
        this.imgurl = this.check;
        this.imgsrc = this.nocheck;
      }
    },
    changeYZM() {
      if (this.yzmFlag) {
        this.yzmFlag = false;
        clearInterval(this.timer);
        if (!this.n) {
          this.msg = "重新获取";
          this.soudes = "60";
         
          var that = this;
          this.timer = setInterval(function() {
            that.soudes--;
            if (that.soudes <= 0) {
              clearInterval(that.timer);
              that.msg = "获取验证码";
              that.yzmFlag = true;
            }
          }, 1000);
        }
      }
    }
  }
};
</script>


