import axios from 'axios' 
import qs from 'querystring'
import {message as msg} from 'antd'

//配置请求的基础路径
axios.defaults.baseURL = ''
//配置超时时间
axios.defaults.timeout = 2000

//请求拦截器
axios.interceptors.request.use((config)=>{
	const {method,data} = config
	if(method.toLowerCase() === 'post' && data instanceof Object){
		config.data = qs.stringify(data)
	}
	return config
})

//响应拦截器
axios.interceptors.response.use(
	response => {
		return response.data
	},
	err => {
		let errmsg = '未知错误，请联系管理员'
		const {message} = err
		if(message.indexOf('401') !== -1) errmsg = '未登录或身份过期，请重新登录！'
		else if(message.indexOf('Network Error') !== -1) errmsg = '网络不通，请检查网络再尝试！'
		else if(message.indexOf('timeout') !== -1) errmsg = '网络不稳定，连接超时！'
		msg.error(errmsg,1)
		return new Promise(()=>{})
	}
)
export default axios