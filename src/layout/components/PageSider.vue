<template>
  <div class="pt-4">
    <div class="m-0">
      <img class="m-auto" src="~@/assets/images/logo.png"  alt="logo"/>
    </div>
    <n-menu mode="vertrial" inverted :options="menuOptions" @update:value="handleUpdateValue" />
    <!--    options:菜单的数据-->
    <!--    inverted:使用反转样式-->
    <!--    update:value:-->
    <!--        (key: string, item: MenuOption) => void,-->
    <!--        选中菜单的回调，key 是选中菜单项的 key，item 是菜单项原始数据-->
  </div>
</template>

<script lang="ts" setup>
import {routeModuleList} from "@/router";
import {generatorMenu} from '@/utils';
import {useRoute,useRouter} from 'vue-router';

const router=useRouter();
const menuOptions=generatorMenu(routeModuleList)
const handleUpdateValue=(key,item)=>{
  router.push({name:key})

}
</script>

<style scoped>

</style>