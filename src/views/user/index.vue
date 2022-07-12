<template>
  <div>
    <div>
      <div class="h-8 w-full bg-white pl-4 mb-4">
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1">用户列表</span>
<!--        <div class="pt-3 text-xl text-black font-bold">-->
<!--          用户管理-->
<!--        </div>-->

      </div>
    </div>
    <div class="content px-4">
      <div class="bg-white pt-4 pr-4">
        <n-form
            ref="formRef"
            inline
            show-feedback="false"
            label-placement="left"
            :label-width="80"
            :model="formSearch"
        >
          <n-form-item label="姓名" path="name">
            <n-input v-model:value="formSearch.name" placeholder="输入姓名" />
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="formSearch.email" placeholder="输入邮箱" />
          </n-form-item>
          <n-form-item class="ml-auto">
            <n-button attr-type="button" @click="searchReset" class="mr-4">
              重置
            </n-button>
            <n-button type="info" attr-type="button" @click="searchSubmit">
              搜索
            </n-button>
          </n-form-item>
        </n-form>
      </div>
      <div class="bg-white">
        <div class="text-xl px-6 pb-4 flex">
          <span>用户列表</span>
          <span class="ml-auto">
            <NButton size="small" round  type="info" @click="showModal=true">
              + 新建</NButton>
          </span>
        </div>
        <div>
          <n-data-table
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :bordered="false"
          />
          <div class="p-4 flex justify-end mr-4">
            <n-pagination v-model:page="page" @update:page="updatePage"  :page-count="totalPages" />
          </div>
        </div>
        <AddUser :showModal="showModal" @checkShowModal="checkShowModal"></AddUser>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, h,onMounted } from 'vue'
import { useMessage,NAvatar,NSwitch, NButton, } from 'naive-ui'
import AddUser from './components/AddUser.vue'
import {users} from '@/api/users'

const formSearch =ref({name:'', email:''})
const showModal =ref(false)
const pagination=  ref(false as const)
const page=ref(1)
const totalPages=ref(0)
const message=useMessage()
const data=ref([])
const columns=[
  {
    title: '头像',
    key: 'avatar_url',
    render(row){
      return h(NAvatar,{round:true,src:row.avatar_url,size:'medium'}
      )
    }
  },
  {
    title: '姓名',
    key: 'name'
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '是否禁用',
    key: 'is_locked',
    //???***鼠标点击开关事件完成
    render(row){
      return h(NSwitch,{
        size:'small',
        color:'#1890FF',
        activeColor:'#28AAB6FF',
        activeValue:1,
        inactiveValue:0,
        value:row.is_locked==1 ? false : true
      })
    }
  },
  {
    title: '创建时间',
    key: 'created_at'
  },
  {
    title: '操作',
    key: '',
    render(row){
      return h ( NButton ,{
        size:'small',
        color:'#1890ff',
        strong:true,
        onClick:()=>{
          message.info('正在编辑'+row.name)
        }
      },'编辑')

    }
  }
]
const searchReset = () => {
  getUserList({}),
      formSearch.value={
        name:'',
        email:'',
      }
}
const searchSubmit=(e)=>{
  e.preventDefault()
  getUserList({
    name:formSearch.value.name,
    email:formSearch.value.email,
    current:1
  })
}
onMounted(()=>{
  getUserList({})
})
const updatePage=(pageNum)=>{
  console.log(page)
  page.value=pageNum
  getUserList({
    current:pageNum,
    name:formSearch.value.name,
    email:formSearch.value.email,
  })
}


const getUserList=(params)=>{
  users(params).then(users=>{
    data.value=users.data
    totalPages.value=users.meta.pagination.total_pages
    page.value=users.meta.pagination.current_page
  })
}
const checkShowModal = (status) => {
 showModal.value=status
}
</script>

<style scoped>

</style>