<template>
    <div class="container">
        <div class="search-header">
           
               <image :src="searchImgUrl" class="searchImg" />
               <input class="input" ref="inputsearch" id="searchinput" v-model="searchTxt" type="text" placeholder="搜索功能菜单" autofocus="false" @input="oninput" @change="onchange" />
        </div>

        <div class="search-content" ref="content" v-if="$store.state.isSearch"> <!--   -->
            <scroller>
             <div>

                <div v-if="searchResList.length!=0" class="search_div">
                    <text class="search_title">一级菜单：</text>
                <div class="search-list" v-for="(item,index) in searchResList" :key="index" @click="goto(item.url)">
                    <div class="search-path" >
                        <text class="search-c">{{item.name}}</text>
                    </div>
                </div>
                </div>

                <div v-if="searchResList.length==0 "> <!-- //&& searchResNocList.length==0 -->
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
.search-header {
  flex-direction: row;
  align-items: center;
  height: 120px;
  line-height: 120px;
  height: 55px;
  /* width: 542px; */
  width:600px;
  position:relative;
  /* top:35px; */
  left:105px;
}

.searchImg{
  height:30px;
  width:30px;
  position: absolute;
  left:20px;
  top:13px;
  z-index: 5; 
}
.input{
  height: 56px;
  width: 542px;
  padding-left:63px; 
  border-radius: 5px; 
  background-color: rgba(255,255,255, 0.3); 
  /* background-color: yellow; */
  font-size: 28px;
  line-height: 50px;
  color: rgb(252, 208, 211);
  letter-spacing: 1px;
  placeholder-color: rgb(252, 208, 211);
}

.search-content{
    position:fixed;
    top: 28px;       
    width: 750px;
    height:2050px; 
    margin-top: 100px;
    background-color: #eee;
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
    flex-direction: column;
    color:#eee;
}
.search-c{
    /* color:#3f3e3e;  */
    color: rgb(216, 10, 48);
    font-size: 26px;
   
}
.search_title{
    padding-left:12px;
    padding-top:6px;
    padding-bottom:6px;
    background-color: #eee;
    font-size: 28px;
    color:#3f3e3e; 
}
.search_div{
   background-color: #eee;
}
.cancelTxt{
    margin-left: 25px;
    color:#982e6b;
    font-size: 30px;
    background-color: yellow;
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
export default {
  props: [

  ],
  
  data() {
    return {
      searchImgUrl: this.$store.state.imgBaseUrl + "common/titlebar/icon_search.png", //搜索图片
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
    //  this.getNocList();
     // this.getGodList();
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
            this.$store.state.isSearch=false;
            this.$refs.inputsearch.blur();//清空搜索输入框并关闭键盘时，使input失去光标。
        }else{
            this.$store.state.isSearch=true;
            this.getSearchRes(this.searchTxt);
            //this.alertMsg(this.searchTxt);
        }
    },
    onchange() {

    },
    getList(){
        //查询主页一级菜单
        stream.fetch({
          method: "GET",
          url: "./json/tab_home/menu.json",
          type: "json"
        },
        response => {
          if (response.status === 200) {
            this.searchList=response.data.data.menuList;
            this.searchResList=response.data.data.menuList;
            //this.alertMsg(this.searchResList.length);
          }
        },
        () => {}
        )
      
    },
    getSearchRes(val){
        //功能搜索
         this.searchResList=[]
        for(var i in this.searchList){
            let str=this.searchList[i].name;
            if(str.indexOf(val)!=-1){
                this.searchResList.push(this.searchList[i]);
                // this.alertMsg(this.searchResList[0].name);
            }
        }
         //debugger;
    },
    goto(url){
        
        this.$store.state.isSearch=false
        if(url){
           context.launchStage(url);
        }
        // if(url){
        //     this.jump(url);
        // }
        // if(url){
        // this.$emit("transTo",url);
        // }
        // if(url){
        //     setTimeout(()=>{
        //         context.launchStage(url);
        //     },0);
        //  }
        

    }
  }
};
</script>