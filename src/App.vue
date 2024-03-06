<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavigationBar from "@/navigation/NavigationBar.vue";
</script>

<template>
    <div>
      <div>
        <NavigationBar/>
        <RouterView/>
      </div>
    </div>
</template>
