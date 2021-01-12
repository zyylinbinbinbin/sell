<template>
  <div class="dialog-title">
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
  export default {
    name: "dialog-title",
    props: {
      title: {
        type: String,
        default: '温馨提示'
      }
    }
  }
</script>

<style scoped lang="scss">
.dialog-title {
  @include flex-justify-align(center);
  height: 50px;
  width: 100%;
  background-color: #fff;
  box-shadow:0 0 20px 0 rgba(64,158,255,0.1);
  span {
    font-size: 22px;
    font-weight: 700;
    color: $darkBlue;
  }
}
</style>
