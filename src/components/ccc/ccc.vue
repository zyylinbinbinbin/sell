<template>
      <div class="home">
        <base-upload
      :url="getUploadUrl"
       @uploadItem="uploadItem"
      />
      
    <!-- 页面内容区域 -->
    <div :class="faceShow ? 'contentBox contFaceShow' : 'contentBox'">
      <ul>
        <li v-for="(item,index) in content" :key="index">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <!-- 输入框区域 -->
    <div :class="faceShow ?'box boxFaceShow' : 'box'" ref="heightFace">
      <input type="text" v-model="textConent" class="inputContent">
      <button class="referBut" @click="referContent">提交</button>
      <button class="faceBut" @click="faceContent">表情</button>
    </div>
    <!-- 表情区域 -->
    <div class="browBox" v-if="faceShow">
      <ul>
        <li v-for="(item,index) in faceList" :key="index" @click="getBrow(index)">{{item}}</li>
      </ul>
    </div>

       <el-button type="primary"><a href="http://192.168.0.152:8000/download">下载</a></el-button>

  </div>
</template>

<script>
import BaseUpload from '../Public/BaseUpload/baseUpload'
const appData = require("../../../assets/emojis.json");

export default {
data(){
    return{
      textConent: "",
      faceList: [],
      faceShow: false,
      getBrowString: "",
      content: []
    }
},
components: {
    BaseUpload,
  },
  methods:{
      
    uploadItem(res){
      console.log(res)
        //仅上传一个文件
        // this.temo.push(res.response)
        this.forms.titlelist[res.index].children[res.indexs].list.response =  res.response;
        //一次上传多个文件
        // this.temo.push(res.response)
        // this.forms.titlelist[res.index].children[res.indexs].list.response =  this.temo;
        // console.log(this.forms.titlelist,'上传的')
        },
        // 表情
    faceContent() {
      this.faceShow = !this.faceShow;
      if (this.faceShow == true) {
        for (let i in appData) {
          this.faceList.push(appData[i].char);
        }
      } else {
        this.faceList = [];
      }
    },
    // 获取用户点击之后的标签 ，存放到输入框内
    getBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.textConent += this.getBrowString;
        }
      }
    },
    // 将input的内容渲染到页面上
    referContent() {
      if (this.textConent == "") return alert("请输入内容");
      // 存入
      this.content.push(this.textConent);
      // 清空input数据
      this.textConent = "";
      // 关闭表情列表
      this.faceShow = false;
    }
  },

computed: {
    validLength() {
      return this.majorlist.length !== 0;
    },
    getUploadUrl() {
    //   return this.$api.getUpload
      return this.$config.baseURL + this.$api.getUpload
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../style/Upload/upload";
</style>