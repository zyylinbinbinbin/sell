<template>
  <div class="btn" v-if="verification" :style="{'padding-top': paddingTop}">
    <base-button :is-next="isNext" :title="title" @click.native="clickBtn" />
  </div>
</template>

<script>
  import BaseButton from './baseButton'
  export default {
    name: "depth-button",
    props: {
      verification: false,
      paddingTop: String,
      title: String,
      isNext: String
    },
    methods: {
      clickBtn() {
        this.$emit('clickBtn')
      }
    },
    components: {
      BaseButton
    }
  }
</script>

<style scoped lang="scss">
  .btn {
    padding-bottom: 50px;
    text-align: center;
  }
</style>
