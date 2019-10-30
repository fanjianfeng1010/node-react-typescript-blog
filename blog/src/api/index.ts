import axios, { AxiosRequestConfig } from 'axios'
import Qs from 'qs'
import { APP_TOKEN_KEY } from '../config/default.config'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:2300' : undefined

axios.defaults.withCredentials = true
axios.defaults.transformRequest = (data = {}) => {
  return Qs.stringify(data)
}
// console.log(APP_TOKEN_KEY)
axios.interceptors.response.use((result: AxiosRequestConfig) => result.data)
axios.interceptors.request.use(
  function(config: any) {
    const token = localStorage.getItem(APP_TOKEN_KEY)

    if (!(config.url.includes('getFirstLoginInfo') || config.url.includes('login'))) {
      if (!token) {
        console.log('没有授权')
      }
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers.authorization = token || ''
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

/**
 * 配置request请求时的默认参数
 */
axios.interceptors.response.use(function(response) {
  return response
})

export default axios
