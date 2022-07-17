<template>
  <div>
    <div>
      <div class="h-8 w-full bg-white pl-4 mb-4">
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1">轮播图列表</span>
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
          <n-form-item label="轮播图" path="title">
            <n-input v-model:value="formSearch.title" placeholder="输入轮播图名称" />
          </n-form-item>
          <n-form-item label="跳转链接" path="url">
            <n-input v-model:value="formSearch.url" placeholder="输入跳转链接" />
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
          <span>轮播图列表</span>
          <span class="ml-auto">
            <NButton size="small" round  type="info" @click="showModal=true">
              + 添加</NButton>
          </span>
        </div>
        <div>
          <n-data-table
              size="small"
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :bordered="false"
          />
          <div class="p-4 flex justify-end mr-4">
            <n-pagination v-model:page="page" @update:page="updatePage"  :page-count="totalPages" />
          </div>
        </div>
        <AddSlide v-if="showModal" :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddSlide>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, h,onMounted } from 'vue'
import { useMessage,NImage,NSwitch, NButton,useLoadingBar } from 'naive-ui'
import AddSlide from './components/AddSlide.vue'
import {slides} from '@/api/slide'
//加载条
const loadingbar=useLoadingBar()
const formSearch =ref({
  title:'',
  url:''
})
const showModal =ref(false)
const pagination=  ref(false as const)
const page=ref(1)
const totalPages=ref(0)
const message=useMessage()
const data=ref([])
//添加模态框显示状态
const checkShowModal = (status) => {
  showModal.value=status
}

const columns=[
  {
    title: '轮播图图片',
    key: 'img',
    render(row){
      return h(NImage,{
        width:'100',
        alt:'加载失败',
        src:row.img_url,
      })
    }
  },
  {
    title: '轮播图名称',
    key: 'title'
  },
  {
    title: '跳转链接',
    key: 'url'
  },
  {
    title: '禁用状态',
    key: 'status',
    //???***鼠标点击开关事件完成
    render(row){
      return h(NSwitch,{
        size:'small',
        // color:'#1890FF',
        // activeColor:'#28AAB6FF',
        activeValue:1,
        inactiveValue:0,
        value:row.is_locked==1 ? false : true
      })
    }
  },
  {
    title: '添加时间',
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

        }
      },'编辑')

    }
  }
]
//重置
const searchReset = () => {
  getSlides({}),
      formSearch.value={
        title:'',
        url:'',
      }
}
//搜索
const searchSubmit=(e)=>{
  e.preventDefault()
  getSlides({
    name:formSearch.value.title,
    email:formSearch.value.url,
    current:1
  })
}
onMounted(()=>{
  getSlides({})
})
const updatePage=(pageNum)=>{
  getSlides({
    current:pageNum,
    name:formSearch.value.title,
    email:formSearch.value.url,
  })
}
const getSlides=(params)=>{
  loadingbar.start()
  slides(params).then(res_slide=>{
    data.value=res_slide.data
    totalPages.value=res_slide.meta.pagination.total_pages
    page.value=res_slide.meta.pagination.current_page
    loadingbar.finish()
  }).catch(err=>{
    loadingbar.error()
  })
}
const reload=()=>{
  getSlides({
    current:page.value,
    title:formSearch.value.title,
    url:formSearch.value.url,
  })
}
</script>

<style scoped>

</style>