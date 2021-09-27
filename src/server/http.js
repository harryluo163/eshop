import axios from 'axios'
import config from "../libs/config";


const http = axios.create({
    baseURL:config.baseURL,
    timeout:50000,
    withCredentials:true,
})

http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

//http request 拦截器
http.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie

    //config.data = JSON.stringify(config.data);

    // config.headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }

    // if(token){
    //   config.params = {'token':token}
    // }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


//http response 拦截器
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
      http.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        http.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

export function postForm(url, data) {
    let config = {
        withCredentials:true,
        headers:{'Content-Type':'multipart/form-data'}
    }
    return new Promise((resolve, reject) => {
        http.post(url, data,config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
      http.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
      http.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

export default http