<template>
<div v-loading="loading"
	element-loading-text="获取数据中..."
	element-loading-spinner="el-icon-loading"
	element-loading-background="rgba(0, 0, 0, 0.2)">
  <div class="background  animated ">
    <!-- lightSpeedIn -->
    <el-row>
    <el-col :span="12">
      <div class="survey">
        <div class="baiban">
           <base-title title="数据概况"  yuanwidth="20px"></base-title>
           <div class="aimh">
             <el-col :span="12">
                <div class="aimhs"></div>
             </el-col>
             <el-col :span="12">
                 <div class="aimhz"></div>
             </el-col>
           </div>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="list">
        <div class="baiban">
          <base-title title="专家列表" yuanwidth="20px"></base-title>
          <div class="listimage" v-if="iconsobj.length > 0">
            <div v-for="(item,index) in iconsobj" :key="index" class="imgT">
            <div class="animated rotateIn">
              <img :src="$config.baseIMG + item.imgname">
              <div class="name">{{item.name}}</div>
            </div>
          </div>
            <div class="more" v-if="iconsobj.length >= 12">查看更多专家>></div>
          </div>
        <nothing title="暂无数据" v-else></nothing>
        </div>
      </div>
    </el-col>
  </el-row>

    <div class="information">
     <div class="baiban1">
          <base-title title="项目信息" ></base-title>
      <div>
        <base-table  :loading="filledLoading" :validLength="validLength"  class="tables">
              <template slot="tableHead">
                <el-col :span="1"><div>序号</div></el-col>
                <el-col :span="6"><div>项目名称</div></el-col>
                <el-col :span="5"><div>合作单位</div></el-col>
                <el-col :span="3"><div>负责人</div></el-col>
                <el-col :span="3"><div>开始时间</div></el-col>
                <el-col :span="3"><div>结束时间</div></el-col>
                <el-col :span="2"><div>项目总额</div></el-col>
                <el-col :span="3"><div>项目进度</div></el-col>
              </template>
              <template slot="tableMain">
                <div v-for="(item,index) in levellist" :key="index" class="animated pulse">
                  <!-- <div v-for="(item,k) in t.child" :key="k"> -->
                    <transition
                    name="fade2"
                    enter-active-class="animated fadeIn fast"
                    leave-active-class="animated fadeOut fast"
                  >
                    <el-row class="tr table-main">
                      <el-col :span="1">
                          <span>{{item.id}}</span>
                      </el-col>
                      <el-col :span="6" >
                           <span>{{item.summary}}</span>
                      </el-col>
                      <el-col :span="5" >
                           <span>{{item.Organizational_unit}}</span>
                      </el-col>
                      <el-col :span="3">
                        <div class="title">
                          <span>{{item.leader}}</span>
                        </div>
                        <div ></div>
                      </el-col>
                      <el-col :span="3">
                        <span>{{item.project_start | formatTime('Y-M-D')}}</span>
                      </el-col>
                      <!-- {{item.project_start | formatTime('Y年M月D日 h:m:s')}} -->
                      <el-col :span="3">
                        <div class="filter-content">
                           <span>{{item.project_end | formatTime('Y-M-D')}}</span>
                        </div>
                      </el-col>
                      <el-col :span="2">
                        <span class="money">{{item.price}}</span>
                      </el-col>
                      <el-col :span="3">
                         <div style="text-align: left;">
                           <el-progress :percentage="item.process_percent" :stroke-width="11" status="success"  v-if="item.process_percent == 100"></el-progress>
                            <el-progress :percentage="item.process_percent" :stroke-width="11" v-else></el-progress>
                         </div>
                      </el-col>
                    </el-row>
                  </transition>
                <!-- <el-backtop></el-backtop> -->
                <!-- </div> -->
                </div>
              </template>
            </base-table>
      </div>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
        background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[2,4,6,8]"
          :page-size="8"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      
    </div>
     
      
    
  </div>
  </div>
