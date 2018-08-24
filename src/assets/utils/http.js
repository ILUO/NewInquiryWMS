import axios from 'axios'
import qs from 'qs'


// 测试地址
const API = {
    local:'http://139.129.118.14:8087',
    online:'http://139.129.118.14:8087'
}

//production 为生产环境
axios.defaults.baseURL = API.online;
axios.defaults.timeout = 6000;

//http request 拦截器（对发送的数据做提前处理）
axios.interceptors.request.use(
    config => {
      if(config.method!="get"){
        if(typeof(config.data)=="object"){
          console.log(JSON.stringify(config.data));
          config.data = JSON.stringify(config.data);
        }
        config.headers = {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }else{
        config.data = qs.stringify(config.data);
        console.log(config.data);
        config.headers = {
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }

      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

//http response 拦截器（对返回的数据做一些处理）
axios.interceptors.response.use(
    response => {
        if(response.status == 200){
            return response.data;
        }
    },
    error => {
        return Promise.reject(error.data)
    }
)