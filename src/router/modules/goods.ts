import {RouteRecordRaw} from 'vue-router'
import {renderIcon} from "@/utils";
import {CubeSharp} from "@vicons/ionicons5";
const Layout=()=>import('@/layout/index.vue')

const routeName ='goods'

const routes: Array<RouteRecordRaw> = [
    {
        path:'/goods',
        name:routeName,
        component:Layout,
        redirect:'/goods/list',
        meta:{
            title:'商品管理',
            icon:renderIcon(CubeSharp),
            sort:1
        },
        children:[
            {
                path:'list',
                name:`${routeName}_list`,
                meta:{
                    title:'商品列表'
                },
                component:()=> import('@/views/goods/index.vue')
            }
        ]
    }
]
export default routes;
