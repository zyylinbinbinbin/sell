<template>
  <base-dialog @closeDialog="clickCancelBtn">
    <div class="content-info" slot="center">
      信息提交后将无法进行修改，是否确定提交？
    </div>
    <div class="btn-warp" slot="footer">
      <base-button
        @click.native="clickCancelBtn"
        class="cancel-btn"
        font-size="20px"
        border-color="#CECECE"
        background-color="#fff"
        font-color="#CECECE"
        padding="8px 35px"
        title="取消"
      />
      <base-button
        @click.native="clickSendBtn"
        font-size="20px"
        padding="8px 35px"
        title="确定"
      />
    </div>
  </base-dialog>
</template>

<script>
  import BaseDialog from './baseDialog'
  import BaseButton from '../BaseButton/baseButton'
  export default {
    name: "submit-dialog",
    methods: {
      clickCancelBtn() {
        this.$emit('submitCancelBtn')
      },
      clickSendBtn() {
        this.$emit('submitSendBtn')
      }
    },
    components: {
      BaseDialog,
      BaseButton
    }
  }
</script>

<style scoped>
.content-info {
  width: 100%;
  line-height: 26px;
  padding: 30px 70px;
  text-align: center;
  font-size: 18px;
  color: #666;
  box-sizing: border-box;
}
.btn-warp {
  text-align: center;
  padding: 30px 0 40px;
}
.cancel-btn {
  margin-right: 50px;
}

</style>
