<template>
  <base-dialog>
    <div class="content-info" slot="center">
      <i class="iconfont icon-chenggong-02"></i>
      <span class="title">
        提交成功
      </span>
    </div>
    <div
      class="btn-warp"
      slot="footer"
      @click="clickBtn"
    >
      <span>
        {{btnTitle}}
      </span>
    </div>
  </base-dialog>
</template>

<script>
  import BaseDialog from './baseDialog'
  import BaseButton from '../BaseButton/baseButton'
  export default {
    name: "succeed-dialog",
    props: {
      btnTitle: {
        type: String,
        default: '进行下一步填写>>'
      }
    },
    methods: {
      clickBtn() {
        this.$emit('succeedBtn')
      }
    },
    components: {
      BaseDialog,
      BaseButton
    }
  }
</script>

<style scoped lang="scss">
.content-info {
  @include flex-justify-align(center);
  flex-direction: column;
  padding: 30px 70px;
  text-align: center;
  box-sizing: border-box;
  .iconfont {
    display: inline-block;
    width: 64px;
    height: 64px;
    line-height: 64px;
    margin-bottom: 20px;
    border-radius: 50%;
    background-color: $blue;
    color: #fff;
    font-size: 24px;
  }
  .title {
    font-size: 30px;
    color: $blue;
    font-weight: 700;
  }
}

.btn-warp {
  margin: 10px 0 40px;
  text-align: center;
  span {
    font-size: 20px;
    color: #333333;
    border-bottom: 1px solid #333333;
    cursor: pointer;
  }
}


</style>
