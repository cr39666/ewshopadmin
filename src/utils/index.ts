//工具包
import {h} from "vue";
import {NIcon} from "naive-ui";
import {Component} from "@vue/runtime-core";

export const renderIcon =  (icon:Component) : Component =>{
    return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
    // routerMap 按照 sort 排序
    routerMap.sort((a, b) => a.meta.sort - b.meta.sort);
    // let permissions=['user','goods','dashboard'];
    let result = routerMap.map((item) => {
        //权限：判断item.name是否在permissions中如果不存在跳过
        // if(!permissions.includes(item.name)){
        //
        //     return null
        // }

        let menu = {
            label: item?.meta?.title,
            key: item?.name,
            icon: item.meta?.icon,
            children:{}
        }
        if (item.children && item.children.length > 1){
            menu.children = generatorMenu(item.children)
        }else if(item.children && item.children.length===1){
            menu.key=item?.children[0].name
        }
        return menu
    })
    //去除result中的 null
    // return result.filter(item=>item!==null)
    return result
}
