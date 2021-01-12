<template>
  <div>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">
        <div class="conter">
        <div class="left1">
            <div class="leftimg">
                <!-- <img :src="imgSrc"  alt="头像"> -->
                <!-- <avatar :username="userInfoname" background-color="#DBE8E2" :color="getColor" class="Avatarimg" @click="getColors"></avatar> -->
                <!-- <img src="../../assets/img/default_avatar_64_64.jpg" alt=""> -->
                <!-- <div class="name">Hi~ {{userInfoname}}</div> -->
                <img src="../../assets/img/eupsun.png" alt="">
                    
            </div>
                <div class="lefttwo">
                    <!-- <el-menu background-color="#ffffff" :router="true" text-color="black" active-text-color="green" active-text-background-color="green" default-active="1" class="el-menu-vertical-demo"> -->
                    <el-menu background-color="#52AD7E"  text-color="#ffffff" active-text-color="#4FA781" active-text-background-color="green" :default-active="navselected" class="el-menu-vertical-demo" >
                    <el-menu-item :index="item.id+''"  v-for="item in menulist" :key="item.id" @click="pathid(item.id)">
                            <template slot="title">
                                <!-- <i class="iconsobj[item.id]"></i> -->
                                <i :class="item.icon" style=" margin-right: 5px;"></i>
                                <span style="font-size: 16px;">{{item.title}}</span>
                            </template>
                    </el-menu-item>
                    </el-menu>
                </div>
                <!-- <div class="output">
                    <i class="iconfont icontuichu"></i>
                    <span slot="title" @click="outputs">退出登录</span>
                </div> -->
                

        </div>
        
    </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="rightspan">
          <my-header class="header" />
          <div class="right1">
              <!-- 路由占位符 -->
            <router-view></router-view>
          </div>
        </div>
      </el-col>
  </el-row>
    
  </div>
</template>

<script>
  import myHeader from '../Public/Header/header'
  import { mapState,mapMutations,mapActions } from 'vuex'
  
  // import Avatar from 'vue-avatar'
export default {
    data(){
        return{
            //左侧菜单
        menulist:[
            {
                title:'首页',
                id:1,
                path:'/homepage',
                icon:'icon iconfont iconAdmin'
            },
            {
                title:'专家管理',
                id:2,
                path:'/expert-GL',
                icon:'icon iconfont iconAdmin'
            },
            {
                title:'项目管理',
                id:3,
                path:'/project-GL',
                icon:'icon iconfont iconAdmin'
            },
        ],
        
        // index:1,
        //存储侧边栏点击状态
        navtype:"horizontal",
        navselected:"1",

        userInfoname:'',
        }
    },
    watch: {
    //   $route: {
    //     handler: function(route) {
    //       if (this.menulist.length == 0) return;
    //       // 切换菜单
    //       this.toggleMenu(route);
    //     },
    //     immediate: true
    //   },
        // 监测store.state
        '$store.state.adminleftnavnum': 'getNavType'
    },
    methods:{
        ...mapMutations([ 'changeunscrambleId','changedoubtId','changeMenuId']),
        ...mapActions(['output']),
        getNavType(){
        this.navselected=this.$store.state.adminleftnavnum;
        // console.log(this.navselected,'这是存值')
        //store.state.adminleftnavnum里值变化的时候，设置navselected
        },
        selectItems(index){
        this.$store.state.adminleftnavnum=index;
        console.log(this.$store.state.adminleftnavnum,'')
        //按钮选中之后设置当前的index为store里的值。
        },
        pathid(id){
            let path = this.menulist[id-1].path
            // let path =this.menulist[0].path
            this.$router.push(path)
            this.changeMenuId(id)
        //     switch (id){
		// 	case 1:
		// 	this.$router.push('/homepage')
        //     break;
        //     case 2:
		// 	this.$router.push('/unscramble')
        //     break;
        //     case 3:
		// 	this.$router.push('/doubt')
        //     break;
        //     case 4:
		// 	this.$router.push('/metaphase')
        //     break;
        //     case 5:
		// 	// this.$router.push('/homepage')
        //     break;
        //     case 6:
		// 	// this.$router.push('/homepage')
        //     break;
        // }
        },
        
        getColors(){
          this.getColor()
        },
        toggleMenu(path){
            // console.log(path)
        },
        outputs(){
            this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.output();
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                })
        }
    },
    mounted(){
        this.userInfoname = JSON.parse(sessionStorage.getItem('token')).account
    },
    created(){
        
        // let unscrambleId = this.menulist.splice(1,1)[0].id
        // let doubtId = this.menulist.splice(1,2)[0].id
        // this.changeunscrambleId(unscrambleId)
        // this.changedoubtId(doubtId)
        // console.log(unscrambleId,doubtId)
    },
    components: {
      myHeader,
      // Avatar,
    },
    computed:{
      ...mapState(['userInfo']),
      imgSrc() {
        return this.userInfo ? this.userInfo.user.avatar128 : 'https://www.edtzk.com/Public/images/default_avatar_64_64.jpg'
      },
      getName() {
        // return this.userInfo ? this.userInfo.turename : '未登录'
      },
      
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/Home/home";
  .icon {
       color: #ffffff;
       font-size: 22px;
    }
</style>>
