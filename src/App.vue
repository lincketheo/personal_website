<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavigationBar from "@/navigation/NavigationBar.vue";
</script>

<template>
    <div class="flex flex-row justify-center bg-background dark:bg-background-dark text-on-background dark:text-on-background-dark min-h-screen">
      <div class="w-[1024px]">
        <NavigationBar/>
        <RouterView/>
      </div>
    </div>
</template>
