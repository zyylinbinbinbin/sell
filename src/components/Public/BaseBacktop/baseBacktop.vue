<template>
  <el-backtop :target="targetClass">
    <i class="iconfont icon-xiala-1 backtop-up"></i>
  </el-backtop>
</template>

<script>
  export default {
    name: "base-backtop",
    props: {
      targetClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
.backtop-up {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0,0,0, .12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
</style>
