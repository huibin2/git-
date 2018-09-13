<template>
    <scroller class="home">
        <title titleJson="./login/findpwdresult_title.json"></title>
        <div class="result-area">
            <image class="result-img" src="./imgs/suc.png"></image>
            <text class="result-text">重置密码成功</text>
        </div>
        <div class="button-area">
            <div class="button" @click="login">
                <text class="button-text">重新登录 {{second}}S</text>
            </div>
        </div>
    </scroller>
</template>

<script>
import Title from "@/components/login/titlebar_component.vue";

const context = weex.requireModule("context");
const modal = weex.requireModule("modal");
export default {
  components: { Title },
  data() {
    return {
      second: 5,
      timer: ""
    };
  },
  created() {
    this.countDown();
  },
  methods: {
    login() {
      this.jump("/Login");
    },
    countDown() {
           this.timer = setInterval(() => {
             this.second --;
            if (this.second <= 0) {
               clearInterval(this.timer);
               this.login();
             
            
            }
          }, 1000);
    }
      
    
  }
};
</script>

<style scoped>
.home {
  width: 750px;
  height: 1500px;
  background-color: rgb(240, 240, 240);
}

.result-area {
  margin-top: 128px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 350px;
  background-color: white;
}

.result-img {
  width: 120px;
  height: 120px;
}

.result-text {
  font-size: 36px;
  margin-top: 30px;
  color: rgb(65, 201, 142);
}

.button-area {
  margin-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 678px;
  height: 88px;
  border-width: 3px;
  border-color: rgb(216, 10, 48);
  border-style: solid;
  border-radius: 10px;
}

.button-text {
  font-size: 35px;
  color: rgb(216, 10, 48);
}
</style>