<template>
  <div class="options-main" v-loading="loading" element-loading-text="拼命加载中">
    <div class="nothing" v-if="gatherData.gatherDataLists.length == 0">
      <nothing title="暂未设置页面内容" />
    </div>

    <div class="options-content">
      <el-form label-position="top" :model="gatherData" ref="optionRuleForm" class="gatherData" :hide-required-asterisk="true">
        <div v-for="(item, index) in gatherData.gatherDataLists">

          <div
            class="rich-text"
            v-if="item.type == 'richText'"
            v-html="item.content"
          ></div>

          <el-row
            class="option-row"
            :key="index"
            v-if="item.type !== 'richText'"
          >

            <el-col :span="22">

              <el-row v-if="item.type == 'filling'">
                <el-col :span="24">
                  <el-form-item :label="addIndex(index, item.title)" :prop="'gatherDataLists.'+ index +'.answer.content'" :rules="rules.title">
                    <el-input clearable v-model="item.answer.content" :placeholder="'请填写' + item.title"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row v-if="item.type == 'choice'">
                <el-col :span="24">
                  <el-form-item :label="addIndex(index, item.title)" :prop="'gatherDataLists.'+ index +'.answer.content'" :rules="rules.region">

                    <el-checkbox-group v-model="item.answer.content">
                      <el-checkbox
                        v-for="item1 in item.content"
                        :key="item1"
                        :label="item1"
                      ></el-checkbox>
                    </el-checkbox-group>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row v-if="item.type == 'radio'">
                <el-col :span="24">
                  <el-form-item :label="addIndex(index, item.title)" :prop="'gatherDataLists.'+ index +'.answer.content'" :rules="rules.region">

                    <el-radio-group v-model="item.answer.content">
                      <el-radio
                        v-for="item1 in item.content"
                        :key="item1"
                        :label="item1"
                      ></el-radio>
                    </el-radio-group>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row v-if="item.type == 'selfAdd'" class="selfAdd">
                <el-col :span="24">
                  <el-form-item :label="addIndex(index, item.title)">

                    <div class="self-add-content">
                      <div class="self-add-item" v-for="(selfAddItem, selfAddIndex) in gatherData.gatherDataLists[index]['content']">
                        <div class="self-add-item-title">{{selfAddItem.value}}</div>
                        <div class="self-add-item-input">
                          <el-form-item :prop="'gatherDataLists.'+ index +'.content['+ selfAddIndex +'].answer.content'" :rules="rules.title">
                            <el-input clearable v-model="item.content[selfAddIndex].answer.content" :placeholder="selfAddItem && selfAddItem.desc ? selfAddItem.desc : '请填写' + selfAddItem.value"></el-input>
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                    <div class="self-add-other-btn" v-if="item.isAdd === 'true'">
                      <span @click="selfNewAdd(index)">
                        <i class="iconfont icon-zengjiatupian"></i>
                        新增
                      </span>
                      <span @click="selfNewRemote(index)" v-if="item.newAdd">
                        <i class="iconfont icon-shanchu1"></i>
                        删除
                      </span>
                    </div>

                  </el-form-item>

                </el-col>
              </el-row>

              <el-row v-if="item.type == 'short'">
                <el-col :span="24">
                  <el-form-item :label="addIndex(index, item.title)" :prop="'gatherDataLists.'+ index +'.answer.content'" :rules="rules.title">
                    <el-input type="textarea" :rows="7" v-model="item.answer.content" :placeholder="'请填写' + item.title"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20" v-if="item.type == 'readTime'">
                <el-col :span="24">
                  <el-form-item :label="addIndex(index, item.title)">
                    <el-col :span="8" class="no-left-padding" :style="{width: item.isTimeTrue !== 'true' ? '410px' : 'auto'}">
                      <el-form-item :prop="'gatherDataLists.'+ index +'.answer.date1'" :rules="rules.date1">
                        <el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model.number="item.answer.date1" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>

                    <el-col :span="6" v-if="item.isTimeTrue === 'true'">
                      <el-form-item :prop="'gatherDataLists.'+ index +'.answer.date2'" :rules="rules.date2">
                        <el-time-picker placeholder="选择时间"  value-format="timestamp" v-model.number="item.answer.date2" style="width: 100%;"></el-time-picker>
                      </el-form-item>
                    </el-col>

                  </el-form-item>
                </el-col>

              </el-row>

              <el-row v-if="item.type == 'readRichText'">
                <el-col :span="24">
                  <el-form-item :label="addIndex(index, item.title)" :prop="'gatherDataLists.'+ index +'.answer.content'" :rules="rules.content">
                    <Wangeditor @editorContent="getEditorContent" :index="index"></Wangeditor>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row v-if="item.type == 'indicator'" class="indicator">
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
                          <p v-for="(gradesItem, gradesIndex) in item.grades" :key="'grades' + gradesIndex">
                            <span class="num">{{letterArr[gradesIndex]}}. </span>
                            <span class="content">{{gradesItem.value}}</span>

                          </p>
                        </div>

                        <!--评分标准-->
                        <div class="grades">
                          <div class="title">评分标准:</div>
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

                    <div class="indicator-content other">
                      <!--说明-->
                      <div class="desc">
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
                        v-if="item.selfValue == 'true'"
                      >
                        <div class="title">学校自评:</div>
                        <el-input type="textarea" :rows="3" v-model="item.answer.selfValue" placeholder="请填写自评"></el-input>
                      </el-form-item>
                    </div>

                  </el-col>
                </el-row>
              </el-row>

              <el-row v-if="item.type == 'accessory' || item.type == 'picture'" :gutter="20">
                <el-form-item class="upload-title" :label="addIndex(index, item.title)">
                  <el-col :span="menuIndex ? 11 : 7">
                    <el-form-item :prop="'gatherDataLists.'+ index +'.answer.content'" :rules="rules.uploadRegion">
                      <base-upload
                        :url="getUploadUrl"
                        :index="index"
                        :uploadType="item.type == 'picture' ? true : false"
                        @uploadItem="uploadItem"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" class="upload-info">
                    <p v-if="item.answer.content && item.answer.content.fileurl">
                      <a
                        :href="item.answer.content.fileurl"
                        :title="item.answer.content.filename"
                        target="_blank"
                        class="overflow-space"
                      >{{item.answer.content.filename}}</a>
                      <i class="el-icon-circle-check"></i>
                    </p>
                  </el-col>
                </el-form-item>
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
            :isNext="isNext"
            v-if="isOpenDialog"
            :title="isBtnTitle"
            padding="10px 33px"
            font-size="22px"
            @click.native="toggleSubmitDialog('optionRuleForm')"
          />

          <base-button
            v-else
            :isNext="isNext"
            class="options-main-btn"
            :title="isBtnTitle"
            :padding="menuIndex ? '10px 30px' : '15px 50px'"
            :font-size="menuIndex ? '20px' : '26px'"
            @click.native="toggleSubmitDialog('optionRuleForm')"
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
  import Wangeditor from '../../Public/Wangeditor/wangeditor'
  import BaseUpload from '../BaseUpload/baseUpload'
  import SubmitDialog from '../BaseDialog/submitDialog'
  import SucceedDialog from '../BaseDialog/succeedDialog'
  import ErrorDialog from '../BaseDialog/errorDialog'
  import { mapState } from 'vuex'
  export default {
    name: "base-diy-options",
    props: {
      menuIndex: String,
      btnTitle: String,
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
      }
    },
    computed: {
      ...mapState(['menuId', 'nextInfo']),
      isShowNextBtn() {
        if (this.isOtherName) {
          return this.gatherData.gatherDataLists.length !== 0
        } else {
          return this.gatherData.gatherDataLists.length !== 0 && this.nextInfo.name
        }
      },
      isNext() {
        return this.isOtherName ? '' : 'true'
      },
      isOtherName() {
        return this.$route.name === 'submission'
      },
      isBtnTitle() {
        if (this.isOtherName) {
          return this.btnTitle
        } else {
          return this.nextInfo.button
        }
      },
      addIndex() {
        return (index, val) => {
          return (++index) + '. ' + val
        }
      },
      getUploadUrl() {
        return this.$config.baseURL + this.$api.getUpload
      },
    },
    methods: {
      // 判断获取API
      judgeGetApi(index) {
        if (!index) {
          return this.$api.getDiyOptions()
        } else {
          return this.$api.getSubmissionDesc(index)
        }
      },

      // 获取数据
      getOptionsList() {
        this.loading = true;
        this.judgeGetApi(this.menuIndex)
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
        if (res && res.level.content) {
          let temp = JSON.parse(res.level.content);
          temp.forEach(item => {

            switch (item.type) {
              case 'readTime':
                item['answer'] = {
                  date1: '',
                  date2: ''
                };
                break;
              case 'choice':
                item['answer'] = {
                  content: []
                };
                break;
              case 'selfAdd':
                item['content'].forEach((selfAddItem) => {
                  selfAddItem['answer'] = {
                    content: ''
                  };
                });
                break;
              case 'indicator':
                item['answer'] = {
                  value: '',
                  letter: '',
                  selfValue: ''
                };
                break;
              // case 'accessory':
              //   item['answer'] = {
              //     content: []
              //   };
              //   break;
              // case 'picture':
              //   item['answer'] = {
              //     content: []
              //   };
              //   break;
              default:
                item['answer'] = {
                  content: ''
                };
            }

          })
          this.gatherData.gatherDataLists = temp;
        } else {
          this.gatherData.gatherDataLists = [];
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

      // 验证保存自定义选项
      optionRuleForm(el) {

        if (this.isOpenDialog) {
          this.toggleSubmitDialog();
        }

        this.$refs[el].validate((valid) => {
          if (valid) {
            this.diyOptions(this.gatherData.gatherDataLists, this.menuIndex)
          } else {
            this.$message.error('请根据提示完善必填项！');
            return false;
          }
        });
      },
      // 判断提交API
      judgePostApi(data, index) {
        if (!index) {
          return this.$api.postDiyOptions(data)
        } else {
          return this.$api.postSubmissionDesc(data, index)
        }
      },
      // ajax API
      diyOptions(data, index) {
        this.judgePostApi(data, index)
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
                if (!index) {
                  this.nextRouter();
                }
              }
            }
          })
      },

      nextRouter() {
        this.isShowSucceedDialog = false;

        // if (!this.isOtherName && this.$route.name != 'message') {
        //   this.$router.push({name: this.nextInfo.name});
        // }

        if (!this.isOtherName) {
          this.$router.push({name: this.nextInfo.name});
        }

        this.$nextTick(() => {
          if (document.getElementsByClassName('el-backtop')[0]) {
            document.getElementsByClassName('el-backtop')[0].click();
          }
        })

      },

      // 提交确认
      submitSendBtn() {
        this.optionRuleForm(this.formEl)
      },

      // 新增selfAdd类型题
      selfNewAdd(index) {
        let temp = JSON.parse(JSON.stringify(this.gatherData.gatherDataLists[index]));
        temp['newAdd'] = true;
        temp.content.forEach((item) => {
          item.answer.content = '';
        });
        this.gatherData.gatherDataLists.splice(index + 1, 0, temp);

      },

      // 删除selfAdd类型题
      selfNewRemote(index) {
        this.gatherData.gatherDataLists.splice(index, 1);
      },

      // 接收富文本字段
      getEditorContent(val) {
        let text = val['content'].replace(/<.*?>/g,"");
        if (!text.trim()) {
          this.gatherData.gatherDataLists[val.index]['answer']['content'] = '';
        } else {
          this.gatherData.gatherDataLists[val.index]['answer']['content'] = val.content;
        }
      },

      // 接收上传文件成功
      uploadItem(res) {
        this.gatherData.gatherDataLists[res.index].answer.content = res.response;
      }

    },
    watch: {
      menuId: {
        handler: function(val) {
          if (this.menuIndex) return;
          this.getOptionsList();
        },
        immediate: true
      },
      menuIndex: {
        handler: function(val) {
          if (!val) return;
          this.getOptionsList();
        },
        immediate: true
      }
    },
    components: {
      BaseTitle,
      BaseButton,
      Nothing,
      Wangeditor,
      BaseUpload,
      SubmitDialog,
      SucceedDialog,
      ErrorDialog
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../style/BaseDiyOptions/baseDiyOptions";
</style>
