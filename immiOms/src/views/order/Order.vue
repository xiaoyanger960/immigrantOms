<template>
  <div class="order">
    <div class="order-manage">
      <h4 class="title is-4">订单列表</h4>
      <div class="table-row full-width">
        <table class="ivu-table collapse-table">
          <thead>
            <th width="150">订单编号</th>
            <th>下单时间</th>
            <th>移民类型</th>
            <th>论文数量</th>
            <th>引用数量</th>
            <th>评论数量</th>
            <th>下单用户</th>
            <th>微信昵称</th>
            <th>订单状态</th>
            <th>操作</th>
          </thead>
          <tbody>
            <template v-for="(item, index) in orderList" >
              <tr :key="index">
                <td>{{ item.order_sn }}</td>               
                <td>{{ item.order_time }}</td>
                <td>{{ item.immigration_type }}</td>
                <td>{{ item.publication}}</td>
                <td>{{ item.citation }}</td>
                <td>{{ item.review }}</td>
                <td>{{ item.review }}</td>
                <td>{{ item.review }}</td>
                <td>
                  <span v-show="item.status=='INIT'">待付款</span>
                  <span v-show="item.status=='PAID'">待服务</span>
                  <span v-show="item.status=='SERVICED'">已服务</span>
                  <span v-show="item.status=='CANCELLED'">已取消</span>
                </td>
                <td>
                  <template >
                    <a @click="served(index,item.order_id)" v-show="item.status=='PAID'">完成服务</a>
                    <a @click="deleteOrder(index)" v-show="item.status=='SERVED'">删除</a>
                  </template>                  
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="table-footer margin-vertical-20">
        <Page :total="total" :current.sync="query.page" :page-size="query.page_size" @on-change="getOrderList" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
import {Tools} from '@/assets/js/common'
import HttpUrl from '@/assets/js/config'
export default {
  name: 'Order',
  data() {
    return {
      orderList: [],    
      query: {
        page: 1,
        page_size: 20
      },
      total: 2
    }
  },
  mounted() {
      //this.getOrderNum();
      this.getOrderList();
  },
  methods: {
    getOrderList() { 
      const params=''
      Tools.callXNSHOPAPI('post',  HttpUrl.ORDER_LIST, params, (data) => {
        console.log(data);
        this.orderList = data.order_list;
      })
    },
    getOrderNum() { 
      const params=''
      Tools.callXNSHOPAPI('post', HttpUrl.ORDER_NUM, params, (data) => {
        this.total = Number(data.total_num);
      })
    },
    served(index, id) {
       this.$Modal.confirm({
        title: '服务',
        content: '<p>确认已经服务了吗？</p>',
        onOk: () => {
          const order_id = id;
          Tools.callXNSHOPAPI('post', HttpUrl.CHANGE_ORDER_STATUS, { order_id:order_id,new_status:'SERVICED'}, () => {
            Tools.toast('success', '订单状态已更改为已服务！');
            this.getOrderList();
          })
        }
      })
    },
    deleteOrder(index, idx) {
      this.$Modal.confirm({
        title: '关闭',
        content: '<p>确认删除订单？</p>',
        onOk: () => {
          const order_id = idx || index;
          Tools.callXNSHOPAPI('post', HttpUrl.DELETE_ORDER, { order_id }, () => {
            Tools.toast('success', '删除订单成功！');
            this.getOrderList();
          })
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
@mixin container {
  background-color: #ffffff;
  padding: 10px;
}
.order {
  .order-manage {
    @include container;
    .query-row {
      line-height: 32px;
      .filed {
        display: inline-block;
        &:nth-child(-n+4) {
          margin-bottom: 5px;
        }
        label {
          width: 100px;
          display: inline-block;
          text-align: right;
        }
        label+div {
          width: 200px;
          display: inline-block;
        }
      }
      .btn-group {
        margin-left: 30px;
      }
      .button {
        vertical-align: middle;
        margin: 0 10px;
      }
    }
    .have-no-paid {
      color: #ccc;
    }
  }
  .modal {
    .modal-card {
      width: 440px;
    }
  }
}
</style>
