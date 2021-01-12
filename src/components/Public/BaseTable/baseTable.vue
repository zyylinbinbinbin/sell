<template>
  <div class="table">
    <el-row class="tr table-head">
      <slot name="tableHead"></slot>
    </el-row>
    <div v-if="validLength" v-loading="loading">
      <slot name="tableMain"></slot>
    </div>
    <div class="nothing-project" v-else>
      <nothing :title="nothing"></nothing>
    </div>
  </div>
</template>

<script>
  import Nothing from '../../Public/Nothing/nothing'
  export default {
    name: "base-table",
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      validLength: {
        type: Boolean,
        default: false
      },
      nothing: {
        type: String,
        default: '暂无数据~'
      }
    },
    components: {
      Nothing
    }
  }
</script>

<style scoped lang="scss">
  .table {
    margin: 20px 0 40px 0;
    padding-right: 50px;
    font-size: 20px;
    .tr {
      @include flex-align();
    }
    .table-head {
      height: 36px;
      text-align: center;
      background: #F0F0F0;
      // border-radius:10px 10px 0 0;
      color: #333;
    }
    .table-main {
      background: #fff;
      line-height: 45px;
      color: #666666;
      border-bottom: 1px solid #e4e4e4;
      font-size: 16px;
      text-align: center;
      &:hover {
        background: $hovergreen;
        cursor: pointer;
      }
    }
    .nothing-project {
      padding: 50px 0 60px;
      background-color: #fff;
    }
  }
</style>
