<template>
  <div class="pt-4">
    <div class="m-0">
      <img class="m-auto" src="~@/assets/images/logo.png"  alt="logo"/>
    </div>
    <n-menu mode="vertrial" :value="defaultKey" inverted :options="menuOptions" @update:value="handleUpdateValue" />
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
import {onMounted, ref} from "vue";

//定义侧边栏默认选中
const defaultKey= ref('')
const router=useRouter();
const menuOptions=generatorMenu(routeModuleList)
onMounted(()=>{
  const route=useRoute()
  const routeKey=route.name;
  typeof routeKey === "string" ? defaultKey.value = routeKey : defaultKey.value =''

})
const handleUpdateValue=(key,item)=>{
  defaultKey.value=key
  router.push({name:key})

}
</script>

<style scoped>

</style>