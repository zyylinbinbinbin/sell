<template>
  <div>
    <div  class="background  animated lightSpeedIn">
      <div class="block">
        <span class="demonstration">设置开始时间</span>
        <el-date-picker
          v-model="value3"
          value-format="timestamp"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">设置结束时间</span>
        <el-date-picker
          v-model="value4"
          value-format="timestamp"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <el-button @click="pick">测试时间格式</el-button>

      <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value1"
      type="daterange"
      value-format="timestamp"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        value3:'',
        value4:'',
        value1:''
    }
  },
  methods:{
    pick(){
      // this.value3,'开始时间',this.value4,'结束时间',
      console.log(this.value3,'开始时间',this.value4,'结束时间',)
      console.log(this.value1,'666666666666')
    },
  },
  created(){
      this.$store.state.adminleftnavnum="2";
    }
}
</script>

<style>

</style>