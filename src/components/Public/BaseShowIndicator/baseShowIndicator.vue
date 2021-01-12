<template>
  <div class="options-main" v-loading="loading" element-loading-text="拼命加载中">
    <base-backtop target-class=".background-main" ref="indicatorBacktop"></base-backtop>
    <div class="nothing" v-if="gatherDataLists.length == 0">
      <nothing title="暂未设置页面内容" />
    </div>

    <my-table
      :validLength="gatherDataLists.length !== 0"
      :tableDatas="gatherDataLists"
      :loading="loading"
      @clickTableItem="clickTableItem"
    />


    <div class="pagination" v-if="gatherDataLists.length !== 0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <div
      class="btn-warp"
      v-if="isShowNextBtn"
    >
      <!--next11-->
      <base-button
        class="options-main-btn"
        :title="nextInfo.button"
        padding="10px 33px"
        font-size="22px"
        isNext="true"
        @click.native="nextRouter"
      />

    </div>

    <side-dialog
      :currentIndicator="item"
      @clickDialog="clickDialog"
      v-if="isOpenDialog"
    />

  </div>
</template>

<script>
  import BaseTitle from '../BaseTitle/baseTitle'
  import BaseButton from '../BaseButton/baseButton'
  import Nothing from '../Nothing/nothing'
  import BaseBacktop from '../BaseBacktop/baseBacktop'
  import MyTable from './myTable'
  import SideDialog from './sideDialog'
  import { mapState } from 'vuex'
  export default {
    name: "base-show-indicator",
    props: {
      btnTitle: {
        type: String,
        default: '保存'
      },
      btnUrl: String
    },
    data() {
      return {
        // 收集数据开始
        gatherDataLists: [],
        item: {}, // 点击后的那个指标
        page: 1,
        total: 0,
        // 收集数据结束
        isShowOptionsDialog: false,
        loading: false,
        isOpenDialog: false,
        letterArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Z', 'K'],
        nowRouter: this.$route.name
        // nowRouter: 'sign'
      }
    },
    computed: {
      ...mapState(['menuId', 'nextInfo']),
      isShowNextBtn() {
        return this.gatherDataLists.length !== 0 && this.nextInfo.name
      },
      // 获取当前判断是否显示专家
      getIsShowSpecialist() {
        return this.nowRouter === 'schoolevalua'
      },
    },
    methods: {
      // 获取学校数据
      getOptionsList() {
        this.loading = true;
        this.$api.getExaminationDesc(this.page)
          .then((res) => {
            if (res && res.return) {
              this.gatherDataLists = res.return;
              this.total = +res.total;
            } else {
              this.gatherDataLists = [];
              this.total = 0;
            }

            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      },

      // 设置分页当前页
      handleCurrentChange(page) {
        this.page = page;
        this.getOptionsList();
      },

      nextRouter() {
        this.$api.getAjaxNextBtn()
          .then((res) => {
            if (res) {
              this.isShowSucceedDialog = false;
              this.$router.push({name: this.nextInfo.name})
              this.$nextTick(() => {
                if (document.getElementsByClassName('el-backtop')[0]) {
                  document.getElementsByClassName('el-backtop')[0].click();
                }
              })
            }
          })

      },

      // 点击单个
      clickTableItem(index) {
        this.item = this.gatherDataLists[index];
        this.isOpenDialog = true;
      },

      // 点击dialog
      clickDialog() {
        this.isOpenDialog = !this.isOpenDialog;
      }

    },
    watch: {
      menuId: {
        handler: function(val) {
          this.getOptionsList();
        },
        immediate: true
      }
    },
    components: {
      BaseTitle,
      BaseButton,
      Nothing,
      BaseBacktop,
      MyTable,
      SideDialog
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../style/BaseDiyOptions/baseDiyOptions";
  .options-main .btn-warp .options-main-btn {
    margin: 0;
  }
  .btn-warp {
    .options-main-btn {
      margin: 0 auto!important;
    }
  }
  .pagination {
    text-align: center;
  }
</style>
