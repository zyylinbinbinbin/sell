<template>
  <div class="db" :style="{'fontSize': fontSize,'margin':margin,'padding':padding}">
    <div class="yuan" :style="{'width':yuanwidth}"></div>
    <div class="title-warp" >{{title}}</div>
  </div>
</template>

<script>
  export default {
    name: "base-title",
    props: {
      title: String,
      fontSize: String,
      margin:{
        type: String,
        default: '0 0 10px 10px'
      },
      padding:{
        type: String,
        default: '20px 0 10px 10px'
      },
      yuanwidth:{
        type: String,
        default: '10px'
      }
    }
  }
</script>

<style scoped lang="scss">
.db{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.title-warp{
    // border-left: 4px solid #348F6C;
    padding-left: 5px;
    font-size: 16px;
    font-weight: bold;
    // margin: 40px 0 0 40px;
    width: 1495px;

}
.yuan{
  height: 10px;
  background: #4FA781;
  border-radius: 50%;
}
</style>
