<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavigationBar from "@/navigation/NavigationBar.vue";
import AppFooter from "@/layout/AppFooter.vue";
</script>

<template>
    <div>
      <div class="min-[1770px]:mx-[100px] min-[2000px]:mx-[500px]">
        <NavigationBar/>
        <RouterView/>
      </div>
      <AppFooter/>
    </div>
</template>
