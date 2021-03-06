import axios from 'axios'
import { Toast } from 'antd-mobile'

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  
  if (config.url.includes('?')) {
    config.url = `http://localhost:3000/api/v1${config.url}&_t=${new Date().getTime()}`
  } else {
    config.url = `http://localhost:3000/api/v1${config.url}?_t=${new Date().getTime()}`
  }
  // Do something before request is sent
  Toast.loading('加载中...', 0)
  return config
}, function (error) {
  // Do something with request error
  Toast.hide()
  return Promise.reject(error)
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  Toast.hide()
  return response
}, function (error) {
  setTimeout(() => {
    Toast.hide()
  }, 300)
  // Do something with response error
  return Promise.reject(error)
})