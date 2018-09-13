<template>
  <div class="container" :style="{backgroundColor:backgroundColor}">
    <div class="wrapper" v-for="(item,key) in financeData" :key="key">
      <div class="banker-bottom">
        <div class="text-center">
          <text class="nume">当前版本：{{item.nume}}</text>
        </div>
        <div class="text-center">
          <text class="bottom">{{item.bottom}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 750px;
  height: 158px;
}

.nume {
  /* margin-left: 246px; */
  color: #b4b5b5;
  margin-top: 2px;
  margin-bottom: 8px;
  font-size: 20px;
}
.text-center{
  align-items: center;
}
.bottom {
  /* margin-left: 172px; */
  color: #b4b5b5;
  font-size: 20px;
}
.wrapper {
  width: 750px;
  position: relative;
  justify-content: space-between;
}

.banker-bottom {
  background-color: #efeff4;
  height: 154px;
  font-size: 20px;
  color: #b4b5b5;
  display: flex;
  text-align: center;
  padding: 50px;
}
.logal {
  width: 250px;
  height: 42px;
  margin-left: 250px;
  margin-top: 40px;
}
</style>
<script>
//理财类型： hot、black、presale 、setUp、soldOut
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");
export default {
  props: {
    finance: {
      type: String,
      default: "tab_user/hottalk.json"
    }
  },
  created() {
    this.getData();
  },
  data() {
    return {
      backgroundColor: "#F8F8F8",
      financeData: []
    };
  },
  methods: {
    goto(id) {
      context.launchStage(id);
    },
    getData() {
      if (this.finance) {
        stream.fetch(
          {
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
  },
  watch: {
    finance() {
      this.getData();
    }
  }
};
</script>