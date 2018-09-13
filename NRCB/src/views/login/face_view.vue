<template>
  <scroller class="home">
    <title titleJson="login/titlebar.json"></title>
    <NoFirstLogin :name="name" :url="url" :isPwd="isPwd">
      <div class="button-area">
        <div class="button">
          <text style="font-size: 36px;color: white;">刷脸登录</text>
        </div>
      </div>
    </NoFirstLogin>

  </scroller>
</template>
<style scoped>
.center{
  top:140px;
}

.button-area {
    width: 750px;
    height: 100px;
    margin-top: 100px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.button {
  width: 678px;
  height: 88px;
  background-color: rgb(216, 10, 48);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.button:active {
  background-color: rgb(180, 8, 21);
}

</style>

<script>

import Title from "@/components/login/titlebar_component.vue";
import NoFirstLogin from "@/components/login/nofirstlogin_component.vue";

export default {
  components: {NoFirstLogin,Title},
  data() {
    return {
        name: '123****3456',
        url: './imgs/login/login_tx.png',
        isPwd: false
    };
  },
  created() {},
  methods: {}
};
</script>