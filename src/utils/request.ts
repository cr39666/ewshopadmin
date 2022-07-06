import axios from "axios"
const request=axios.create({
    baseURL:"http://api.shop.eduwork.cn/",
    timeout:8000,
})

//请求拦截器，请求之前触发
request.interceptors.request.use((config)=>{
    return config;
}),(error:string)=>{
    return Promise.reject(error);
}
//响应拦截器，请求之后触发
request.interceptors.response.use((response)=>{
    return response.data;
}),(error:string)=>{
    return Promise.reject(error);
}

export default request