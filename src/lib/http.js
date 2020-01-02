import axios from 'axios';
import Config from '@/Config'

const baseURL = Config.baseURL
console.log(baseURL);
axios.defaults.timeout = 30000;
axios.defaults.baseURL = baseURL;


// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 以下是token存于cookie的处理  del by allen 2018.5.30
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    //     config.data = JSON.stringify(config.data);

    // if(token){
    //   config.params = {'token':token}
    //   config.headers.Authorization = token;
    // }

    // 判断请求方式是否为以下四种种
    // if (config.method === 'post' || 'put' || 'delete' || 'patch') {
    //   // 序列化
    //   config.data = qs.stringify(config.data);
    //   // 设置请求头的content-type
    //   config.headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //     // 'Content-Type': 'multipart/form-data',
    //     // 'Content-Type':'multipart/form-data'
    //   };
    // }
    // 若是有token , 就给头部授权带上token
	  if (localStorage.getItem('token')) {
      config.headers.authorization = localStorage.getItem('token');
		  // config.headers.authorization = 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzM3ODQ5OTMsInN1YiI6IlpoYW5neWFuZ3F1YW4iLCJjcmVhdGVkIjoxNTczMTgwMTkzMzMzfQ.HcpXs4IAQUWAY1AwTVixLqeFPWFxsKLgAATESHWEGUWbA0YPJf7vWzCg008BV2PKva7fYOk-nvEAM4Wo5zWy8g'
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: data})
      .then(response => {
        resolve(response);
      }).catch(err => {
      reject(err);
    });
  });
}

/**
 * 封装delete方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {params: data})
      .then(response => {
        resolve(response);
      }).catch(err => {
      reject(err);
    });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  let formData = new FormData()
  for(let key in data){
    formData.append(key,data[key])
  }
  return new Promise((resolve, reject) => {
    axios.post(url, formData)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data) {
  let formData = new FormData()
  for(let key in data){
    formData.append(key,data[key])
  }
  return new Promise((resolve, reject) => {
    axios.patch(url, formData)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
  });
}
