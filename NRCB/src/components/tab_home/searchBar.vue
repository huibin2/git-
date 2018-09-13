<template>
    <div class="container">
        <div class="search-header">
            <div class="search-box">
            <image :src="searchImgUrl" class="searchImg" />
            <input ref="inputbox" class="input" id="searchinput" v-model="searchTxt" type="text" placeholder="请输入您要搜索的关键字" @input="oninput" @change="onchange" />
            </div>
            <text class="cancelTxt" @click="cancel">取消</text>
        </div>
        <div class="search-content" ref="content" v-if="$store.state.isSearch">
            <scroller>
                <div >
            <div v-if="searchResList.length!=0">
                <text class="search_title">功能：</text>
            <div class="search-list" v-for="(item,index) in searchResList" :key="index" @click="goto(item.url)">
                <div class="search-path" v-for="(arr,index1) in item.path" :key="index1" >
                    <text class="search-c">{{arr}}</text>
                    <text class="search-c" v-if="index1<item.path.length-1">></text>
                </div>
            </div>
            </div>
            <div v-if="searchResNocList.length!=0">
                <text class="search_title">公告：</text>
            <div class="search-list" v-for="(item,index) in searchResNocList" :key="index" @click="goto(item.url)">
                <div class="search-path" >
                    <text class="search-c">{{item.title}}</text>
                </div>
            </div>
            </div>
            <div v-if="searchResGodList.length!=0">
                <gold :showData="godList" ></gold>
            </div>
            <div v-if="searchResList.length==0 && searchResNocList.length==0">
                <text>搜索无记录</text>
            </div>
                </div>
            </scroller>
        </div>
    </div>
</template>

<style scoped>
.container{
    width:750px;
}
.search-box{
    flex-direction: row;
    background-color: #f0f0f0;
    border-radius: 15px;  
    align-items: center;  
    width:520px;
    height:60px;
    margin-left: 112px;
}
.search_title{
    padding-left:12px;
    padding-top:6px;
    padding-bottom:6px;
    background-color: #eee;
}
.searchImg {
  /*background-color: #ffffff;*/
  /* margin-top: 5px; */
  margin-left: 26px;
  width: 40px;
  height: 40px;
}
.search-header {
  flex-direction: row;
  align-items: center;
  height: 120px;
  line-height: 120px;
  padding-top:30px;
}
.search-content{
    /* position: fixed; */
    width: 750px;
    height:1050px;
}
.search-c{
    color:#3f3e3e;
    font-size: 26px;

}
.search-list{
    width: 750px;
    height:90px;
    align-items: center;
    padding-left:50px;
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #000;
    /* background-color: #ccc; */
}
.search-path{
    flex-direction: row;
    color:#eee;
}
.input {
    /* width: 260px; */
	/* height: 30px; */
  width: 400px;
  height: 50px;
  margin-left: 16px;
  /* width: 460px;
  font-size: 25px;
  height: 40px;
  border-radius: 10px; */
  background-color: #f0f0f0;
  color:#999999;
  placeholder-color: #fcd0d3;
}
.cancelTxt{
    margin-left: 25px;
    color:#982e6b;
    font-size: 30px;
}
</style>
<script>
/**
 * @module 智能搜索组件
 * @description 智能搜索weex组件
 * @example  <search-bar></search-bar>
 * 
 * 
**/

const stream = weex.requireModule("stream");
const context = weex.requireModule("context");
const modal = weex.requireModule("modal");
  import Gold from "@/components/tab_finance/gold.vue";
export default {
  props: [],
  /**
   * Components 包含推荐组件
   * @prop {Component} Gold 推荐组件
   */
  components:{
      Gold
  },
  data() {
    return {
      searchImgUrl: this.$store.state.imgBaseUrl + "search_nor@3x.png", //搜索图片
      searchList: [], //列表清单list
      searchResList: [], //搜索结果list
      searchNocList: [], //公告清单list
      searchResGodList: [], //话题搜索结果list
      searchGodList: [], //话题清单list
      searchResGodList: [], //话题搜索结果list
      godList:{},//话题list
      godResList:{},//话题搜索结果list
      searchTxt:"",//搜索框
      jsonUrl:"./json/"
    };
  },
  mounted() {
    //   modal.alert({message:111})
      this.getList();
      this.getNocList();
      this.getGodList();
    //   modal.alert({message:this.$refs["content"].style.height})
      this.$refs["content"].style.height=this.getHeight()
  },
  methods: {
      cancel(){
          this.searchTxt="";
          this.oninput();
          this.$emit("cancel");
      },
    oninput() {
        if(this.searchTxt==""){
            this.$store.state.isSearch=false
        }else{
            this.$store.state.isSearch=true;
            this.getSearchRes(this.searchTxt)
        }
        
    },
    onchange() {

    },
    getList(){
        //查询功能清单
        stream.fetch({
          method: "GET",
          url: "./json/list-menu.json",
          type: "json"
        },
        response => {
          if (response.status === 200) {
            this.searchList=response.data.list;
            this.searchResList=response.data.list;
          }
        },
        () => {}
        )
    },
    getNocList(){
        //获取公告数据
        stream.fetch({
          method: "GET",
          url: "./json/tab_home/notice.json",
          type: "json"
        },
        response => {
          if (response.status === 200) {
            this.searchNocList=response.data.data;
            this.searchResNocList=response.data.data;
          }
        },
        () => {}
        )
    },
    getGodList(){
        //获取话题数据
        stream.fetch({
          method: "GET",
          url: "./json/tab_finance/gold.json",
          type: "json"
        },
        response => {
          if (response.status === 200) {
              this.godList=response.data.data.newsList;
            this.searchGodList=response.data.data.newsList;
            this.searchResGodList=response.data.data.newsList;
          }
        },
        () => {}
        )
    },
    getSearchRes(val){
        //功能搜索
         this.searchResList=[]
        for(var i in this.searchList){
            let str=this.searchList[i].path.toString()+this.searchList[i].key;
            if(str.indexOf(val)!=-1){
                this.searchResList.push(this.searchList[i])
            }
        }
        //公告搜索
        this.searchResNocList=[]
        for(var i in this.searchNocList){
            let str=this.searchNocList[i].key;
            if(str.indexOf(val)!=-1){
                this.searchResNocList.push(this.searchNocList[i])
            }
        }
        //话题搜索
        this.searchResGodList=[]
        for(var i in this.searchGodList){
            let str=this.searchGodList[i].key;
            if(str.indexOf(val)!=-1){
                this.searchResGodList.push(this.searchGodList[i])
            }
        }
        debugger;
        this.godList=this.searchResGodList;
        
    },
    goto(url){
        
        this.$store.state.isSearch=false
        this.$emit("transTo",url);
        // setTimeout(()=>{
        //     context.launchStage(url);
        // },0)
        

    }
  }
};
</script>