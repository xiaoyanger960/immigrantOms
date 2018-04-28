<template>
  <div>
    <div id="editor">此处是富文本</div>
  </div>
</template>
<script>
export default {
  name: 'editor',
}
/*
import E from 'wangeditor'
import { Tools } from '@/assets/js/common'
import { UPLOAD_IMAGE } from '@/assets/js/config'
export default {
  name: 'editor',
  props: ['type'],
  data() {
    return {
      editor: {}
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const self = this;
      const editor = new E('#editor');
      // editor.customConfig.onchange = (html) => {
      //   this.$emit('change', html);
      // };
      editor.customConfig.uploadImgServer = Tools.getDomain() + UPLOAD_IMAGE;
      editor.customConfig.uploadImgParams = {
        token: Tools.CookieHelper.getToken(),
        type: this.type
      };
      editor.customConfig.uploadImgMaxLength = 5;
      editor.customConfig.uploadFileName = 'file';
      editor.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          console.log(result);
          const { image_save_name } = result.data.image;
          self.$emit('success', self.type, result.data.image);
          insertImg(`${Tools.getDomain()}upload/${self.type}/${image_save_name}`);
        }
      };
      editor.customConfig.menus = [ 'image' ]
      editor.create();
      this.editor = editor;
    }
  }
}*/
</script>
<style lang="scss">

</style>
