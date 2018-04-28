<template>
  <div class="image-upload" :style="{ width: width, height: height || width, lineHeight: height || width }">
    <!-- imgUrl存在的时候才显示图片和删除图标 -->
    <div class="upload-content clearfix" v-show="imgUrl">
      <div class="img-wrapper">
        <img :src="imgUrl" alt="">
      </div>
      <div :class="['upload-cover', disabled ? 'has-disabled' : '']">
        <span class="icon" @click="delPic">
          <i class="fa fa-trash"></i>
        </span>
      </div>
    </div>
    <!-- 上传图片组件 imgUrl不存在时显示上传图标 支持拖拽 上传文件的字段名为file 接受上传的类型为图片 文件视频等会被过滤
         format接受的后缀名 :data上传时附带的额外参数 不显示上传文件列表 action上传的地址 -->
    <Upload
      v-show="!imgUrl"
      type="drag"
      name="file"
      :max-size="maxSize"
      accept="image/*"
      :format="['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp']"
      :data="{token: token, type: type}"
      :show-upload-list="false"
      :on-error="handleError"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :on-success="handleSuccess"
      :action="uploadUrl">
      <div>
        <span class="icon"><i class="fa fa-camera" style="color: #3399ff"></i></span>
      </div>
    </Upload>
  </div>
</template>
<script>
import {Tools} from '@/assets/js/common'
import HttpUrl from '@/assets/js/config'
export default {
  name: 'image-upload',
  //从父组件中传递来的数据 
  props: {
    width: {type: String, default: '100px'},
    height: {type: String},
    type: {type: String},
    image: {type: String},
    maxSize: {type: Number, default: 2048},
    disabled: {type: Boolean, default: false}
  },
  data() {
    return {
      //取代以前的语法 Tools.getDomain()+'upload/'+this.type+'/'+this.image
      imgUrl: this.image ? `${Tools.getDomain()}upload/${this.type}/${this.image}` : '',
      uploadUrl: Tools.getDomain() + HttpUrl.UPLOAD_IMAGE,
      token: Tools.CookieHelper.getToken(),
    }
  },
  watch: {
    image(newVal) {
      this.imgUrl = newVal ? `${Tools.getDomain()}upload/${this.type}/${newVal}` : '';
    }
  },
  mounted(){

  },
  methods: {
    //上传失败时的处理函数
    handleError(error) {
      Tools.toast('error', '上传图片失败!');
      console.error(error);
    },
    //上传格式错误时的处理函数
    handleFormatError() {
      Tools.toast('error', '上传图片格式错误!');
    },
    //尺寸超过大小时的处理函数
    handleMaxSize(file) {
      Tools.toast('error', `文件${file.name}超过限制大小，请上传小于2MB的图片`);
    },
    //上传成功时的处理函数
    handleSuccess(res, file) {
     // console.log(res);
     /*"code": "OK",
     "data": {
        "image": {
            "image_id": "8",
            "image_save_name": "b725bb1708a0c5c7a34d0c4d96583629.png",
            "image_hash": "b725bb1708a0c5c7a34d0c4d96583629",
            "upload_path": "PRODUCT_DETAIL"
        }
    }*/
      const { image_save_name } = res.data.image;
      this.imgUrl = `${Tools.getDomain()}upload/${this.type}/${image_save_name}`;
      this.$emit('success', this.type, res.data.image);
    },
    delPic() {
      this.imgUrl = '';
      this.$emit('delete');
    }
  }
}
</script>
<style lang="scss">
.image-upload {
  position: relative;
  display: inline-block;
  vertical-align: top;
  .img-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    background-color: #fff;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .upload-content {
    text-align: center;
    height: 100%;
  }
  .upload-cover {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
    background: rgba(0,0,0,.2);
  }
  .has-disabled {
    background: transparent;
  }
  .has-disabled .icon {
    display: none;
  }
  .icon {
    font-size: 1.5em;
    color: #fff;
    cursor: pointer;
  }
  &:hover .upload-cover {
    display: block;
  }
}
</style>
