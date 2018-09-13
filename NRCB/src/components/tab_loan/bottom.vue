<template>
    <div class="container">
        <image :src="imgsrc" class="img"></image>
    </div>
</template>
<style scoped>
.container {
 width: 750px;
  height: 86px;
  justify-content: center;
  align-items: center;
  }
.img {
  height: 23px;
  width: 395px;
}
</style>
<script>
export default {
    data(){
        return {
            imgsrc :this.$store.state.imgBaseUrl + "tab_loan/bottom/nomore.png"
        }
    }
};
</script>
