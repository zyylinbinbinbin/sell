<template>
  <div class="title-warp">
    <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    name: "base-content-title",
    props: {
      title: String
    }
  }
</script>

<style scoped lang="scss">
.title-warp {
  border-bottom: 1px solid #CECECE;
  span {
    position: relative;
    display: inline-block;
    padding-bottom: 18px;
    font-size: 22px;
    color: $darkBlue;
    font-weight: 700;
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      height: 4px;
      width: 100%;
      background-color: #F49364;
    }
  }
}
</style>
