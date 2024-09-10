import { createRouter, createWebHistory, RouteRecordRaw, NavigationFailureType } from "vue-router";
// import {renderIcon} from "@/utils";
// import {Browsers} from '@vicons/ionicons5'

const ErrorPage = () => import("@/views/ErrorPage.vue");
const Login = () => import("@/views/login/index.vue");

//统一导入modules中所有的路由文件
const modules = import.meta.globEager("./modules/**/*.ts");
const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key: string) => {
    const modu = modules[key].default || {};
    const moduList = Array.isArray(modu) ? [...modu] : [modu];
    routeModuleList.push(...moduList);
});

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: "登录",
        },
    },
    {
        path: "/",
        redirect: "/login", // 重定向到登录页
        meta: {
            title: "登录",
        },
    },
    // 通配符路由，匹配所有未定义的路由
    {
        path: '/:pathMatch(.*)*', // 通配符路由
        name: 'not-found',
        component: ErrorPage,
        meta: {
            title: '页面未找到'
        }
    },
    {
        path: '/error',
        name: 'error',
        component: ErrorPage,
        meta: {
            title: '错误页面',
        }
    }
];
const baseRoutes = [...routes, ...routeModuleList];

const router = createRouter({
    history: createWebHistory(),
    routes: baseRoutes,
});

router.beforeEach((to, from, next) => {
    try {
        document.title = (to?.meta?.title as string) || document.title;   //修改页面标题

        // 判断是否是登录页
        if (to.name === "login") {
            next();
        } else {
            const token = localStorage.getItem("token");
            if (!token) {
                // 如果没有登录，则重定向到登录页面
                next({
                    path: "/login",
                    query: {
                        redirect: to.fullPath,
                    },
                });
            } else {
                next();
            }
        }
        //***???任务：登录成功之后返回之前的页面???*****
        // 判断地址中是否有redirect,如果存在redirect则跳转redirect参数，不存在则登陆之后直接跳转到控制台中
    } catch (error: any) {
        // 捕获导航错误
        console.error('Navigation error:', error);
        if ('type' in error && error.type === NavigationFailureType.duplicated) {
            // 如果是重定向错误，忽略
            next();
        } else {
            next({ name: 'error', params: { message: error.messageq }});
        }
    }
});

export { routeModuleList };
export default router;
