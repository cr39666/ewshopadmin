import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
// import {renderIcon} from "@/utils";
// import {Browsers} from '@vicons/ionicons5'

const Home=()=>import('@/views/Home.vue')
const Login=()=>import('@/views/login/index.vue')

//统一导入modules中所有的路由文件
const modules=import.meta.globEager('./modules/**/*.ts')
const routeModuleList:RouteRecordRaw[]=[];

Object.keys(modules).forEach((key:string)=>{
    const modu=modules[key].default||{};
    const moduList=Array.isArray(modu)?[...modu]:[modu];
    routeModuleList.push(...moduList)
})
// console.log(routeModuleList,'routeModuleList')
const routes = [
    {
        path: '/',
        component: Login,
        meta:{
            title:'登录',
        }
    },
    {
        path: '/login',
        name:'login',
        component: Login,
        meta:{
            title:'登录',
        }
    },
    {
        path: '/home',
        component: Home,
        meta:{
            title:'Ewshop',
        }
    },

]


const baseRoutes=[...routes,...routeModuleList];
// console.log(baseRoutes);


const router =createRouter({

    history: createWebHistory(),
    routes:baseRoutes,
})

router.beforeEach((to,from,next)=>{
    // console.log(to,from);
    //修改页面标题
    // console.log(to.meta.title)
    document.title=(to?.meta?.title as string)||document.title;

    //判断是否是登录页，不是的话要判断是否登录
    if(to.name!='login'){
        if(!localStorage.getItem('token')){
            next({
                path:'/login',
                query:{
                    redirect:to.fullPath
                }
            })
        }
    }
    next();
//***???任务：登录成功之后返回之前的页面???*****
// 判断地址中是否有redirect,如果存在redirect则跳转redirect参数，不存在则登陆之后直接跳转到控制台中
})

export {routeModuleList}
export default router
