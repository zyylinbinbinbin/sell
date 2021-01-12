<template>
  <div>
    <div class="base-read-warp" :style="{'width': width}" v-if="gatherDataLists.length !== 0">
      <template v-for="(option, index) in gatherDataLists">

        <el-row
          :gutter="20"
          class="base-read-row"
          :key="index"
          v-if="option.type !== 'RichText'"
        >

          <template v-if="option.type === 'filling' || option.type === 'short' || option.type === 'radio'">
            <el-col :span="6" class="base-title-col">
              <p class="title">{{++index}}. {{option.title}}</p>
            </el-col>
            <el-col :span="18">
              <p class="content">{{option.answer.content}}</p>
            </el-col>
          </template>

          <template v-if="option.type === 'readRichText'">
            <el-col :span="6" class="base-title-col">
              <p class="title">{{++index}}. {{option.title}}</p>
            </el-col>
            <el-col :span="18" class="richText-content">
              <div class="content" v-html="option.answer.content"></div>
            </el-col>
          </template>

          <template v-if="option.type === 'time' || option.type === 'readTime'">
            <el-col :span="6" class="base-title-col">
              <p class="title">{{++index}}. {{option.title}}</p>
            </el-col>
            <el-col :span="18">
              <p class="content" v-if="option && option.isTimeTrue === 'true'">{{option.answer.date2 | formatTime('Y年M月D日 h:m:s')}}</p>
              <p class="content" v-else>{{option.answer.date1 | formatTime('Y年M月D日')}}</p>
            </el-col>
          </template>

          <template v-if="option.type === 'choice'">
            <el-col :span="6" class="base-title-col">
              <p class="title">{{++index}}. {{option.title}}</p>
            </el-col>
            <el-col :span="18">
              <div>
                <p
                  class="content selfAdd-content"
                  v-for="(item, choiceIndex) in option.answer.content"
                  :key="'choice' + choiceIndex"
                >{{item}}</p>
              </div>
            </el-col>

          </template>

          <template v-if="option.type === 'selfAdd'">
            <el-col :span="6" class="base-title-col">
              <p class="title self-add-title">{{++index}}. {{option.title}}</p>
            </el-col>
            <el-col :span="18">
              <div>
                <p
                  class="content selfAdd-content"
                  v-for="(item, selfAddIndex) in option.content"
                  :key="'selfAdd' + selfAddIndex"
                ><span class="self-content-answer">{{item.value}}:</span>
                  {{item.answer.content}}
                </p>
              </div>
            </el-col>

          </template>

          <template v-if="option.type === 'selfAdd'">
            <el-col :span="6" class="base-title-col">
              <p class="title self-add-title">{{++index}}. {{option.title}}</p>
            </el-col>
            <el-col :span="18">
              <div>
                <p
                  class="content selfAdd-content"
                  v-for="(item, selfAddIndex) in option.content"
                  :key="'selfAdd' + selfAddIndex"
                ><span class="self-content-answer">{{item.value}}:</span>
                  {{item.answer.content}}
                </p>
              </div>
            </el-col>

          </template>

          <template v-if="option.type === 'specialistAdd'">
            <el-col :span="6" class="base-title-col">
              <p class="title self-add-title">{{++index}}. {{option.title}}</p>
            </el-col>
            <el-col :span="18">
              <template v-for="(item, selfAddIndex) in option.answer.content">
                <div
                  class="content selfAdd-content specialistAdd"
                  :key="'selfAdd' + selfAddIndex"
                  v-if="item.options"
                ><div class="self-content-answer">{{item.title}}:</div>
                  <div>
                    <p v-for="(optionsItem, optionsItemIndex) in item.options" :key="optionsItem">
                      {{optionsItem}}{{optionsItemIndex < item.options.length - 1 ? '、' : ';'}}
                    </p>
                  </div>
                </div>
              </template>
            </el-col>

          </template>

          <template v-if="option.type === 'accessory' || option.type === 'picture'">
            <el-col :span="6" class="base-title-col">
              <p class="title">{{++index}}. {{option.title}}</p>
            </el-col>
            <el-col :span="18">
              <p class="content download">
                <a :href="option.answer.content.fileurl" target="_blank">{{option.answer.content.filename}}</a>
                <i class="el-icon-circle-check icon"></i>
              </p>
            </el-col>
          </template>

        </el-row>

      </template>

    </div>
    <nothing :title="nothingTitle" class="nothing" v-else />
  </div>
</template>

<script>
  import Nothing from '../Nothing/nothing'
  export default {
    name: "base-read-options",
    props: {
      gatherDataLists: {
        type: Array,
        default: []
      },
      width: {
        type: String,
        default: '1200px'
      },
      nothingTitle: {
        type: String,
        default: '暂无提交数据'
      }
    },
    components: {
      Nothing
    }
  }
</script>

<style scoped lang="scss">
@import "../../../style/BaseReadOptions/baseReadOptions";
</style>
