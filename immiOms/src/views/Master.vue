<template>
<div class="layout">
  <Layout :style="{minHeight: '100vh'}">
    <!-- DIY后台管理系统头部 -->
    <Header :style="{background: '#fff',padding: 0,borderBottom: '1px solid #c1c1c1'}">
      <div class="user-info">
        <a><i class="fa fa-user"></i>管理员:{{ username }}</a>
        <a @click.stop="logout"><i class="fa fa-sign-out"></i>退出</a>
      </div>
      <div class="logo" :class="{'collapsed-menu': isCollapsed}" @click="$router.push('/')"><span class="text-primary"></span>DIYimmigrant</div>
      <!-- 点击可以合并侧边栏的按钮 -->
      <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
      <!-- 面包屑导航 -->
      <Breadcrumb :style="{display: 'inline-block',verticalAlign: 'top'}">
        <BreadcrumbItem v-for="(item,index) in $route.matched" :key="index">
          <a v-if="index < $route.matched.length - 1">{{item.name}}</a>
          <strong v-else>{{item.name}}</strong>
        </BreadcrumbItem>
      </Breadcrumb>
    </Header>
    <!-- DIY后台管理系统主体  -->
    <Layout>
      <!--  左侧导航 -->
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed" ref="side" hide-trigger>
        <Menu theme="dark" width="auto" :class="menuitemClasses" accordion>
          <template v-for="(router, j) in $router.options.routes[1].children">
            <Submenu :name="router.name" :key="j" v-if="router.visible">
              <template slot="title"><i :class="['fa', 'fa-'+router.icon]"></i><span>{{ router.name }}</span></template>
              <MenuItem v-for="(child, i) in router.children" :key="i" :name="child.name" style="padding: 0" v-if="child.hidden!=true">
                <router-link :to="{path: child.path}">{{ child.name }}</router-link>
              </MenuItem>
            </Submenu>
          </template>
        </Menu>
      </Sider>
      <Layout>
        <Content :style="{padding: '15px 15px 40px 15px',height: 'calc(100vh - 64px)', position: 'relative'}">
          <div class="main-content">
            <router-view></router-view>
          </div>
          <Icon type="load-d" size=48 id="spin-icon-load"></Icon>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</div>
</template>
<script>
import {Tools} from '@/assets/js/common'
import {USER_SHOP_LIST} from '@/assets/js/config'
export default {
  name: 'Master',
  data () {
    return {
      username: Tools.CookieHelper.getUsername(),
      //username:'xnliu',
      isCollapsed: false,
      shop: {},
    };
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    }
  },
  mounted() {
    console.log(this.$router);
  },
  methods: {
    collapsedSider() {
      this.$refs.side.toggleCollapse();
    },
    logout() {
      Tools.CookieHelper.clearToken();
      this.$router.replace({name: '登录'});
    }
  }
}
</script>
<style scoped>
.logo {
  width: 200px;
  float: left;
  height: 64px;
  line-height: 64px;
  color: #fff;
  font-size: 22px;
  background: #303b50;
  text-align: center;
  transition: width .2s ease-in-out;
}
.user-info {
  float: right;
  height: 64px;
  line-height: 64px;
  padding-right: 20px;
}
.user-info > a {
  color: #333;
  margin: 0 15px;
}
.user-info > a > .fa {
  margin-right: 5px;
}
.main-content {
  height: 100%;
  padding: 15px 20px 20px;
  overflow: auto;
}
.layout-con{
  height: 100%;
  width: 100%;
}
.menu-item span, .logo span{
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
  transition: width .3s ease;
}
.logo {
  cursor: pointer;
}
.logo span {
  letter-spacing: 2px;
  font-weight: bold;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  font-size: 16px;
  width: 20px;
  text-align: center;
}
.menu-item a {
  color: #a7b1c2;
  display: block;
  padding: 14px 24px 14px 52px;
}
.menu-item a.router-link-active {
  color: #fff;
}
.menu-icon{
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-90deg);
}
#spin-icon-load {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ani-spin 1.5s linear infinite;
  color: #2d8cf0;
  display: none;
}
@keyframes ani-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.collapsed-menu span {
  width: 0px;
  transition: width .3s ease;
}
.collapsed-menu i.fa{
  transform: translateX(5px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 22px;
}
.collapsed-menu a{
  padding: 10px;
}
div.collapsed-menu {
  width: 78px;
  transition: width .2s ease-in-out;
}
</style>
<style>
.ivu-layout-sider {
  background: #303b50!important;
}
.ivu-layout-sider .ivu-menu {
  background: #303b50!important;
}
.ivu-layout-sider .ivu-menu .ivu-menu-opened .ivu-menu{
  background: #434d69!important;
}
.ivu-layout-sider .ivu-menu .ivu-menu-opened .ivu-menu-submenu-title{
  background: #434d69!important;
}
.collapsed-menu i.ivu-icon{
  transform: scale(0);
  transition: transform .2s ease;
}
</style>
