import {RouteRecordRaw} from 'vue-router'
import {renderIcon} from "@/utils";
import {ColorFilter} from "@vicons/ionicons5";
const Layout=()=>import('@/layout/index.vue')

const routeName ='dashboard'

const routes: Array<RouteRecordRaw> = [
    {
        path:'/dashboard',
        name:routeName,
        component:Layout,
        redirect:'/dashboard/console',
        meta:{
            title:'主控面板',
            icon:renderIcon(ColorFilter),
        },
        children:[
            {
                path:'console',
                name:`${routeName}_console`,
                meta:{
                    title:'主控面板'
                },
                component:()=> import('@/views/dashboard/index.vue')
            }
        ]
    }
]
export default routes;
