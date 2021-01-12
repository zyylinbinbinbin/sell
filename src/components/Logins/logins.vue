<template>
  <div class="login-warp">
    <div class="login-main">
      <div class="login-main-form">
        <div class="login-main-left">
          <img src="../../assets/img/login03.png">
          <p class="login-main-left-h1">公正 · 严谨 · 创新</p>
          <p class="login-main-left-h2">以评促建 · 以评促改 · 以评促管 · 以评促发展</p>
        </div>
        <div class="login-main-right">
          <div class="login-main-right-title">{{titleInfo.title}}</div>
          <div class="login-main-right-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <!-- <el-form-item prop="identity" class="login-form-item">
                <i class="iconfont iconshenfen"></i>
                <el-select v-model="ruleForm.identity" placeholder="请选择身份" clearable>
                  <template v-for="identity in identityList">
                    <el-option
                      :label="identity.name"
                      :value="identity.type"
                      :key="identity.type"
                    />
                  </template>
                </el-select>
              </el-form-item> -->
              <el-form-item prop="name" class="login-form-item">
                <i class="iconfont iconzhanghao"></i>
                <el-input v-model="ruleForm.name" placeholder="请输入您的账号" />
              </el-form-item>
              <el-form-item prop="pwd" class="login-form-item">
                <i class="iconfont iconmima"></i>
                <el-input class="pwd" v-model="ruleForm.pwd" :type="eyeActive ? 'text' : 'password'" placeholder="请输入您的密码" />
                <span class="el-icon-view eye" :class="{active: eyeActive}" @click="changeEye"></span>
              </el-form-item>

              <el-form-item prop="codevalue" class="login-form-item login-code">
                <div class="login-form-item-code-left">
                  <i class="iconfont iconyanzhengma"></i>
                  <el-input v-model="ruleForm.codevalue" placeholder="请输入验证码" />
                </div>
                <div class="login-form-item-code-right" @click="getVerify">
                  <img :src="codeImg" alt="加载验证码">
                </div>
              </el-form-item>

            </el-form>
          </div>
          <div class="login-main-right-reg">暂无账号？点击<span @click="goToReg"> "注册账号"</span></div>
          <div class="login-main-right-btn" @click="onSubmit('ruleForm')">
            登&nbsp;&nbsp;&nbsp;&nbsp;录
          </div>
          <div class="login-main-right-other">
            <p>
              如有疑问请通过以下方式联系工作人员：<br>
              电话：13926081083（微信同号）<br>
              <!-- QQ：2850971034 <br> -->
              邮箱：gaoyh@eupsun.com.cn
            </p>
            
          </div>
        </div>
      </div>
    </div>
    <my-footer class="login-footer" :footer-list="footerList" />
  </div>
</template>

<script>
  import MyFooter from '../Public/Footer/footer'
  import { mapActions } from 'vuex'
  export default {
    name: "login",
    data() {
      return {
        footerList: ['版权所有：广州市晨旭教育评估有限公司','投诉及意见反馈：gaoyh@eupsun.com.cn'],
        otherInfo: [],
        identityList: [],
        eyeActive: false,
        titleInfo: {
          title: '',
          h1: '',
          h2: ''
        },
        codeImg: '',
        ruleForm: {
          identity: '',
          name: 'username1',
          pwd: '123456',
          codevalue: ''
        },
        rules: {
          identity: [
            { required: true, message: '请选择身份', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入您的账号', trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请输入您的密码', trigger: 'blur' },
          ],
          codevalue: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      ...mapActions(['login', 'verifyCode']),
      goToReg() {
        // this.$router.push({
        //   name: 'register'
        // })
        this.$message.warning('暂未开放此功能');
      },
      
      onSubmit(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let res = await this.login(this.ruleForm);
            if(res){
              if (res.code == 200) {
              this.$message.success(res.msg);
              // console.log(res)
                            window.sessionStorage.setItem('token', JSON.stringify(res.session_user)) //存储token
              this.$router.push('/homepage')
            }
            } else {
              this.getVerify();
            }
          } else {
            return false;
          }
        });
      },

     
      async getVerify() {
        this.codeImg = await this.verifyCode();
      },
      changeEye() {
        this.eyeActive = !this.eyeActive;
      },
    },
    mounted() {
      this.getVerify();
    },
    components: {
      MyFooter,
    }
  }
</script>

<style scoped lang="scss">
.login-warp {
  height: 100%;
  background-color: rgba(64, 140, 226, 0.2);
  .login-main {
    width: 100%;
    height: 650px;
    background-color: #409EFF;
    background-image: url("../../assets/img/login02.png");
    background-size: cover;
    .login-main-form {
      display: flex;
      justify-content: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -55%);
      .login-main-left {
        position: relative;
        width: 600px;
        height: 650px;
        text-align: center;
        background-color: #fff;
        box-shadow: 4px 0 10px 0 rgba(64,140,226,0.2);
        border-radius: 10px 0 0 10px;
        box-sizing: border-box;
        z-index: 3;
        img {
          width: 234px;
          height: 234px;
          margin-top: 48px;
        }
        .login-main-left-h1 {
          font-size: 30px;
          padding: 30px 0 20px;
          color: #409EFF;
          font-weight: 700;
        }
        .login-main-left-h2 {
          font-size: 20px;
          color: #B5D9FF;
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 235px;
          background-image: url("../../assets/img/login01.png");
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
      .login-main-right {
        width: 580px;
        height: 650px;
        background-color: #fff;
        border-radius: 0 10px 10px 0;
        box-sizing: border-box;
        .login-main-right-title {
          min-height: 30px;
          padding: 50px 60px 40px;
          text-align: center;
          font-size: 30px;
          color: #409EFF;
          font-weight: 700;
        }
        .login-main-right-form {
          width: 400px;
          margin-left: 90px;
          .login-form-item {
            position: relative;
            i {
              position: absolute;
              padding: 0 20px;
              line-height: 46px;
              font-size: 22px;
              color: #CECECE;
              z-index: 999;
              &::after {
                position: absolute;
                content: '';
                height: 24px;
                right: 0;
                top: 11px;
                border-right: 1px solid #CECECE;
              }
            }
            .eye {
              position: absolute;
              right: 0;
              top: 0;
              padding: 0 20px;
              line-height: 46px;
              font-size: 22px;
              color: #CECECE;
              cursor: pointer;
              &.active {
                color: $blue;
              }
            }
            &.login-code {
              .login-form-item-code-right {
                width: 128px;
                height: 40px;
                margin-left: 10px;
                background-color: rgba(240,243,247,0.95);
                img {
                  width: 128px;
                  height: 40px;
                }
              }
            }
          }
        }
        .login-main-right-reg {
          margin-left: 90px;
          color: #CECECE;
          span {
            color: #409EFF;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .login-main-right-btn {
          width: 400px;
          height:58px;
          line-height: 58px;
          margin: 30px 0 20px 90px;
          background-color: rgba(64,158,255,1);
          border-radius:29px;
          text-align: center;
          color: #fff;
          font-weight: 700;
          font-size: 22px;
          cursor: pointer;
          transition: background-color .3s linear;
          &:hover {
            background-color: rgba(62, 139, 232, 0.95);
          }
        }
        .login-main-right-other {
          width: 400px;
          margin-left: 90px;
          padding-top: 15px;
          border-top: 1px solid #CECECE;
          p {
            font-size: 16px;
            line-height: 24px;
            color: #CECECE;
          }
        }
      }
    }
  }
  .login-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
