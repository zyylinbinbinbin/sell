<template>
  <div>
    <div class="dialog-mask" @click="close"></div>
    <div class="dialog-warp" :style="{'width': width, 'top': top}">
      <div class="dialog-head">
        <dialog-title />
      </div>
      <div class="dialog-main">
        <slot name="center"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import DialogTitle from './dialogTitle'
  export default {
    name: "base-dialog",
    props: {
      width: {
        type: String,
        default: '500px'
      },
      top: {
        type: String,
        default: '22%'
      },
      title: {
        type: String,
        default: '新增项目'
      }
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      }
    },
    components: {
      DialogTitle
    }
  }
</script>

<style scoped lang="scss">
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, .3);
  z-index: 98;
}
.dialog-warp {
  min-height: 200px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  z-index: 99;
  .dialog-head {
    @include flex-justify-align(center);
    .iconfont {
      color: #999999;
      cursor: pointer;
      &:hover {
        color: $blue;
      }
    }
  }
}
</style>
