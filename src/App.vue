<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavigationBar from "@/ui/NavigationBar.vue";
</script>

<template>
  <header>
    <NavigationBar/>
  </header>
  <RouterView/>
</template>

<style scoped>
</style>
