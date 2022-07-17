<template>
  <QuillEditor theme="snow" ref="editor" @update:content="updateContent"/>

</template>

<script setup>

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {ref} from "vue";

const editor=ref()
const emit=defineEmits(['backContent'])

const updateContent=(e)=>{
  // model.value.details=editor.value.getHTML()
  emit('backContent',editor.value.getHTML())
}
</script>

<style scoped>

</style>