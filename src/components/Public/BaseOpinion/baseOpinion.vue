<template>
  <div class="opinion-warp" v-loading="loading">
    <div class="opinion-title"
      v-html="richText"
      v-if="richText"
    ></div>
    <div class="filled-ideas">
      <el-input
        type="textarea"
        :rows="12"
        placeholder="请输入反馈"
        v-model="filledIdea">
      </el-input>

      <span class="btn-warp">
        <base-button
          class="options-main-btn"
          title="提交"
          padding="8px 30px"
          font-size="20px"
          @click.native="sendBtn"
        />
      </span>
    </div>
    <div class="filled-content" v-if="ideaRecord.length">
      <p class="title">意见反馈记录</p>
      <div class="filled-lists">
        <div class="filled-list-item" v-for="idea in ideaRecord" :key="idea.time">
          <div class="filled-list-item-content" :class="{'filled-list-my': idea.type === 'my'}">
            <p>{{idea.type === 'my' ? '专家回复：' : '您的意见：'}}</p>
            <div>{{idea.content}}</div>
          </div>
          <p class="time">{{idea.time | formatTime('Y年M月D日 h:m:s')}}</p>
        </div>
      </div>
    </div>
    <div class="btn-warp" v-if="isShowNextBtn">
      <!--next11-->
      <base-button
        isNext="true"
        :title="nextInfo.button"
        padding="10px 33px"
        font-size="22px"
        @click.native="nextRouter"
      />
    </div>
  </div>
</template>

<script>
  import BaseButton from '../../Public/BaseButton/baseButton'
  import { mapState } from 'vuex'
  export default {
    name: "base-opinion",
    data() {
      return {
        loading: false,
        richText: '',
        filledIdea: '',
        ideaRecord: [],
      }
    },
    methods: {
      // 保存按钮
      sendBtn() {
        if (this.filledIdea) {

          let temp = JSON.parse(JSON.stringify(this.ideaRecord));
          temp.push({
            type: 'school',
            content: this.filledIdea,
            time: new Date().getTime()
          });

          this.$api.postFilterIdea({
            message: temp
          })
            .then((res) => {
              if (res && res.prompting) {
                this.$message({
                  message: res.prompting,
                  type: 'success'
                });
                this.ideaRecord = res.return.message;
                this.filledIdea = ''
              }
            })
        } else {

          this.$message({
            message: '请先填写反馈信息',
            type: 'warning'
          });

        }
      },

      // 获取数据
      getFilterIdea() {
        this.loading = true;
        this.$api.getFilterIdea()
          .then(res => {
            if (res && res.level) {
              this.richText = res.level.explain;
              this.ideaRecord = res.level.message ? res.level.message : [];
            } else {
              this.richText = '';
              this.ideaRecord = []
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          })
      },

      // 下一步
      nextRouter() {
        this.$api.getAjaxNextBtn()
          .then((res) => {
            if (res) {
              this.$router.push({name: this.nextInfo.name})
            }
          })
      }
    },
    computed: {
      ...mapState(['nextInfo']),
      isShowNextBtn() {
        return this.nextInfo.name
      }
    },
    mounted() {
      this.getFilterIdea()
    },
    components: {
      BaseButton
    }
  }
</script>

<style scoped lang="scss">
.opinion-warp {
  margin-top: 30px;
  .opinion-title {
    line-height: 22px;
    margin-bottom: 20px;
  }
  .filled-ideas {
    .btn-warp {
      display: inline-block;
      margin: 30px 0;
    }
  }
  .filled-content {
    .title {
      margin: 10px 0 20px;
      font-size: 20px;
      color: $blue;
    }
  }
  .filled-lists {
    padding: 10px 30px;
    background: rgba(255,255,255,1);
    box-shadow: 0 0 20px 0 rgba(64,158,255,0.1);
    border-radius: 10px;
    .filled-list-item {
      margin-bottom: 10px;
      .time {
        padding-right: 10px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #CECECE;
        text-align: right;
        border-bottom: 1px solid #e7e7e7;
      }
      .filled-list-item-content {
        line-height: 27px;
        color: #999999;
        p {
          padding-top: 10px;
          margin-bottom: 5px;
          font-size: 18px;
        }
        div {
          text-indent: 32px;
        }
        &.filled-list-my {
          color: #333333;
        }
      }
      &:last-child {
        .time {
          border-bottom: 0;
        }
      }
    }
  }
  .btn-warp {
    margin-top: 50px;
  }
}
</style>
