<template>
    <div>
        <el-card  :style="{'height':height}">
            <el-row>
                <el-col>
                  <div class="content-details"  v-for="(item,index) in displaymessageunfinlist" :key="index" >
                    <div class="content-time">
                      <div class="content" v-html="item.title"></div>

                      <div class="details" @click="doubt(item.id)">查看详情</div>
                      
                    </div>
                    <div class="time">{{item.c_time | formatTime('Y-M-D h:m:s')}}</div>
                    <el-divider></el-divider>
                  </div>
                  <div class="more" @click="doubt">查看更多>></div>
                </el-col>
              </el-row>
            </el-card>
        
    </div>
</template>

<script>
export default {
    name:'base-content',
    props:{
        displaymessageunfinlist:Array,
        height:{
          type:String,
          default:'23.25rem'
        }
    },
    
    methods:{
        doubt(id){
        this.$emit('doubt',id)
      },
    }
}
</script>

<style lang="scss" scoped>
.content-details{
        padding: 0 20px;
        font-size: 16px;
        .content-time{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            font-size: 16px;
            .content{
                width: 80%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                font-weight: 600;
            }
            .content:hover{
                color: #348F6C;
            }
        }
    }
    .more{
    text-align: center;
    color: #348F6C;
  }
 .details{
        background-color: #FF9E58;
        border-radius: 15px;
        color: #ffffff;
        font-size: 14px;
        padding: 8px 25px;
    }
    .time{
        padding: 10px 20px 0 20px;
        color: #999999;
    } 
    .adetails{
        background-color: #FF9E58;
        border-radius: 15px;
        color: #ffffff;
        font-size: 14px;
        padding: 8px 30px;
    }
    .bdetails{
        background-color: #348F6C;
        border-radius: 15px;
        color: #ffffff;
        font-size: 14px;
        padding: 8px 30px;
    }
    .cdetails{
        background-color: #CECECE;
        border-radius: 15px;
        color: #ffffff;
        font-size: 14px;
        padding: 8px 30px;
    }
</style>>
