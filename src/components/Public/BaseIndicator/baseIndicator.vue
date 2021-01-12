<template>
  <div class="options-main" v-loading="loading" element-loading-text="拼命加载中">
    <base-backtop target-class=".background-main" ref="indicatorBacktop"></base-backtop>
    <div class="nothing" v-if="gatherData.gatherDataLists.length == 0">
      <nothing title="暂未设置页面内容" />
    </div>

    <div class="options-content">
      <el-form label-position="top" :model="gatherData" ref="optionRuleForm" class="gatherData" :hide-required-asterisk="true">
        <div v-for="(item, index) in gatherData.gatherDataLists">

          <el-row
            class="option-row"
            :key="index"
            v-if="item.type === 'indicator' && nowIndex === index"
          >

            <el-col :span="22">

              <el-row class="indicator">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item :label="addIndex(index, item.title + ' (分值：'+ item.score +')')" :prop="'gatherDataLists.'+ index +'.answer.value'" :rules="rules.region">

                      <div class="indicator-content">
                        <!--指标内涵-->
                        <div class="connotation">
                          <div class="title">指标内涵:</div>
                          <p v-for="(connotationItem, connotationIndex) in item.connotation" :key="'connotation' + connotationIndex">
                            <span class="num">{{++connotationIndex}}. </span>
                            <span class="content">{{connotationItem.value}}</span>
                          </p>
                        </div>

                        <!--评等标准-->
                        <div class="grades">
                          <div class="title">评等标准:</div>
                          <p v-for="(gradesItem, gradesIndex) in item.grades" :key="'grades' + gradesIndex" class="level">
                            <span class="num">{{letterArr[gradesIndex]}}. </span>
                            <span class="content">{{gradesItem.value}}({{item.options[gradesIndex]}})</span>
                          </p>
                        </div>

                        <!--评分标准-->
                        <div class="grades" v-if="getIsShowSpecialist">
                          <div class="title">学校自评分数:</div>
                          <p class="specialist">
                            <span class="num">{{item.answer.letter}}. </span>
                            <span class="content">{{item.answer.value}}</span>
                          </p>
                        </div>

                        <!--评分标准-->
                        <div class="grades" v-else>
                          <div class="title">自评分数:</div>
                          <el-radio-group v-model="item.answer.value">
                            <el-radio
                              v-for="(optionsItem, optionsIndex) in item.options"
                              :key="optionsItem"
                              :label="letterArr[optionsIndex] + '. ' + optionsItem"
                            ></el-radio>
                          </el-radio-group>
                        </div>

                      </div>

                    </el-form-item>

                    <el-form-item
                      :prop="'gatherDataLists.'+ index +'.specialistScore'" :rules="rules.region"
                      v-if="getIsShowSpecialist"
                    >

                      <div class="indicator-content">

                        <!--专家评分标准-->
                        <div class="grades">
                          <div class="title">专家评分数:</div>
                          <el-radio-group v-model="item.specialistScore">
                            <el-radio
                              v-for="(optionsItem, optionsIndex) in item.options"
                              :key="optionsItem"
                              :label="letterArr[optionsIndex] + '. ' + optionsItem"
                            ></el-radio>
                          </el-radio-group>
                        </div>

                      </div>

                    </el-form-item>

                    <div class="indicator-content other">
                      <!--说明-->
                      <div v-if="item.desc" class="desc">
                        <div class="title">说明:</div>
                        <p v-for="(descItem, descIndex) in item.desc" :key="'desc' + descIndex">
                          <span class="num">{{++descIndex}}. </span>
                          <span class="content">{{descItem.value}}</span>
                        </p>
                      </div>

                      <!--必备材料-->
                      <div class="materials" :class="{'materials-bottom': item.selfValue != 'true'}">
                        <div class="title">必备材料:</div>
                        <p v-for="(materialsItem, materialsIndex) in item.materials" :key="'materials' + materialsIndex">
                          <span class="num">{{++materialsIndex}}. </span>
                          <span class="content">{{materialsItem.value}}</span>
                        </p>
                      </div>

                      <el-form-item
                        class="selfValue"
                        :prop="'gatherDataLists.'+ index +'.answer.selfValue'"
                        :rules="rules.content"
                        v-if="item.selfValue == 'true' && !getIsShowSpecialist"
                      >
                        <div class="title">学校自评:</div>

                        <el-input
                          type="textarea"
                          :rows="6"
                          v-model="item.answer.selfValue"
                          placeholder="请填写自评"
                        ></el-input>
                      </el-form-item>

                      <div class="materials" v-if="item.selfValue == 'true' && getIsShowSpecialist">
                        <div class="title">学校自评:</div>
                        <p>
                          <span class="content">{{item.answer.selfValue}}</span>
                        </p>
                      </div>

                      <el-form-item
                        class="selfValue"
                        :prop="'gatherDataLists.'+ index +'.specialistValue'"
                        :rules="rules.content"
                        v-if="getIsShowSpecialist"
                      >
                        <div class="title">专家反馈:</div>
                        <el-input
                          type="textarea"
                          :rows="6"
                          v-model="item.specialistValue"
                          placeholder="请填写信息"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-row>

            </el-col>

          </el-row>
        </div>
        <div
          class="btn-warp"
          v-if="isShowNextBtn"
        >
          <!--next12-->
          <base-button
            :isNext="getIsNextInfo"
            class="options-main-btn"
            :title="getBtnTitle"
            padding="10px 33px"
            font-size="22px"
            @click.native="oneRuleForm('optionRuleForm')"
          />

        </div>
      </el-form>
    </div>
    <submit-dialog
      v-if="isShowSubmitDialog"
      @submitCancelBtn="toggleSubmitDialog"
      @submitSendBtn="submitSendBtn"
    />
    <succeed-dialog
      v-if="isShowSucceedDialog"
      @succeedBtn="nextRouter"
    />
    <error-dialog
      v-if="isShowErrorDialog"
      :error-list="errorList"
      :info-list="infoList"
      @errorBtn="toggleErrorDialog"
    />

  </div>
