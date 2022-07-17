//轮播图路由
import {RouteRecordRaw} from 'vue-router'
import {renderIcon} from "@/utils";
import {PlaySkipForwardCircleSharp} from "@vicons/ionicons5";
const Layout=()=>import('@/layout/index.vue')

const routeName ='slide'

const routes: Array<RouteRecordRaw> = [
    {
        path:'/slide',
        name:routeName,
        component:Layout,
        redirect:'/slide/list',
        meta:{
            title:'轮播图管理',
            icon:renderIcon(PlaySkipForwardCircleSharp),
            sort:1
        },
        children:[
            {
                path:'list',
                name:`${routeName}_list`,
                meta:{
                    title:'轮播图管理'
                },
                component:()=> import('@/views/slide/index.vue')
            }
        ]
    }
]
export default routes;
