<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavigationBar from "@/navigation/NavigationBar.vue";
</script>

<template>
    <div>
      <div class="mx-96">
        <NavigationBar/>
        <RouterView/>
      </div>
    </div>
</template>
