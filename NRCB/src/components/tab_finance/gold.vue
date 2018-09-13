<template>
  <div class="container">
    <div class="banker-center">
      <text class="banker-center-left">{{title_name}}</text>
      <div class="banker-center-right">
        <text class="more" @click="jumpto(url)">{{more}}</text>
        <image class="img" :src="imgurl"></image>
      </div>
    </div>
    <!-- <div v-if="showData==''"> -->
    <div class="tab">
      <div class="menuItem" :style="{width:itemWidth}" v-for="(item,key) in List" :key="key" @click="JumpTo(item.url)">
        <image class="gold" @click="jumpTo(item.url)" :src="item.src"/>
        <div class="desc">
          <text class="type">{{item.type}}</text>
          <text class="price">{{item.price}}</text>
        </div>
      </div>
    </div>
  
      </div>
    </scroller>
  </div>
</template>

<style scoped>
.container {
  width: 750px;
  background-color: #ffffff;
  margin-bottom: 15px;
}
 .banker-center {
  flex-direction: row;
  padding-left: 36px;
  background-color: #ffffff;
  height: 89px;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: rgb(229, 229, 229);
  border-bottom-width: 1px;
}
.banker-center-left {
  font-size: 34px;
  font-weight: 600;
  color: rgb(51, 51, 51);
}
.banker-center-right{
  height: 28px;
  line-height: 28px;
  align-items: center;
  flex-direction: row;
}
.more{
  line-height: 28px;
  height:28px;
  margin-right: 53px;
  align-self: center;
  font-size: 28px;
  color: rgb(153,153,153);
}
.img{
  width:13px;
  height:24px;
  position: absolute;
  right: 36px;
}

.content{
  width: 750px;
  background-color: #ffffff;    
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
}

.tab {
  width: 750px;
  background-color: #ffffff;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 15px;
}

.menuItem{
  flex-direction: row;
  width: 347px;
  padding-left: 16px;
  margin-top: 20px;
}

 
.gold{
  height:134px;
  width: 142px;
  border-width:1px;
  border-color :#eeeeee;
  margin-left: 20px;
}

.desc{
  flex-direction: column;
  height:135px;
  width:185px;
  padding-left:15px ;
  border-width:1px;
  border-color :#eeeeee;
}
.type{
  height:80px;
  width: 185px;
  line-height: 80px;
  font-size: 30px;
  color: rgb(51, 51, 51);
}
.price{
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  width: 185px;
  color: rgb(216, 10, 48);
}

</style>
<script>
const stream = weex.requireModule("stream");
const context = weex.requireModule("context");

export default {
  props: ["jsonurl","showData"],
  data() {
    return {
      List: [],
      amount:2,
      tabWidth:750,
      more:"",
      imgurl:"",
      title_name:"",
    };
  },
  computed: {
    itemWidth: function () {
      return this.tabWidth / this.amount;
    }
  },
  created() {
    this.getGoldData()
  },
  methods: {
    jumpTo(url) {
      if (url) {
        context.launchStage(url);
      }
    },
    getGoldData(){
        if(!this.showData){
          stream.fetch(
            {
              method: "GET",
              url: this.$store.state.jsonBaseUrl + this.jsonurl,
              type: "json"
            },
            res => {
              if (res.status === 200) {
                this.amount = res.data.data.amount;
                this.more = res.data.data.more;
                this.imgurl = res.data.data.imgurl;
                this.title_name = res.data.data.title_name;
                this.List = res.data.data.List;
              }
            }
          );
        }else{
          this.NewsList=this.showData;
        }
      }
  },
  showData() {
        debugger;
        this.getGoldData()
      }
};
</script>