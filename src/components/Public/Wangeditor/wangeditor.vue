<template>
  <div id="wangeditor" >
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>

<script>
  import E from "wangeditor";

  export default {
    name: "wangeditor",
    props: {
      index: Number,
      content: String
    },
    data() {
      return {
        editor: null,
        count: 0,
      };
    },
    watch: {
      // 修复乱跳问题
      content(val) {
        if (this.count === 0) {
          ++this.count;
          this.editor.txt.html(this.content);
        }
      },
      $route: {
        handler: function(route) {
          this.count = 0;
        },
        immediate: true
      }
    },
    mounted() {
      this.editor = new E(this.$refs.editorElem);
      this.editor.customConfig.uploadImgShowBase64 = true;
      this.editor.customConfig.fontNames = [
        '宋体',
        '黑体',
        '楷体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
      ];

      this.editor.customConfig.onchange = html => {
        if (this.index >= 0) {
          this.$emit('editorContent', {
            index: this.index,
            content: html
          });
        } else {
          this.$emit('editorContent', html);
        }
      };

      this.editor.create();
      this.editor.txt.html(this.content);
    }
  }
</script>

<style scoped>
#wangeditor {
  background-color: #fff;
}
</style>
