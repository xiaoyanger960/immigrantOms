<template>
  <div class="add-university">
    <div class="ap-content">
      <div class="ap-head-input" id='head'>
        <div class="avatar-pic-area" style="text-align: center">
          <div class="pic-1">
            <!--  @success="addImage"监听子组件的success事件  -->
            <ImageUpload width="150px" type="university" :image="default_img['university'][0]" @success="addImage" @delete="delImage('university', 0)"></ImageUpload>
          </div>
        </div>
        <div class="form-row">
          <Form :label-width="80" :model="university">
            <FormItem label="高校名称" prop="university_name">
              <Input v-model="university.university_name" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="高校地址" prop="address">
              <Input v-model="university.address" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="高校排名">
              <InputNumber :min="0" v-model="university.rank"></InputNumber>
            </FormItem>
          </Form>
        </div>
      </div>
      <div>
        <Form :label-width="80">
          <FormItem label="高校简介">
            <Input v-model="university.desc" :autosize="{minRows: 5}" type="textarea"></Input>
          </FormItem>
          <FormItem label="高校图片" class="PHOTO">
            <ImageUpload v-for="(item, index) in Array.from({length: product_attr['PHOTO'].length + 1})" width="320px" height="240px" type="PHOTO" :image="default_img['PHOTO'][index]"  @success="addImage" @delete="delImage('PHOTO', index)" :key="index"></ImageUpload>
          </FormItem>
          <FormItem v-if="edit_status">
            <button class="button is-info" type="button" @click="update">修改</button>
            <button class="button" type="button" @click="$router.go(-1)">取消</button>
          </FormItem>
          <FormItem v-else>
            <button class="button is-info" type="button" @click="submit">上传高校信息</button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import ImageUpload from '@/components/image-upload'
import {Tools} from '@/assets/js/common'
import HttpUrl from '@/assets/js/config'
export default {
  name: 'AddUniversity',
  components: { ImageUpload },
  data() {
    return {
      currentIdx: -1,
      edit_status: false,
      good: {}, //编辑时的传递来的数据
      university: {
        university_name: '',
        address: '',
        desc: '',
      },
      product_attr: {
        BADGE: [],
        PHOTO: []
      },
      default_img: {
        university:[''],
        BADGE: [''],
        PHOTO: ['']
      },
      delete_product_attr_ids: [],
      add_product_attr: {
        BADGE: [],
        PHOTO: []
      },
    }
  },
  mounted() {
    this.good = {};
    this.edit_status = false;
    //this.$route.query父路由向子路由传递的数据
    const { university_id } = this.$route.query;
    if (university_id) {
      this.edit_status = true;
      this.getUniversityDetail(university_id)
    } 
  },
  methods: {
    //获取单个商品信息
    getUniversityDetail(university_id) {
      Tools.callXNSHOPAPI('post', HttpUrl.UNIVERSITY_ITEM, {university_id}, (data) => {
        this.good = data.universityItem[university_id];
        this.loadGoodInfo();
      })
    },
    loadGoodInfo() {
      const { avatar, detail_image_list,  desc,  university_name, address} = this.good;
      this.university = { desc, university_name, address,};
      this.product_attr = {
        BADGE: [Object.assign({ attr_id: avatar.attr_id }, JSON.parse(avatar.attr_content))],
        PHOTO: detail_image_list.map(item => Object.assign({ attr_id: item.attr_id }, JSON.parse(item.attr_content)))
      }
      for (const key in this.product_attr) {
        const element = this.product_attr[key];
        this.default_img[key] = element.map(item => item.image_save_name);
      }
    },
    //监听子组件上传图片成功事件 传递来的参数是type和image对象
    addImage(type, image) {
      console.log(type,image)
        /*this.product_attr[type].push(JSON.stringify(image));
        if (this.edit_status) {
          this.default_img[type].push(image.image_save_name);
          this.add_product_attr[type].push(JSON.stringify(image));
        }     */ 
    },
    delImage(type, index) {
        const { attr_id, image_id } = this.product_attr[type][index];
        this.product_attr[type].splice(index, 1);
        if (this.edit_status) {
          this.default_img[type].splice(index, 1);
          if (attr_id) {
            this.delete_product_attr_ids.push(attr_id);
          } else {
            const index = this.add_product_attr[type].findIndex(item => item.image_id === image_id);
            this.add_product_attr[type].splice(index, 1)
          }
        }
    },
    checkForm() {
      let flag = true;
      for (const key in this.university) {
        const element = this.university[key];
      }
      if (flag && !Object.values(this.product_attr).some(item => item.length !== 0)) {
        Tools.toast('warning', '请完善高校图片信息')
        flag = false;
      }
      return flag;
    },
    submit() {
      const flag = this.checkForm();
      if (flag) {     
        const form = Object.assign({}, this.university, {product_attr: this.product_attr })
        Tools.callXNSHOPAPI('post', HttpUrl.ADD_UNIVERSITY, form, () => {
          Tools.toast('success', {content: '新建高校成功', duration: 2, onClose: () => this.$router.push('/university/manage')});
        });
      }
    },
    update() {
      const flag = this.checkForm();
      if (flag) {
        /*const { university_id, edit_data: form}, () => {
          Tools.toast('success', {content: '修改成功！', duration: 2, onClose: () => this.$router.push('/university/manage')});
        });*/
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@mixin container {
  background-color: #ffffff;
  padding: 20px;
}

.add-university {
  @include container;
  .ap-content {
    .ap-head-input {
      display: flex;
      .avatar-pic-area {
        width: 260px;
        .pic-2 {
          font-size: 0;
          margin-right: -4px;
          margin-left: -4px;
          &>div {
            font-size: 1rem;
            margin: 4px;
          }
        }
      }
      .form-row {
        flex: 1;
      }
    }
    .PHOTO {
      .image-upload {
        float: left;
        margin: 0 20px 20px 0;
      }
      .warn-tips {
        clear: both;
      }
    }
    .ivu-table tbody td > div{
      width: inherit;
    }
    .botton {
      width: 80px;
    }
  }
}
#head{
  margin-bottom: 20px;
}
@media screen and (min-width: 1508px) {
  .ap-content {
    padding: 20px 200px;
  }
}
</style>
<style>
.ql-container {
  height: 30em;
}
</style>

