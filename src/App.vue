<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavigationBar from "@/ui/navigation/NavigationBar.vue";
import AppFooter from "@/ui/AppFooter.vue";
</script>

<template>
    <div class="flex h-screen justify-between flex-col">
      <div class="min-[1770px]:mx-[100px] min-[2000px]:mx-[500px]">
        <NavigationBar/>
        <RouterView/>
      </div>
      <AppFooter/>
    </div>
</template>
