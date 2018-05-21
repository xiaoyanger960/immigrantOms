import Cookies from "js-cookie";
import axios from "axios";
import qs from "qs";
import { Message, Spin } from "iview";

export const Tools = {
        apiUrlBase:'http://localhost:8088/immigrantApi/index.php/',
        /*apiUrlBase: (process.env.NODE_ENV === 'development' ? 'http://localhost:8088/immigrantApi/index.php/' : ''),*/
        callXNSHOPAPI: function (method, url, data, callbackForOK, callbackForFail, callbackForAlways) {
            let data_with_token = Object.assign({token: Tools.CookieHelper.getToken()}, data);
            if (method === 'get') {
                let a1 = [];
                for (let field in data) {
                    if (!data.hasOwnProperty(field)) continue;
                    a1.push(field + "=" + encodeURIComponent(data[field]))
                }
                url = url + "?" + a1.join("&");
            }
            axios({
                method: method,
                url: Tools.apiUrlBase + url,
                data: qs.stringify(data_with_token)
            }).then(function (response) {
                //console.log(response);
                if (response.data.code === 'OK') {
                    if (callbackForOK) {
                        callbackForOK(response.data.data);
                    }
                } else {
                    if (response.status === 403) {
                        //goto login
                        console.log("token invalidated -> logout");
                        Tools.CookieHelper.setToken(null);
                        window.location.href = "/login";
                        return;
                    }
                    Tools.toast('error', response.data.data || 'error');
                    if (callbackForFail) {
                        callbackForFail(response.data.data, response);
                    }
                }
            }).catch(function (error) {
                if (error.response) {
                    //请求已发出，但服务器使用状态代码进行响应
                    //落在2xx的范围之外
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    if (error.response.status === 403) {
                        //goto login
                        console.log("token invalidated -> logout");
                        Tools.CookieHelper.setToken(null);
                        window.location.href = "/login";
                        return;
                    }
                } else {
                    //在设置触发错误的请求时发生了错误
                    console.error(error);
                    Tools.toast('error', error.data || 'error');
                }
                //console.log(error.config);
                if (callbackForFail) {
                    callbackForFail('Unknown Error', error);
                }
            }).then(() => {
                if (callbackForAlways) {
                    callbackForAlways();
                }
            });
        },
        callPureImmiAPI: function (method, url, data, callbackForOK) {
            let data_with_token = Object.assign({token: Tools.CookieHelper.getToken()}, data);
            if (method === 'get') {
                let a1 = [];
                for (let field in data) {
                    if (!data.hasOwnProperty(field)) continue;
                    a1.push(field + "=" + encodeURIComponent(data[field]))
                }
                url = url + "?" + a1.join("&");
            }
            axios({
                method: method,
                url: Tools.apiUrlBase + url,
                data: qs.stringify(data_with_token),
                responseType: 'blob'
            }).then(function (response) {
                //console.log(response);
                callbackForOK(response);
            })
        },
        showLoading: function () {
            Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'spin-icon-load',
                            props: {
                                type: 'load-c',
                                size: 18
                            }
                        }),
                        h('div', 'Loading')
                    ])
                }
            });
        },
        hideLoading: function () {
            Spin.hide();
        },
        getDomain: function () {
            return this.apiUrlBase;
        },
        getImgHost: function () {
            return 'http://localhost:8088/immigrantApi/';
        },
        toast: function(type, message) {
            Message[type](message);
        },
        CookieHelper: {
            tokenKey: "immigrant-token",
            usernameKey: "immigrant-username",
            limitKey: "limit",
            isLogin: function () {
                let token = Tools.CookieHelper.getToken();
                console.log('isLogin?', token, !!token);
                return !!token;
            },
            getToken: function () {
                return Cookies.get(Tools.CookieHelper.tokenKey);
            },
            getUsername: function () {
                return Cookies.get(Tools.CookieHelper.usernameKey);
            },
            getLimit: function () {
                return Cookies.get(Tools.CookieHelper.limitKey);
            },
            setItem: function (item, value) {
                Cookies.set(item, value);
            },
            getItem: function (item) {
                return Cookies.get(item);
            },
            removeItem: function (item) {
                Cookies.remove(item);
            },
            setToken: function (token, username, life_seconds) {
                console.log('set token cookies',token, username, life_seconds)
                life_seconds = life_seconds || -1;
                Cookies.set(Tools.CookieHelper.tokenKey, token, {
                    expires: new Date(new Date().getTime() + life_seconds * 1000)
                });
                Cookies.set(Tools.CookieHelper.usernameKey, username, {
                    expires: new Date(new Date().getTime() + life_seconds * 1000)
                });
            },
            addLimitFlag: function (limit) {
                Cookies.set(Tools.CookieHelper.limitKey, limit);
            },
            clearToken: function () {
                Cookies.remove(Tools.CookieHelper.tokenKey);
                Cookies.remove(Tools.CookieHelper.usernameKey);
                Cookies.remove(Tools.CookieHelper.limitKey);
            }
        }
    }
;