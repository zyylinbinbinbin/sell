<template>
  <div class="dialog">
    <div class="dialog-mask" @click="clickDialog"></div>
    <div class="dialog-warp">
      <div class="dialog-head">
        <h1>{{currentIndicator.title}} (分值{{currentIndicator.score}})</h1>
        <span class="iconfont icon-X" @click="clickDialog"></span>
      </div>
      <div class="dialog-main">
        <div class="current-indicator-title-warp">
          <base-title title="指标内涵：" font-size="20px" font-weight="400"></base-title>
          <div class="current-indicator-title-content">
            <div class="current-indicator-title" v-for="(connotation, connotationIndex) in currentIndicator.connotation" :key="'connotation' + connotationIndex">
              <span>{{++connotationIndex}}.</span><span>{{connotation.value}}</span></div>
          </div>
        </div>
        <div class="current-indicator-answer-warp">
          <base-title title="评等标准：" font-size="20px" font-weight="400"></base-title>
          <el-row class="current-indicator-answer" v-for="(option, optionIndex) in currentIndicator.options" :key="'option' + optionIndex" :class="{'active': optionLetter.indexOf(currentIndicator.answer.letter) === optionIndex}">
            <el-col :span="1">
              <span class="circle"></span>
            </el-col>
            <el-col class="current-indicator-option" :span="2">
              <span>{{optionLetter[optionIndex]}}、</span>
            </el-col>
            <el-col :span="21">
                <span class="current-indicator-grade">
                  {{currentIndicator.grades[optionIndex].value}}({{option}})
                </span>
            </el-col>
          </el-row>
        </div>
        <div class="current-answer-value-warp">
          <base-title title="自评分数：" font-size="20px" font-weight="400"></base-title>
          <div class="current-answer-value">
            {{currentIndicator.answer.letter}}、{{currentIndicator.answer.value}}
          </div>
        </div>
        <div class="current-indicator-desc-warp">
          <base-title title="说明：" font-size="20px" font-weight="400"></base-title>
          <div class="current-indicator-desc-content">
            <div class="current-indicator-desc" v-for="(desc, descIndex) in currentIndicator.desc" :key="'desc' + descIndex">
              <span>{{++descIndex}}.</span><span>{{desc.value}}</span>
            </div>
          </div>
        </div>
        <div class="current-indicator-materials-warp">
          <base-title title="材料提供" font-size="20px" font-weight="400"></base-title>
          <div class="current-indicator-materials">
            <div v-for="(materials, materialsIndex) in currentIndicator.materials" :key="'materials' + materialsIndex">{{(materialsIndex + 1) + '、' + materials.value}}</div>
          </div>
        </div>
        <div class="current-indicator-self-warp" v-if="currentIndicator.answer.selfValue">
          <base-title title="自评说明" font-size="20px" font-weight="400"></base-title>
          <div class="current-indicator-self">
            {{currentIndicator.answer.selfValue}}
          </div>
        </div>
        <div class="current-indicator-self-warp" v-if="$route.name === 'schoolevalua'">
          <base-title title="专家评分" font-size="20px" font-weight="400"></base-title>
          <div class="current-indicator-self">
            {{currentIndicator.specialistScore ? '分值:' + currentIndicator.specialistScore : '专家暂未评分'}}
          </div>
        </div>
        <div class="current-indicator-self-warp" v-if="$route.name === 'schoolevalua'">
          <base-title title="专家反馈" font-size="20px" font-weight="400"></base-title>
          <div class="current-indicator-self">
            {{currentIndicator.specialistValue ? currentIndicator.specialistValue : '专家暂未反馈信息'}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseTitle from '../BaseTitle/baseTitle'
  export default {
    name: "side-dialog",
    props: {
      currentIndicator: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        optionLetter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      }
    },
    methods: {
      clickDialog() {
        this.$emit('clickDialog')
      },
    },
    components: {
      BaseTitle
    }
  }
</script>

<style scoped lang="scss">
  .dialog {
    .dialog-mask {
      position: fixed;
      top: 100px;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: calc(100% - 100px);
      overflow: hidden;
      background-color: rgba(0, 0, 0, .3);
      z-index: 98;
    }
    .dialog-warp {
      height: calc(100% - 100px);
      width: 600px;
      position: absolute;
      top: 100px;
      right: 0;
      background-color: #fff;
      overflow-y: scroll;
      z-index: 99;
      .dialog-head {
        position: fixed;
        top: 100px;
        right: 0;
        @include flex-justify-align();
        height: 60px;
        width: 600px;
        padding: 0 30px;
        box-sizing: border-box;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
        background-color: #fff;
        z-index: 99;
        h1 {
          font-size: 22px;
          font-weight: 600;
        }
        .iconfont {
          color: #999999;
          cursor: pointer;
          &:hover {
            color: $blue;
          }
        }
      }
      .dialog-main {
        padding: 76px 50px 20px 30px;
        font-size: 18px;
        .current-indicator-title-warp {
          margin-bottom: 20px;
        }
        .current-indicator-title-content {
          margin-top: 15px;
        }
        .current-indicator-title {
          display: flex;
          line-height: 26px;
          font-size: 18px;
          color: #666;
        }
        .current-indicator-answer-warp {
          margin-bottom: 20px;
          font-size: 16px;
          color: #666666;
          .circle {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-top: 6px;
            border: 1px solid #d3d3d3;
            box-sizing: border-box;
            border-radius: 50%;
          }
        }
        .current-answer-value-warp {
          margin-bottom: 20px;
        }
        .current-answer-value {
          margin-top: 20px;
          font-size: 18px;
          color: $blue;
        }
        .current-indicator-answer {
          line-height: 25px;
          margin: 10px 0;
          &.active {
            color: $blue;
            .circle {
              border-width: 3px;
              border-color: $blue;
            }
            .current-indicator-grade {
              color: #666666;
            }
          }
        }
        .current-indicator-option {
          text-align: center;
        }
        .current-indicator-desc-warp {
          padding: 20px 0 30px;
          border-top: 1px solid #efefef;
          font-size: 16px;
          color: #999;
          .current-indicator-desc-content {
            margin-top: 15px;
            line-height: 25px;
            .current-indicator-desc {
              display: flex;
            }
          }
        }
        .current-indicator-materials {
          margin: 20px 0 30px;
          div {
            line-height: 25px;
            margin-bottom: 4px;
            font-size: 16px;
            color: #666666;
          }
        }
        .current-indicator-self {
          padding: 20px 0;
          line-height: 25px;
          font-size: 16px;
          color: #666666;
        }
      }
    }
  }
</style>
