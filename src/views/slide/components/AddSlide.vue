<template>
  <div>
    <n-modal
        v-model:show="props.showModal"
        @update:show="$emit('checkShowModal',false)"
        :mask-closable="true"
    >
      <n-card
          style="width: 600px"
          title="添加轮播图"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
      >
        <template #header-extra>
          <span
              class="w-5 text-center  cursor-pointer text-2xl "
              @click="$emit('checkShowModal',false)"
          >&times;</span>
        </template>
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="title" label="标题">
            <n-input v-model:value="model.title" placeholder="请输入标题"/>
          </n-form-item>
          <n-form-item path="url" label="跳转链接">
            <n-input
                v-model:value="model.url"
                type="email"
                placeholder="请输入跳转URL"
            />
          </n-form-item>
          <n-form-item label="是否启用" path="status">
            <n-radio-group v-model:value="model.status" name="status">
              <n-radio :value="0">
                否
              </n-radio>
              <n-radio :value="1">
               是
              </n-radio>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="图片上传" path="img">
            <Upload @backKey="backKey"></Upload>
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                    round
                    type="primary"
                    @click="slideSubmit"
                >
                  添加
                </n-button>
              </div>
            </n-col>
          </n-row>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {addslides} from "@/api/slide";
import Upload from '@/components/Upload/index.vue'

const props=defineProps({
  showModal:{
    type:Boolean,
    default:false
  }})
const emit=defineEmits(['checkShowModal'])
const model = ref({
  title: null,
  img: null,
  url: null,
  status:null,
})
const rules = {
  title: [
    {
      required: true,
      message: '请输入标题'
    }
  ],
  img: [
    {
      required: true,
      message: '请上传图片'
    }
  ],
  url: [
    {
      required: true,
      message: '请输入跳转链接'
    }
  ],
  status: [
    {
      required: true,
      message: '是否禁用'
    }
  ]
}
const formRef=ref()
const slideSubmit = (e)=>{
  e.preventDefault()
  formRef.value.validate(errors=>{
    if(errors){
      console.log(errors)
    }else{
      // 请求API 添加数据
      addslides(model.value).then(res=>{
        console.log(res)
        window.$message.success('添加成功')
        emit('checkShowModal',false)
        emit('reloadTable')
      })
      console.log(model.value)
    }
  })
}
const backKey=(key)=>{
  model.value.img=key
}
</script>

<style scoped>

</style>