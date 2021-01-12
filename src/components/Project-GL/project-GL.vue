<template>
  <div>
    <div class="background">
      
        <el-row>
          <el-col :span="21">
            <div class="baiban">
              <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" :inline="true" class="demo-ruleForm">
                <el-form-item label="项目名称"  class="form" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="负责人"  class="form" prop="region">
                  <el-input v-model="ruleForm.region" placeholder="请输入负责人"></el-input>
                </el-form-item>
                <el-form-item class="forms">
                  <el-button class="formbutton" type="success" @click="submitForm('ruleForm')">查询</el-button>
                  <el-button class="formbutton" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
           </div>
          </el-col>
          <el-col :span="3">
                  <el-button class="formbuttons" type="success" @click="addNew">+ 新增项目</el-button>
          </el-col>
        </el-row>
      </div>
        <div class="background1" >
            <div class="modular" v-if="inspectlist.length > 0">
              <div v-for="(item,index) in inspectlist" :key="index">
                <div class="baiban1 animated flipInX" @click="inspectClick(item.id)">
                      <div class="title">{{item.summary}}</div>
                      <div class="detailed">
                        <div>
                        <div class="Admins">
                        <span class="Admin">
                          <span class="iconfont iconAdmin"></span>
                          <span>合作单位</span>
                        </span>
                      </div>
                      <div class="Admins">
                        <span class="Admin">
                          <span class="iconfont iconAdmin"></span>
                          <span>项目负责人</span>
                        </span>
                      </div>
                      <div class="Admins">
                        <span class="Admin">
                          <span class="iconfont iconAdmin"></span>
                          <span>项目阶段</span>
                        </span>
                      </div>
                      </div>
                      <div class="Companyname">
                        <div>{{item.Organizational_unit}}</div>
                        <div>{{item.leader}}</div>
                        <div class="border1" v-if="item.process == 0">项目接洽</div>
                        <div class="border1" v-if="item.process == 1">采购阶段</div>
                        <div class="border2" v-if="item.process == 2">签订协议</div>
                        <div class="border2" v-if="item.process == 3">项目实施</div>
                        <div class="border2" v-if="item.process == 4">项目交付</div>
                        <div class="border3" v-if="item.process == 5">项目总结</div>
                        <div class="border3" v-if="item.process == 6">档案入库</div>
                      </div>
                      </div>
              </div>
                
              <div class="speed">
                <el-progress :percentage="item.process_precent" :stroke-width="8"></el-progress>
              </div>
            </div>
            </div>
        <nothing title="暂无数据" picSize="500px" fontSize="50px" v-else></nothing>
        </div>
        <!-- 分页 -->
      <div class="block"  v-if="inspectlist.length > 0">
        <el-pagination
        background
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="9"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import Nothing from '../Public/Nothing/nothing'
export default {
  components:{
    Nothing
  },
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
        },
        inspectlist:[],
        currentPage4: 1,//初始页
        page:1,//    每页的数据
        total: 0,
        pagesize: [10,20,30,40], //每页几条
        state:'',
        
      };
    },
    methods: {
      inspectClick(id){
        this.$router.push({
          path: '/project-Change',
          query: {
            id: id
          }
        })
      },
      //当前第几页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val

        this.project()
      },
      //查询列表
      submitForm(formName) {
        //   this.$api.postproject({
        //   project_name:this.ruleForm.name,
        //   project_leader:this.ruleForm.region,
        // }).then(res=>{
        //    this.inspectlist = res.data
        //    this.post_data = res.post_data
        // })
          this.page = 1
          this.project()
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addNew(){
        this.$router.push('/project-Add')
      },
      //项目列表
      project(){
        this.$api.getproject({
          page:this.page,
          project_name:this.ruleForm.name,
          project_leader:this.ruleForm.region,
        }).then(res=>{
          this.inspectlist = res.data
          this.total = res.project_num
        })
      },
    },
    mounted(){
      this.project()
    },
    created(){
      this.$store.state.adminleftnavnum="3";
    }
  }

</script>

<style lang="scss" scoped>
@import "../../style/project-GL/project-GL";
</style>