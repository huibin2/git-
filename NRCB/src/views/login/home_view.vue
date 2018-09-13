<template>
  <scroller class="home">
    <title titleJson="login/titlebar.json"></title>
    <Login class="center"></Login>
  

  </scroller>
</template>
<style scoped>
.center{
  top:140px;
}

</style>

<script>

import Login from "@/components/login/login_component.vue";
import Title from "@/components/login/titlebar_component.vue";


export default {
  components: {Login,Title},
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>