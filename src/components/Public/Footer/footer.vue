<template>
  <div class="footer">
      <span
        v-for="(item, index) in footerList"
        :key="index"
      >
        {{item}}
      </span>
  </div>
</template>

<script>
  export default {
    name: "my-footer",
    props: {
      footerList: Array,
    }
  }
</script>

<style scoped lang="scss">
  .footer {
    @include flex-justify-align(center);
    height: 80px;
    background-color: #fff;
    span {
      padding: 0 15px;
      font-size: 16px;
      border-right: 1px solid #d6d6d6;
      color: #bebebe;
      &:last-child {
        border-right: 0;
      }
    }
  }
</style>
