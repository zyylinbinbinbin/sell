<template>
    <div class="background   animated lightSpeedIn">
      <!-- 面包屑 -->
	    	<div class="Breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/project-GL' }">项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>修改项目</el-breadcrumb-item>
          </el-breadcrumb>
        </div>    
        <!-- 基本信息 -->
        <div class="baiban">
          <base-title title="新增项目"></base-title>
          <div class="title">基本信息</div>
          
          <div class="Formdata">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div v-for="(item,index) in ruleForm.grathData" :key="index">
            <el-form-item label="项目名称" :prop="'grathData.' + index + '.summary'" :rules="rules.name">
              <el-input v-model="item.summary" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目负责人" :prop="'grathData.' + index + '.leader'" :rules="rules.name">
              <el-input v-model="item.leader" placeholder="请输入项目负责人"></el-input>
            </el-form-item>
            <el-form-item label="项目日期" :prop="'grathData.' + index + '.project_start'" :rules="rules.datetime">
              <el-date-picker
                v-model="item.project_start"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="职位" :prop="'grathData.' + index + '.position_default'" :rules="rules.position">
            <el-select v-model="item.position_default" placeholder="请选择职位" >
              <div v-for="(item,index) in position" :key="index">
                <el-option :label="item.label" :value="item.label"></el-option>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="项目内容"  :prop="'grathData.' + index + '.Evaluation_object'" :rules="rules.name">
              <el-input v-model="item.Evaluation_object" placeholder="请选择项目内容"></el-input>
            </el-form-item>
          <el-form-item label="委托单位"  :prop="'grathData.' + index + '.Organizational_unit'" :rules="rules.name">
              <el-input v-model="item.Organizational_unit" placeholder="请选择委托单位"></el-input>
            </el-form-item>
          <el-form-item label="项目金额"  :prop="'grathData.' + index + '.price'" :rules="rules.number">
            <el-input v-model="item.price"  placeholder="请选择项目金额"></el-input>
          </el-form-item>
          <el-form-item label="项目阶段:">
            <span class="shoum">项目接洽 一 采购阶段（含签订协议、招投标）一 签订协议 一 项目实施 一 项目交付 一 收到款项 一 项目总结 一 档案入库</span>
          </el-form-item>
          <el-form-item label="项目现阶段"   :prop="'grathData.' + index + '.process_default'" :rules="rules.stage">
            <el-select v-model="item.process_default"  placeholder="请选择项目现阶段" >
              <div v-for="(item,index) in process" :key="index">
                <el-option :label="item.label" :value="item.label"></el-option>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item>
            
          </el-form-item>
            </div>
        </el-form>
          </div>
        </div>
        <!-- 选择专家  -->
        <div class="baiban1">
            <div class="title1">选择专家</div>
            <el-radio-group class="yes" v-model="radio"  @change="changeradio">
              <span class="yesno">是否有选择专家:</span>
              <el-radio  label="1" border>是</el-radio>
              <el-radio  label="2" border>否</el-radio>
            </el-radio-group>
            <div >
              <div class="transfer">
              <el-transfer
                v-model="profession"
                filterable
                :titles="['未选专家', '已选专家']"
                :button-texts="['到左边', '到右边']"
                :format="{
                  noChecked: '${total}',
                  hasChecked: '${checked}/${total}'
                }"
                @change="handleChange"
                :data="professionals">
                <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
              </el-transfer>
            </div>

            <div class="select">
              <el-form ref="form"  label-width="100px">
              <el-form-item label="选择专家组长">
                <el-select v-model="profession_leader" placeholder="请选择专家组长" @change="change">
                   <el-option  v-for="(item,index) in professionals" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            </div>
            </div>
            <!-- 保存新增 -->
            <div class="preservation">
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </div>
        </div>
        
	</div>
</template>

<script>
import BaseTitle from "../Public/BaseTitle/baseTitle"

export default {
  components:{
    BaseTitle,
  },
    data(){
        var checkPwd = (rule, value, callback) => {
        if (!value) {
                    callback();
                } else {
                    var reg = /^-?\d{1,16}(?:\.\d{1,2})?$/;//小数点左边最高16位，小数点右边最多4位
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error("输入正确的数字,小数点后可1到2位"));
                    }
                }
            };
        return{
           ruleForm: {
              grathData:[]
              },
              rules: {
                name: [
                  { required: true, message: '请输入内容', trigger: 'blur' },
                ],
                region: [
                  { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                datetime: [
                  {  required: true, message: '请选择日期', trigger: 'change' }
                ],
                number: [
                //   { required: true, message: '请输入金额'},
                //   { type: 'number', message: '金额必须为数字值'}
                { validator: checkPwd, trigger: "blur" }
                ],
                stage: [
                  { required: true, message: '请选择内容', trigger: 'change' }
                ],
                position:[
                  { required: true, message: '请选择职位', trigger: 'change' }
                ],
                implementation:[
                  { required: true, message: '请选择实施对象', trigger: 'change' }
                ],
                cooperation:[
                  { required: true, message: '请选择合作对象', trigger: 'change' }
                ],
              } ,
              radio: '1',//是否
              process:[],//现阶段信息
              posi:[],//职位信息
              projectId:'',
              profession_leader:'',
              time:[],
              position:[],
              professionals:[],
              profession:[]
        }
    },
    computed:{

    },
    methods:{
      change(e){
        console.log(e)
      },
        Message(message){
            this.$notify({
                title: '提示',
                message: message,
                type: 'warning'
              });
        },
        //监听是否有选择专家
      changeradio(e){
        let that = this
         let t = that.ruleForm 
        if(e == 2){
          this.profession = []
          this.profession_leader = ''
        }
      },
      //获取选择专家信息
      changealter(){
        this.$api.getalter({
            id:this.projectId
        }).then(res=>{
          this.ruleForm.grathData = res.project_data
          let end = this.ruleForm.grathData[0].project_end
          let start = this.ruleForm.grathData[0].project_start
          this.time.push(start,end)
          this.ruleForm.grathData[0].project_start = this.time
          this.position = res.project_data[0].position
          this.process = res.project_data[0].process
          this.professionals = res.professionals
          this.profession = res.project_data[0].profession
          this.profession_leader = res.project_data[0].profession_leader
        })
      },

      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      //保存提交
       submitForm(formName) {
           let t = this.ruleForm.grathData[0]
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.radio == '1' && (this.profession_leader == '' || this.profession == '')){
                this.Message('请选择专家')
            }else{
                this.$api.postalter({
                  id:this.projectId,
                  summary:t.summary,//项目名称
                  leader:t.leader,//项目负责人
                  project_start:this.time[0],//开始时间
                  project_end:this.time[1],//结束时间
                  price:t.price,//金额
                  position:t.position_default,//职位
                  Evaluation_object:t.Evaluation_object,//内容
                  Organizational_unit:t.Organizational_unit,//单位
                  process:t.process_default,//现阶段
                  expert:this.profession_leader,//专家组长
                  profession:this.profession//已选专家
                }).then(res=>{
                    if(res.code == 200){
                       this.Message('修改成功')
                    }
                })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
        this.projectId = this.$route.query.id
        this.changealter()
    },
    created(){
      this.$store.state.adminleftnavnum="3";
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/project-Add/project-Add";
</style>