import axios from "axios"


const request=axios.create({
    baseURL:"http://api.shop.eduwork.cn/",
    timeout:8000,
})

//请求拦截器，请求之前触发
request.interceptors.request.use((config)=>{
    //获取token
    const token=localStorage.getItem("token");
    //判断是否存在token
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
}),(error:any)=>{
    return Promise.reject(error);
}
//响应拦截器，请求之后触发
request.interceptors.response.use((response)=>{

    return response.data;
}),(error:any)=>{
    const {response}=error
    switch (response.status){
        case 401:
            window.$message.error('登录失败，请重新登录')
            localStorage.removeItem('token')
            window.location.href='/login'
            break;
        case 404:
            window.$message.error('接口不存在')
            break;
        case 422:
            window.$message.error('参数错误')
            break
        case 500:
        case 502:
            window.$message.error('网络异常')
            break
    }
    return Promise.reject(error);
}

export default request