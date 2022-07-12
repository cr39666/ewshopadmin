//工具包
import {h} from "vue";
import {NIcon} from "naive-ui";
import {Component} from "@vue/runtime-core";
// import router from "@/router";

export const renderIcon =  (icon:Component) : Component =>{
    return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
    // routerMap 按照 sort 排序
    routerMap.sort((a, b) => a.meta.sort - b.meta.sort);

    let result = routerMap.map((item) => {
        let menu = {
            label: item?.meta?.title,
            key: item?.name,
            icon: item.meta?.icon,
            children:{}
        }
        if (item.children && item.children.length > 1){
            menu.children = generatorMenu(item.children)
        }
        return menu
    })
    return result;
    //   {
//     label: '首页',
//     key: 'go-back-home',
//     icon: renderIcon(HomeIcon)
//   },

    // routerMap 按照 sort 排序
    // routerMap.sort((a, b) => a.meta.sort - b.meta.sort);
    //
    // let result = routerMap.map((item) => {
    //     // 判断是否是根路由
    //     const isRoot = isRootRouter(item);
    //     const info = isRoot ? item.children[0] : item;
    //     let menu =  {
    //         ...info,
    //         label: info.meta.title,
    //         key: info.name,
    //         icon: info.meta?.icon,
    //     }
    //     console.log(menu,'menu')
    //     if (item.children && item.children.length > 1) {
    //         menu.children = generatorMenu(item.children)
    //     }
    //     return menu;
    //
    // })
    // return result;
    // {
    //     label: '且听风吟',
    //         key: 'hear-the-wind-sing',
    //     icon: renderIcon(BookIcon)
    // }


    // routerMap.map((item) => {
    //     const currentMenu = {
    //         ...info,
    //         ...info.meta,
    //         label: info.meta?.title,
    //         key: info.name,
    //         icon: isRoot ? item.meta?.icon : info.meta?.icon,
    //     };
    //
    // })
    // return filterRouter(routerMap).map((item) => {
    //     const isRoot = isRootRouter(item);
    //     const info = isRoot ? item.children[0] : item;
    //     const currentMenu = {
    //         ...info,
    //         ...info.meta,
    //         label: info.meta?.title,
    //         key: info.name,
    //         icon: isRoot ? item.meta?.icon : info.meta?.icon,
    //     };
    //     // 是否有子菜单，并递归处理
    //     if (info.children && info.children.length > 0) {
    //         // Recursion
    //         currentMenu.children = generatorMenu(info.children);
    //     }
    //     return currentMenu;
    // });
}
/**
 * 判断根路由 Router
 * */
export function isRootRouter(item):Boolean {
    return  item.children?.length === 1;
}
// /**
//  * 排除Router
//  * */
// export function filterRouter(routerMap: Array<any>) {
//     return routerMap.filter((item) => {
//         return (
//             (item.meta?.hidden || false) != true &&
//             !['/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
//         );
//     });
// }