<template>
  <base-dialog @closeDialog="clickBtn">
    <div class="content-info" slot="center">
      <ul class="error-list-warp">
        <li
          class="error-item"
          v-for="(item, index) in errorList" :key="index">
          <span>{{++index}}. </span><span>{{item}}</span>
        </li>
      </ul>
      <ul class="info-warp">
        <li
          class="info-item"
          v-for="(item, index) in infoList" :key="index">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="btn-warp" slot="footer">
      <base-button
        @click.native="clickBtn"
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
    name: "error-dialog",
    props: {
      errorList: Array,
      infoList: Array
    },
    methods: {
      clickBtn() {
        this.$emit('errorBtn')
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
  width: 100%;
  padding: 15px 40px;
  color: #666;
  box-sizing: border-box;
  .error-list-warp {
    height: 170px;
    overflow: auto;
  }
  .error-item {
    display: flex;
    font-size: 18px;
    line-height: 27px;
    padding: 15px 0;
    border-bottom: 1px solid #CECECE;
    span:first-child {
      margin-right: 5px;
      color: $blue;
      font-weight: 700;
    }
  }
  .info-warp {
    margin-top: 20px;
    color: #CECECE;
    font-size: 16px;
    .info-item {
      margin-bottom: 10px;
    }
  }
}
.btn-warp {
  text-align: center;
  padding: 30px 0 40px;
}
.cancel-btn {
  margin-right: 50px;
}

</style>
