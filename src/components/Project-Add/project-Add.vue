<template>
    <div class="background   animated lightSpeedIn">
      <!-- 面包屑 -->
	    	<div class="Breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/project-GL' }">项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增项目</el-breadcrumb-item>
          </el-breadcrumb>
        </div>    
        <!-- 基本信息 -->
        <div class="baiban">
          <base-title title="新增项目"></base-title>
          <div class="title">基本信息</div>
          
          <div class="Formdata">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请选择项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目负责人" prop="name">
              <el-input v-model="ruleForm.person" placeholder="请选择项目负责人"></el-input>
            </el-form-item>
            <el-form-item label="项目日期"  prop="datetime">
              <el-date-picker
                v-model="ruleForm.datetime"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="职位" prop="position">
            <el-select v-model="ruleForm.position" placeholder="请选择职位" >
              <div v-for="(item,index) in posi" :key="index">
                <el-option :label="item.label" :value="item.value"></el-option>
              </div>
            </el-select>
          </el-form-item>
            <el-form-item label="项目内容" prop="name">
              <el-input v-model="ruleForm.Evaluation_object" placeholder="请选择项目内容"></el-input>
            </el-form-item>
          <el-form-item label="委托单位" prop="name">
              <el-input v-model="ruleForm.cooperation" placeholder="请选择委托单位"></el-input>
            </el-form-item>
          <el-form-item label="项目金额" prop="number">
            <el-input v-model="ruleForm.number"  placeholder="请选择项目金额"></el-input>
          </el-form-item>
          <el-form-item label="项目阶段:">
            <span class="shoum">项目接洽 一 采购阶段（含签订协议、招投标）一 签订协议 一 项目实施 一 项目交付 一 收到款项 一 项目总结 一 档案入库</span>
          </el-form-item>
          <el-form-item label="项目现阶段"  prop="stage" >
            <el-select v-model="ruleForm.stage"  placeholder="请选择项目现阶段" >
              <div v-for="(item,index) in process" :key="index">
                <el-option :label="item.label" :value="item.value"></el-option>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item>
            
          </el-form-item>
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
                v-model="ruleForm.value"
                filterable
                :titles="['未选专家', '已选专家']"
                :button-texts="['到左边', '到右边']"
                :format="{
                  noChecked: '${total}',
                  hasChecked: '${checked}/${total}'
                }"
                @change="handleChange"
                :data="ruleForm.dataz">
                <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
              </el-transfer>
            </div>

            <div class="select">
              <el-form ref="form"  label-width="100px">
              <el-form-item label="选择专家组长">
                <el-select v-model="ruleForm.expert" placeholder="请选择专家组长">
                  <div v-for="(item,index) in ruleForm.dataz" :key="index">
                   <el-option :label="item.label" :value="item.key"></el-option>
                  </div>
                </el-select>
              </el-form-item>
            </el-form>
            </div>
            </div>
            <!-- 保存新增 -->
            <div class="preservation">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
              name: '',//项目名称
              person:'',//项目负责人
              datetime:'',//起始时间
              number:'',//金额
              position:'',//职位
              implementation:'',//实施对象
              cooperation:'',//合作对象
              stage:'',//现阶段
              expert:'',//专家组长
              dataz:[],//左边的数据容器
              value: [],//右边的数据容器
              Evaluation_object:'',//内容
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
                  // { required: true, message: '请输入金额'},
                  // { type: 'number', message: '金额必须为数字值'}
                  { required: true, validator: checkPwd, trigger: "change" }
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
      
        }
    },
    computed:{

    },
    methods:{
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
          t.value = []
          t.expert = ''
        }
      },
      //获取选择专家信息
      addproject(){
        this.$api.getaddproject({

        }).then(res=>{
          this.ruleForm.dataz = res.professionals
          this.process = res.process.process
          this.posi = res.position.position
          // console.log(this.ruleForm.dataz)
        })
      },

      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      //保存提交
       submitForm(formName) {
          let that = this
         let t = that.ruleForm 
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.radio == '1' && (t.value == '' || t.expert == '')){
                this.Message('请选择专家')
            }else{
                this.$api.postaddproject({
                  summary:t.name,
                  leader:t.person,
                  project_start:t.datetime[0],
                  project_end:t.datetime[1],
                  price:t.number,
                  position:t.position,
                  Evaluation_object:t.Evaluation_object,
                  Organizational_unit:t.cooperation,
                  process:t.stage,
                  expert:t.expert,
                  profession:t.value
              }).then(res=>{
                if(res.code == 200){
                  this.Message('新增成功')
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
      this.addproject()
    },
    created(){
      this.$store.state.adminleftnavnum="3";
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/project-Add/project-Add";
</style>