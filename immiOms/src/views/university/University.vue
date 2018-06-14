<template>
  <div class="product">
    <div class="product-manage">
      <div class="clearfix">
        <h4 class="title is-4 pull-left" id='addUni'>高校管理</h4>
        <button class="button is-info "   @click="$router.push('/university/add')">新建高校</button>
      </div>
      <div class="table-row full-width">
        <table class="ivu-table margin-vertical-20 collapse-table">
          <thead>
            <th width="100"></th>
            <th>高校名称</th>
            <th>高校排名</th>
            <th>高校地址</th>
            <th>介绍</th>
            <th>删除</th>
            <th>编辑</th>
          </thead>
          <tbody>
            <template v-for="(item, index) in universityList">
              <tr :key="index">            
                <td><img :src="item.badge_path | getImageUrl" class="avatar"></td>
                <td>{{ item.university_name }}</td>
                <td>{{ item.rank }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.desc }}</td>
                <td>
                   <a @click.stop="deleteUni(item.id)" class="margin-horizon-10 ">删除</a>
                </td>
                <td><router-link :to="{name: '新建高校', query: { university_id: item.id }}">编辑</router-link></td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="table-footer margin-vertical-20">
          <Page :total="total" :current.sync="page" :page-size="20" @on-change="getUniversityList" show-elevator></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Tools} from '@/assets/js/common'
import HttpUrl from '@/assets/js/config'
export default {
  name: 'University',
  data() {
    return {
      total: 1,
      page: 1,
      universityList: []
    }
  },
  mounted() {
    //this.getUniversityNum();
    this.getUniversityList();
  },
  methods: {
    getUniversityList() {
      const params =  { page: this.page };
      Tools.callXNSHOPAPI('post', HttpUrl.UNIVERSITY_LIST, params, (data) => {
        console.log(data);
        this.universityList = data;
      })
    },
    getUniversityNum() {
      const params =  { page: this.page };
      Tools.callXNSHOPAPI('post', HttpUrl.UNIVERSITY_NUM, params, (data) => {
        this.total = Number(data.total_num);
      })
    },
    deleteUni(id){
      this.$Modal.confirm({
        title: '提醒',
        content: '<p>确定删除该高校吗？</p>',
        onOk: () => {
          Tools.callXNSHOPAPI('post', HttpUrl.DELETE_UNIVERSITY, {university_id: id}, () => {
            Tools.toast('success', '删除成功!');
            this.getUniversityList();
          })
        }
      });
    }
  },
  filters: {
    getImageUrl(val) {
      var badge_path = val;
      if (badge_path) {
        badge_path=badge_path.replace(/\\/ig, '/');
        return `${Tools.showImgHost()}${badge_path}`
      }
      /*if (obj.hasOwnProperty('badge')) {
        return `${Tools.getDomain()}upload/${obj.upload_path}/${obj.image_save_name}`
      }*/
      return require('@/assets/image/default.png');
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin container {
  background-color: #ffffff;
  padding: 10px;
}
.product {
  .product-manage {
    @include container;
    h4 {
      padding: 3px 12px 0 0;
      margin: 0;
    }
    .query-row {
      line-height: 32px;
      .filed {
        display: inline-flex;
        margin-bottom: 5px;
        &>div {
          width: 200px;
          display: inline-block;
        }
        label {
          width: 100px;
          text-align: right;
        }
      }
      .btn-group {
        margin-left: 20px;
      }
      .button {
        vertical-align: middle;
        margin: 0 10px;
      }

    }
  }
        #addUni{
        margin-bottom:20px;
      }
  .table-row {
    .icon > i {
      color: #888;
    }
    .avatar {
      width: 60px;
      height: 60px;
      margin: 10px 0;
    }
    tr {
      transition: all .3s ease-in-out;
      td:first-child {
        text-align: right;
      }
    }
  }
}
</style>
