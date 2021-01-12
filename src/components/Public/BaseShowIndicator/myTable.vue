<template>
  <base-table
    class="table-warp"
    :loading="loading"
    :validLength="validLength"
    nothing="暂未有材料"
  >
    <template slot="tableHead">
      <el-col :span="8"><div class="head-title one">指标名称</div></el-col>
      <el-col :span="3"><div class="head-title">标准分数</div></el-col>
      <el-col :span="3"><div class="head-title">自评分数</div></el-col>
      <el-col :span="10"><div class="head-title">自评说明</div></el-col>
    </template>
    <template slot="tableMain">
      <div
        v-for="(tableItem, index) in tableDatas"
        :key="tableItem.id"
        @click="clickTableItem(index)"
      >
        <el-row class="tr table-main" :class="{active: index % 2 === 0}">
          <el-col :span="8">
            <div class="filter-content one overflow-space">
              {{tableItem.title}}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="filter-content">
              {{tableItem.score}}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="filter-content">
              {{tableItem.answer.value}}
            </div>
          </el-col>
          <el-col :span="10" class="desc">
            <div class="filter-content overflow-space" :title="tableItem.answer.selfValue">
              {{tableItem.answer.selfValue}}
            </div>
            <span class="look-desc">
              查看详情
            </span>
          </el-col>

        </el-row>
      </div>
    </template>
  </base-table>
</template>

<script>
  import BaseTable from '../BaseTable/baseTable'
  export default {
    name: "my-table",
    props: {
      loading: Boolean,
      validLength: Boolean,
      tableDatas: Array
    },
    methods: {
      clickTableItem(index) {
        this.$emit('clickTableItem', index)
      }
    },
    components: {
      BaseTable
    }
  }
</script>

<style scoped lang="scss">
  .table-warp {
    min-height: 400px;
    margin-top: 30px!important;
    border-radius: 10px;
    .head-title {
      font-weight: 700;
      font-size: 22px;
      text-align: left;
      &.one {
        padding-left: 90px;
      }
    }
  }
  .desc {
    @include flex-align();
  }
  .filter-content {
    height: 60px;
    text-align: left;
    line-height: 60px;
    padding-right: 10px;
    box-sizing: border-box;
    &.one.overflow-space {
      padding-left: 90px;
      width: 98%;
    }
    &.overflow-space {
      width: 70%;
    }
  }
  .look-desc {
    margin-left: 20px;
    color: $blue;
    font-size: 18px;
  }
  .time-head {
    text-align: left;
    padding-left: 55px;
  }
</style>
