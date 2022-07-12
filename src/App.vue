
<template>
  <div>
    <n-message-provider>
      <router-link to="/">Go to Home</router-link>
      <router-link to="/login">go to Log in</router-link>
      <router-view></router-view>
    </n-message-provider>
  </div>
</template>

<script setup lang="ts">
// import { useMessage } from 'naive-ui'
// import { defineComponent } from 'vue'
//
// // content
// export default defineComponent({
//   setup () {
//     const message = useMessage()
//     return {
//       warning () {
//         message.warning('...')
//       }
//     }
//   }
// })

</script>

<style>

</style>
