import {RouteRecordRaw} from 'vue-router'
import {renderIcon} from "@/utils";
import {PersonCircle} from "@vicons/ionicons5";
const Layout=()=>import('@/layout/index.vue')

const routeName ='users'

const routes: Array<RouteRecordRaw> = [
    {
        path:'/users',
        name:routeName,
        component:Layout,
        redirect:'/users/list',
        meta:{
            title:'用户列表',
            icon:renderIcon(PersonCircle),
            sort:1
        },
        children:[
            {
                path:'list',
                name:`${routeName}_list`,
                meta:{
                    title:'用户列表'
                },
                component:()=> import('@/views/user/index.vue')
            }
        ]
    }
]
export default routes;
