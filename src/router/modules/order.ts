import {RouteRecordRaw} from 'vue-router'
import { ReceiptSharp} from "@vicons/ionicons5";
import {renderIcon} from "@/utils";
const Layout=()=>import('@/layout/index.vue')

const routeName ='dashboard'

const routes: Array<RouteRecordRaw> = [
    {
        path:'/order',
        name:routeName,
        component:Layout,
        redirect:'/order/list',
        meta:{
            title:'订单管理',
            icon:renderIcon(ReceiptSharp),
            sort:2,
        },
        children:[
            {
                path:'list',
                name:`${routeName}_list`,
                meta:{
                    title:'订单列表'
                },
                component:()=> import('@/views/order/index.vue')
            },
            {
                path:'refund',
                name:`${routeName}_refund`,
                meta:{
                    title:'退款列表'
                },
                component:()=> import('@/views/order/refund.vue')
            }
        ]
    }
]
export default routes;