</template>

<script>
  import BaseTitle from '../BaseTitle/baseTitle'
  import BaseButton from '../BaseButton/baseButton'
  import Nothing from '../Nothing/nothing'
  import SubmitDialog from '../BaseDialog/submitDialog'
  import SucceedDialog from '../BaseDialog/succeedDialog'
  import ErrorDialog from '../BaseDialog/errorDialog'
  import BaseBacktop from '../BaseBacktop/baseBacktop'

  import { mapState } from 'vuex'
  import index from "../../../store";
  export default {
    name: "base-indicator",
    props: {
      btnTitle: {
        type: String,
        default: '保存'
      },
      btnUrl: String,
      isOpenDialog: {
        type: Boolean,
        default: true
      }
    },
    data() {

      let trimValidator = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error());
        }
        callback();
      };

      return {
        // 收集数据开始
        optionsType: {
          type: ''
        },
        tempGatherDataLists: [],
        gatherData: {
          gatherDataLists: []
        },
        // 收集数据结束
        isShowOptionsDialog: false,
        rules: {
          title: [
            { validator: trimValidator, required: true, message: '请输入内容', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请至少选择一个选项', trigger: 'change' }
          ],
          uploadRegion: [
            { required: true, message: '请上传材料', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        loading: false,
        isTrue: true,
        letterArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Z', 'K'],
        formEl: '',
        isShowSubmitDialog: false,
        isShowSucceedDialog: false,
        isShowErrorDialog: false,
        errorList: [],
        infoList: [],
        nowIndex: 0,
        nowRouter: this.$route.name
      }
    },
    computed: {
      ...mapState(['menuId', 'nextInfo']),
      isShowNextBtn() {
        return this.gatherData.gatherDataLists.length !== 0 && this.nextInfo.name
      },
      addIndex() {
        return (index, val) => {
          return (++index) + '. ' + val
        }
      },
      getBtnTitle() {
        return this.gatherData.gatherDataLists.length === this.tempGatherDataLists.length ? this.nextInfo.button : '下一题'
      },
      getIsNextInfo() {
        return this.gatherData.gatherDataLists.length === this.tempGatherDataLists.length ? 'true' : ''
      },
      // 获取当前判断是否显示专家
      getIsShowSpecialist() {
        return this.nowRouter === 'declare_p'
      },
    },
    methods: {
      // 获取数据
      getOptionsList() {
        this.loading = true;
        let isSpecialist;
        if (this.getIsShowSpecialist) {
          isSpecialist = this.$api.getIndicator
        } else {
          isSpecialist = this.$api.getDiyOptions
        }

        isSpecialist()
          .then((res) => {
            this.disposeGetDataInfo(res);
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      },

      // 处理获取数据
      disposeGetDataInfo(res) {
        this.gatherData.gatherDataLists = [];
        if (res) {
          let temp;
          if (Array.isArray(res.level.content)) {
            temp = res.level.content;
          } else {
            temp = JSON.parse(res.level.content);
          }
          temp.forEach(item => {

            if (item.type === 'indicator') {
              if (this.nowRouter === 'completion') {
                item['answer'] = {
                  value: '',
                  letter: '',
                  selfValue: ''
                };
              } else if (this.getIsShowSpecialist) {
                item['specialistScore'] = '';
                item['specialistLet'] = '';
                item['specialistLetVal'] = '';
                item['specialistValue'] = '';
              }
            }

          });
          this.tempGatherDataLists = temp;
          this.gatherData.gatherDataLists.push(this.tempGatherDataLists[0])
        } else {
          this.tempGatherDataLists = [];
        }
        this.loading = false;
      },

      // 点击确认按钮
      toggleSubmitDialog(el) {

        // 开启了弹框确认
        if (this.isOpenDialog) {
          this.isShowSubmitDialog = !this.isShowSubmitDialog;
          if (el) {
            this.formEl = el;
          }
        } else {
          this.optionRuleForm(el)
        }
      },

      // errorBtn
      toggleErrorDialog() {
        this.isShowErrorDialog = !this.isShowErrorDialog
      },

      // succeedBtn
      toggleSucceedDialog() {
        this.isShowSucceedDialog = !this.isShowSucceedDialog;
      },

      // 验证单题
      oneRuleForm(el) {
        if (this.tempGatherDataLists.length !== this.gatherData.gatherDataLists.length) {
          this.$refs[el].validate((valid) => {
            if (valid) {
              let index = this.gatherData.gatherDataLists.length;
              if (this.tempGatherDataLists[index]) {
                this.gatherData.gatherDataLists.push(this.tempGatherDataLists[index]);
                this.nowIndex = index;

                this.$nextTick(() => {
                  if (document.getElementsByClassName('el-backtop')[0]) {
                    document.getElementsByClassName('el-backtop')[0].click();
                  }
                })
              }
            } else {
              this.$message.error('请根据提示完善必填项！');
              return false;
            }
          });
        } else {
          this.toggleSubmitDialog(el)
        }

      },

      // 验证保存自定义选项
      optionRuleForm(el) {

        if (this.isOpenDialog) {
          this.toggleSubmitDialog();
        }

        this.$refs[el].validate((valid) => {
          if (valid) {

            this.gatherData.gatherDataLists.forEach(item => {
              let newInfo;
              if (!this.getIsShowSpecialist) {
                newInfo = item.answer.value.split('. ');
                item.answer.value = newInfo[1];
                item.answer.letter = newInfo[0];
              } else {
                newInfo = item.specialistScore.split('. ');
                item.specialistLet = newInfo[0];
                item.specialistLetVal = newInfo[1];
              }

            });

            this.isShowSubmitDialog = false;
            this.diyOptions(this.gatherData.gatherDataLists)

          } else {
            this.$message.error('请根据提示完善必填项！');
            return false;
          }
        });
      },
      // ajax API
      diyOptions(data) {
        this.$api.postDiyOptions(data)
          .then((res) => {
            if (res) {

              // ajax .then中判断是否开启isOpenDialog
              if (this.isOpenDialog) {
                if (res &&　res.errorList) {
                  this.errorList = res.errorList;
                  this.infoList = res.infoList;
                  this.toggleErrorDialog()
                } else {
                  this.toggleSucceedDialog()
                }
              } else {
                if (res.prompting) {
                  this.$message({
                    message: res.prompting,
                    type: 'success'
                  })
                }
              }
            }
            this.nextRouter();
          })
      },

      nextRouter() {
        this.isShowSucceedDialog = false;
        this.$router.push({name: this.nextInfo.name});
        document.getElementsByClassName('el-backtop')[0].click();
      },

      // 提交确认
      submitSendBtn() {
        this.optionRuleForm(this.formEl)
      },

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
      SubmitDialog,
      SucceedDialog,
      BaseBacktop,
      ErrorDialog
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../style/BaseDiyOptions/baseDiyOptions";
  .options-main .btn-warp .options-main-btn {
    margin: 0;
  }
</style>
