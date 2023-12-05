<script setup lang="ts">
import {RouterLink} from "vue-router";

defineProps(["link"])
</script>

<template>
  <RouterLink :to="link.link" class="p-7">{{ link.title }}</RouterLink>
</template>
