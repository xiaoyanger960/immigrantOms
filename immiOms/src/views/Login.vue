<template>
  <div id="login" @keydown.enter="login">
    <div class="login-con">
      <Card style="padding: 0 20px">
        <h2 slot="title" class="login-header title is-2">
          <span class="text-primary">DIYimmigrant</span>
        </h2>
        <div class="login-form" >
          <input v-model="form.username" class="input" type="text" placeholder="请输入帐号">
          <input v-model="form.password" class="input" type="password" placeholder="请输入密码">
        </div>
        <div>
          <button id="login-btn" :class="['button', 'is-small', 'is-link', btn_loading ? 'is-loading' : '']" :disabled="btn_loading" @click="login">登录后台</button>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import {Tools} from '@/assets/js/common'
import HttpUrl from '@/assets/js/config'
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456789'
      },
      btn_loading: false,  
      remenber: false
    }
  },
  methods: {
    login() {
      this.btn_loading = true;
      const url =  HttpUrl.ROOT_LOGIN;
      const form = this.form;
      if(form.username){
          Tools.toast('success', '登陆成功！');
          this.btn_loading = false;
           Tools.CookieHelper.setToken('123456789', 'admin', 36000)
          this.$router.push({path: '/'})
      }else{
          this.btn_loading = false;
      }

      /*Tools.callXNSHOPAPI('post', url, form, (data) => {
        Tools.toast('success', '登陆成功！');
        const { token } = data;
        Tools.CookieHelper.setToken(token, form.username, 36000)
        Tools.CookieHelper.addLimitFlag(!flag);
        if (!flag) sessionStorage.setItem('shopInfo', JSON.stringify(data.shop_info));
        this.btn_loading = false;
        this.$router.push({path: '/'})
      }, () => {
        this.btn_loading = false;
      })*/
    },
  }
}
</script>
<style lang="scss">
#login {
  .login-con {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    margin: 0 auto;
    .login-header {
      text-align: center;
      line-height: 40px;
    }
    .login-form {
      input {
        height: 35px;
        line-height: 35px;
        margin-bottom: 1.5rem;
      }
    }
    #login-btn {
      width: 100%;
      height: 35px;
      font-size: 1rem;
      text-align: center;
    }
  }
}
</style>
