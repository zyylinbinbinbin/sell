<template>
  <div class="base-button-warp">
    <div class="btn"
         :style="{
          'background': backgroundColor,
          'color': fontColor,
          'fontSize': fontSize,
          'padding': padding,
          'border-color': borderColor
       }"
    >
      <slot></slot>
      <span class="title">{{getTitle}}</span>
    </div>
    <div class="btn-desc" v-if="isNext">{{nextInfo.title}}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "base-button",
    props: {
      title: String,
      isNext: String,
      backgroundColor: {
        type: String,
        default: '#409EFF'
      },
      borderColor: {
        type: String,
        default: '#409EFF'
      },
      fontColor: {
        type: String,
        default: '#fff'
      },
      fontSize: {
        type: String,
        default: '26px'
      },
      padding: {
        type: String,
        default: '15px 50px'
      }
    },
    computed: {
      ...mapState(['nextInfo']),
      getTitle() {
        return this.isNext ? (this.title ? this.title : this.nextInfo.button) : this.title
      }
    },
  }
</script>

<style scoped lang="scss">
.base-button-warp {
  display: inline-block;
}
.btn {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all .2s linear;
  border: 1px solid #409EFF;
  .iconfont {
    margin-right: 10px;
    font-size: 18px;
  }
}
.btn:hover {
  background: #0A75E4!important;
  color: #fff!important;
  border-color: #409EFF!important;
}
.btn-desc {
  margin-top: 8px;
  color: #999999;
}
</style>
