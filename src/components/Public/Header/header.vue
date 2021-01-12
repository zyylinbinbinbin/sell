<template>
  <div class="header-warp">
    <div class="header-main">
      <div class="header-content">
        专家管理系统
      </div>
      <ul class="header-other">
        <!-- <router-link to='/major' tag="li" >
          <div class="icon iconfont icon-qiehuanliebiao"></div>
          <span style="padding: 0 10px 0 0;">切换专业</span>
        </router-link>
        <router-link to='/projectFlowMain' tag="li" :class="{active: active === 'projectFlow'}">
          <div class="icon iconfont icon-xiaoxi"></div>
          <span style="padding: 0 10px 0 0; color: black;">消息</span>
        </router-link> -->
        <li>
          <el-dropdown @command="handleCommand">
            <div class="avatar-li">
              <img :src="imgSrc" alt="头像">
              <!-- <img src="../../../assets/img/a1.png" alt=""> -->
              <span class="name">{{getName}}</span>
            </div>
            
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="login" v-notLogin>登录账号</el-dropdown-item> -->
              <!-- <el-dropdown-item command="outside">评估系统</el-dropdown-item> -->
              <el-dropdown-item command="output">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
        active: this.$route.name,
        userInfoname:''
      }
    },
    methods: {
      ...mapActions(['output']),
      handleCommand(command) {
        switch (command) {
          case 'login':
            this.$router.push({name: 'login'});
            case 'outside':
            // this.myname = JSON.parse(sessionStorage.getItem('token'));
            this.myname = sessionStorage.getItem('token')
            if(this.myname){
              // let URL = 'http://localhost:8080/#/'
            let URL = 'http://localhost:8080/#/?objData='+JSON.stringify(this.myname);
            window.location.href = URL
            }else{
              false
            }
            break;
          case 'output':
            this.output();
            // this.$router.push({name: 'login'});

        }
      },
      
    },
    mounted(){
        this.userInfoname = JSON.parse(sessionStorage.getItem('token')).account
    },
    computed: {
      ...mapState(['userInfo']),
      imgSrc() {
        return this.userInfo ? this.userInfo.user.avatar128 : 'https://www.edtzk.com/Public/images/default_avatar_64_64.jpg'
      },
      getName() {
        return this.userInfoname ? this.userInfoname : '未登录'
      }
    },
    watch: {
      $route(val) {
        this.active = val.name;
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../../../style/Header/header";
</style>
