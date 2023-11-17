<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavigationBar from "@/ui/NavigationBar.vue";
import AppFooter from "@/ui/AppFooter.vue";
</script>

<template>
  <div class="flex justify-between flex-col h-screen">
    <div class="mx-[550px]">
      <NavigationBar/>
      <RouterView/>
    </div>
    <div>
      Lots of text
    </div>
    <AppFooter/>
  </div>
</template>
