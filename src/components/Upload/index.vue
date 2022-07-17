<template>
  <n-upload
    :custom-request="customRequest"
    >
    <n-button v-if="!imgurl">上传文件</n-button>
    <n-image
      v-else
      width="100"
      :src="imgurl"
      :preview-disabled="true"
    >
    </n-image>
  </n-upload>
</template>

<script setup>
import {uploadToken} from "../../api/base";
import axios from "axios";
import {ref} from "vue";

const imgurl=ref(null)
const emit=defineEmits(['backKey'])
const  customRequest=({file,action,header,onFinish,onError})=>{
  uploadToken().then(res=>{
    //图片上传
    //组装上传的参数
    const formData=new FormData();
    //随机生成一个文件名并添加时间戳，根据file.name获取文件名后缀
    let filename=`${Date.now()}${Math.floor(Math.random()*1000)}.${file.name.split('.').pop()}`
    formData.append('key',filename)
    formData.append('OSSAccessKeyId',res.accessid);
    formData.append('policy',res.policy)
    formData.append('Signature',res.signature)
    formData.append('file',file.file)
    //发送请求（axios）
    axios.post(res.host,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }).then(()=>{
      emit('backKey',filename)
      imgurl.value=`${res.host}/${filename}`
      onFinish(filename)
    }).catch(err=>{
      onError(err)
    })
  })
}
</script>

<style scoped>

</style>