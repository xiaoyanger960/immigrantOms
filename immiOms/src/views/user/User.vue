<template>
  <div class="buyer">
    <div class="buyer-manage">
      <h4 class="title is-4">用户管理</h4>
      <div class="query-row margin-vertical-20">
        <label>用户查询：</label>
        <Select v-model="user_name" filterable clearable>
          <Option v-for="(item, index) in aUserList" :value="item.user_name" :key="index">{{ item.user_name }}({{ item.nick_name }})</Option>
        </Select>
        <button class="button is-info" @click="searchUser">查询</button>
      </div>
      <div class="table-row full-width">
        <table class="ivu-table">
          <thead>
            <th>用户姓名</th>
            <th>微信昵称</th>
            <th>手机号码</th>
            <th>联系邮箱</th>
            <th>毕业院校</th>
            <th>专业学科</th>
            <th>学位</th>
            <th>累计消费</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userList" :key="index">
              <td>{{ item.user_name }}</td>
              <td>{{ item.nick_name }}</td>
              <td>{{ item.mobile }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.university }}</td>
              <td>{{ item.subject }}</td>
              <td>{{ item.degree }}</td>
              <td>{{ item.payment}}</td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer margin-vertical-20">
          <Page :total="total" :current.sync="page" :page-size="20" show-elevator></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Tools} from '@/assets/js/common'
import HttpUrl from '@/assets/js/config'
export default {
  name: 'User',
  data() {
    return {
      userList: [{
                "open_id": "olx8H0UHfk3RrzTe4ofZBWzl8J-0",
                "nick_name": "小黄人",
                "user_name": "欧阳清",
                "avatar_url": "https://wx.qlogo.cn/mmopen/vi_32/wUMSLGCic1FOhTM5yV1Nw3S7txib7v0Fp0TPogtegNUeqvKS9t0OFxRiaqo27KgxtwReJmicUkeHl3FX2fxVVuZwmA/0",
                "gender": 2,
                "city": "Hangzhou",
                "province": "Zhejiang",
                "country": "China",
                "language": "zh_CN",
                "status": "NORMAL",
                "mobile": "13588235393",
                "email": "xiaoni960@163.com",
                "university": "杭州电子科技大学",
                "subject": "数字媒体技术",
                "degree": "本科",
                "payment": "0.01"
            },
            {
                "open_id": "olx8H0UHfk3RrzTe4ofZBWzl8J-0",
                "nick_name": "小样儿960",
                "user_name": "刘小倪",
                "avatar_url": "https://wx.qlogo.cn/mmopen/vi_32/wUMSLGCic1FOhTM5yV1Nw3S7txib7v0Fp0TPogtegNUeqvKS9t0OFxRiaqo27KgxtwReJmicUkeHl3FX2fxVVuZwmA/0",
                "gender": 2,
                "city": "Hangzhou",
                "province": "Zhejiang",
                "country": "China",
                "language": "zh_CN",
                "status": "NORMAL",
                "mobile": "13588235393",
                "email": "xiaoni960@163.com",
                "university": "杭州电子科技大学",
                "subject": "数字媒体技术",
                "degree": "本科",
                "payment": "0.01"
            }],
      aUserList: [ {
                "open_id": "olx8H0UHfk3RrzTe4ofZBWzl8J-0",
                "nick_name": "小黄人",
                "user_name": "欧阳清",
                "status": "NORMAL",
            },
            {
                "open_id": "olx8H0UHfk3RrzTe4ofZBWzl8J-0",
                "nick_name": "小样儿960",
                "user_name": "刘小倪",            
                "status": "NORMAL",            
            }],
      page: 1,
      user_name: '',
      total: 1
    }
  },
  mounted() {
    this.getUserNum();
    this.getUserList();
    this.getAUserList();
  },
  methods: {
    getUserList() {
      const params = this.user_name ? {conditions: {user_name: this.user_name}, page: this.page} : { page: this.page };
      Tools.callXNSHOPAPI('post', HttpUrl.USER_LIST, params, (data) => {
        console.log(data);
        this.userList = data.user_list;
      })
    },
    getAUserList() {
      Tools.callXNSHOPAPI('post', HttpUrl.AAUSER_LIST, {}, (data) => {
        this.aUserList = data.aa_user_list;
      })
    },
    getUserNum() {
      const params = this.user_name ? {conditions: {user_name: this.user_name}, page: this.page} : { page: this.page };
      Tools.callXNSHOPAPI('post',  HttpUrl.USER_NUM, params, (data) => {
        this.total = Number(data.total_num);
      })
    },
    searchUser() {
      this.page = 1;
      this.getUserNum();
      this.getUserList();
    },
  }
}
</script>
<style lang="scss" scoped>
@mixin container {
  background-color: #ffffff;
  padding: 10px;
}
.buyer {
  .buyer-manage {
    @include container;
    .query-row {
      height: 30px;
      line-height: 30px;
      label+div {
        width: 160px;
      }
      .button {
        vertical-align: middle;
      }
    }
  }
}
</style>