</template>

<script>
import store from '../../store/index'
import BaseTitle from "../Public/BaseTitle/baseTitle"
import image from "../../assets/img/user.jpg"
import BaseTable from "../Public/BaseTable/baseTable";
import Nothing from '../Public/Nothing/nothing'

export default {
  components:{
    BaseTitle,
    BaseTable,
    Nothing,
  },
  data(){
    return{
      homedisplaylist:[],
      displaymessageunfinlist:[],
      displaymessageendlist:[],
      loading:false,
      filledLoading:false,
      load:'',
      moresix:false,
      currentPage4: 1,//初始页
      page:1,//    每页的数据
      total: 0,
      pagesize: [10,20,30,40], //每页几条
      levellist:[],
      iconsobj:[],
      iconsobjs:[
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
            {
              img:image,
              name:'张三'
            },
        ],
        levellists:[
          {
            level:'佛山市示范专业中期检查项目',
            name:'吴鹏',
            time:'2020-09-20',
            times:'2021-08-20',
            speed:80,
            Company:'晨旭教育评估有限公司',
            money:'100'
          },
          {
            level:'佛山市示范专业中期检查项目',
            name:'吴鹏',
            time:'2020-09-20',
            times:'2021-08-20',
            speed:80,
            Company:'晨旭教育评估有限公司',
            money:'100'
          },
          {
            level:'佛山市示范专业中期检查项目',
            name:'吴鹏',
            time:'2020-09-20',
            times:'2021-08-20',
            speed:100,
            Company:'晨旭教育评估有限公司',
            money:'100'
          },
          {
            level:'佛山市示范专业中期检查项目',
            name:'吴鹏',
            time:'2020-09-20',
            times:'2021-08-20',
            speed:80,
            Company:'晨旭教育评估有限公司',
            money:'100'
          },
          {
            level:'佛山市示范专业中期检查项目',
            name:'吴鹏',
            time:'2020-09-20',
            times:'2021-08-20',
            speed:100,
            Company:'晨旭教育评估有限公司',
            money:'100'
          },
          {
            level:'佛山市示范专业中期检查项目',
            name:'吴鹏',
            time:'2020-09-20',
            times:'2021-08-20',
            speed:60,
            Company:'晨旭教育评估有限公司',
            money:'100'
          },
          {
            level:'佛山市示范专业中期检查项目',
            name:'吴鹏',
            time:'2020-09-20',
            times:'2021-08-20',
            speed:90,
            Company:'晨旭教育评估有限公司',
            money:'100'
          },
          {
            level:'佛山市示范专业中期检查项目',
            name:'吴鹏',
            time:'2020-09-20',
            times:'2021-08-20',
            speed:30,
            Company:'晨旭教育评估有限公司',
            money:'100'
          },
        ]
    }
  },
  methods:{
    //一页有几条
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.getlist()
      },
      //当前第几页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.getlist()
      },
      getlist(){
        this.$api.getindex({
          page:this.page,
          pagesize:this.pagesize
        }).then(res=>{
          if(res){
            this.levellist = res.project_list
            this.iconsobj = res.profession_list
            this.total = res.project_num
          }
        })
      },
    unscramble(id){
      this.$router.push('/unscramble')
      // this.$router.push({
      //     name: 'unscramble',
      //     params: {
      //       id: id
      //     }
      //   })
    },
    
  },
  mounted(){
    // console.log(store.state.unscrambleId,'我的unscrambleId的id')
    // console.log(store.state.doubtId,'我的doubtId的id')
    // console.log(store.state.menuId)
    this.getlist()
  },
   computed:{
       validLength() {
         return this.levellist.length !== 0;
       },
     },
  created(){
    this.$store.state.adminleftnavnum="1";

  }
}
</script>

<style lang="scss" scoped>
@import "../../style/Homepage/homepage";

</style>>
