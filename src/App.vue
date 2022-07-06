
<template>
  <div>
<!--    <img alt="Vue logo" src="./assets/logo.png" />-->
<!--    <NButton @click="handleClick">点击</NButton>-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/login">go to Log in</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
