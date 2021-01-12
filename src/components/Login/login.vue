<template>
      <div class="login_body">
		<div class="login_background"></div>
		<div class="login-wrap">
			<h1 class="login-title" style="padding:40px 0;">测试页面</h1>
			<div class="login-type-wrap" style="margin: 0 40px 0 0;">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="code">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                
                
                </el-form>
			</div>
            <!-- <div class="login-main-right-btn" @click="onSubmit('ruleForm')">
            登&nbsp;&nbsp;&nbsp;&nbsp;录
            </div> -->
            <el-button  type="primary" @click="onSubmit('ruleForm')" style="padding: 10px 30px;">登录</el-button>
            <el-button @click="getprofessional">测试接口</el-button>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
data() {
      return {
        ruleForm: {
          name: '',
          code:''
        },
        rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           code: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
      },
      methods:{
        getprofessional(){
          this.$api.getprofessional({

          }).then(res=>{
            console.log(res)
          })
        },
          onSubmit(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            // if(!res){
            //   this.$message({
            //   message: '输入信息错误',
            //   type: 'warning'
            // });
            // }
            console.log('验证成功')
            
          } else {
            console.log('验证失败')
            return false;
            
          }
        });
      }
 }
}
</script>

<style>
.login_body{
    width: 100%;
    height: 100%;
    background: #1C77AC;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login_background{
    background: url(../../assets/img/background.png) no-repeat center;
    background-color: #1C77AC;
    background-size: 100% 100%;
    height: 100%;
    width: 300%;
    animation: cloud_three 100s linear infinite;
    transform: translate3d(0,0,0);
    position: absolute;
    top: 0;
    left: 0;
}
@-webkit-keyframes cloud_three{
    0%{
        left:0
    }
    100%{
        left:-100%
    }
}
@-moz-keyframes cloud_three{
    0%{
        left:0
    }
    100%{
        left:-100%
    }
}
@keyframes cloud_three{
    0%{
        left:0
    }
    100%{
        left:-100%
    }
}
.login-wrap{
    /* right: 15%; */
    margin: auto;
    width: 600px;
    height: auto;
    overflow: hidden;
    padding-bottom: 30px;
    text-align: center;
    background: #14547A;
    border-radius: 10px;
    z-index: 999;
}
</style>