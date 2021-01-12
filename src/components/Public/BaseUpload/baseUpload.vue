<template>
  <div class="upload-warp">
    <el-upload
      class="upload-demo"
      drag
      multiple
      ref="upload"
      :limit="limit"
      :data="uploadData"
      :on-exceed="handleDrop"
      :on-success="sendSuccess"
      :on-error="sendError"
      :accept="uploadType ? picAccept : allAccept"
      :action="url">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip"><span>* </span>请上传所需{{uploadType ? '图片，只允许图片格式，' : '材料，'}}且一次最多允许上传{{limit}}{{uploadType ? '张图片' : '个文件'}}</div>
    </el-upload>



  </div>
</template>

<script>
  import BaseButton from '../../Public/BaseButton/baseButton'
  import { mapState } from 'vuex'
  export default {
    name: "base-upload",
    props: {
      url: String,
      index: Number,
      uploadType: {
        type: Boolean,
        default: false
      },
      clearFiles: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 9
      }
    },
    data() {
      return {
        loading: false, 
        errorMessage: [],
        uploadData: {},
        allAccept: "",
        picAccept: "image/*",
      }
    },
    methods: {
    //   beforeAvatarUpload(file) {
    //   console.log(file)
	  //       const isJPG = file.type === 'image/xlsx';
	  //       // const isLt2M = file.size / 1024 / 1024 < 2;
	      	  
	  //       if (!isJPG) {
	  //         this.$message.error('上传头像图片只能是 xlsx 格式!');
	  //       }
	  //       // if (!isLt2M) {
	  //       //   this.$message.error('上传头像图片大小不能超过 2MB!');
	  //       // }
    //       // return isJPG && isLt2M;
	  //       return isJPG;
          
	  // },
			//超出上传文件个数
      handleDrop() {
        this.$message.error(`一次最多允许上传${this.limit}个文件`);
      },
      sendSuccess(response, info) {
				console.log(response, info)
        this.clearFiles && this.$refs.upload.clearFiles();
        this.$message.success(response.msg);
        this.loading = false;
        if (+this.index >= 0) {
          this.$emit('uploadItem', {
            index: this.index,
            response: response
          })
        } else {
          this.$emit('uploadItem', response)
        }

        this.$refs.upload.uploadFiles = this.$refs.upload.uploadFiles.filter((item) => {
          return item.uid !== info.uid
        });

      },
      sendError(err) {
        let message;
        if (err.message) {
          message = JSON.parse(err.message).msg + ',请重新上传'
        } else {
          message = '暂不支持该类型'
        }
        this.errorMessage.push(this.$message({
          showClose: true,
          duration: 0,
          message: message,
          type: 'error'
        }));
        this.loading = false;
      }
    },
    mounted() {
      this.uploadData = {
        project_id: this.projectId,
        step_id: this.menuId,
        token: this.token
      }
    },
    watch: {
      $route: {
        handler: function(val) {
          if (this.errorMessage.length === 0) return;
          this.errorMessage.map(item => item.close())
        },
        immediate: true
      }
    },
    computed: {
      ...mapState(['projectId', 'menuId', 'token'])
    },
    components: {
      BaseButton
    }
  }
</script>

<style scoped lang="scss">
  /*.upload-warp {*/
    /*width: 500px;*/
  /*}*/
  .sub-btn {
    display: inline-block;
    margin-top: 20px;
  }
  .el-icon-upload {
    margin-top: 50px;
  }
  .el-upload__tip {
    span {
      color: #ff0300;
    }
  }
</style>
