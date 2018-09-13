<template>
    <div class="row">
        <text class="title">{{title}}</text>
        <text class="content" @click="pick" >{{id_name}}&nbsp&nbsp&gt</text>
    </div>
</template>
<style>
.row {
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
.content {
  font-size: 30px;
  line-height: 88px;
  margin-right: 36px;
  color: rgb(102, 102, 102);
}

</style>

<script>
const stream = weex.requireModule("stream");
const modal = weex.requireModule("modal");
const picker = weex.requireModule("picker");

export default {
  props:{
      jsonurl:""
  },
  data(){
      return{
        title:"",
        identify_list: [], //json获取的身份证所有信息-列表
        identify_name: [], //身份证类型名-列表
        identify_type: [], //身份证类型编号-列表
        id_type: "", //选中的身份证类型编号
        id_name: "", //选中的身份证类型名
        id_number: "", //身份证号码
      }
  },
  created(){
      this.getData();
  },
  methods:{
    getData(){
      stream.fetch(
        {
          method: "GET",
          url: this.$store.state.jsonBaseUrl + this.jsonurl,
          type: "json"
        },
        res => {
          this.identify_list = res.data.data;
          this.title = res.data.title;
          for (var i = 0; i < this.identify_list.length; i++) {
            this.identify_type[i] = this.identify_list[i].type;
            this.identify_name[i] = this.identify_list[i].name;
          }
          this.id_type = this.identify_type[0];
          this.id_name = this.identify_name[0];
          this.sendValue(this.id_type);
          
        }
      );
    },
    pick() {
      picker.pick(
        {
          items: this.identify_name
        },
        event => {
          if (event.result === "success") {
            this.id_type = this.identify_type[event.data];
            this.id_name = this.identify_name[event.data];
          }
        }
      );
      if(this.id_type != ""){
        this.sendValue(this.id_type);
      }
    },
    sendValue(value) {
      this.$emit("sendValue",value);
    }
  }
}
</script>
