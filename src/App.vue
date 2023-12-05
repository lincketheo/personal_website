<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavigationBar from "@/ui/navigation/NavigationBar.vue";
import AppFooter from "@/ui/AppFooter.vue";
</script>

<template>
    <div class="bg-background text-onBackground flex min-h-screen justify-between flex-col">
      <div class="mx-[500px]">
        <NavigationBar/>
        <RouterView/>
      </div>
      <AppFooter/>
    </div>
</template>
