<script setup lang="ts">
import {RouterLink} from "vue-router";

defineProps(["link"])
</script>

<template>
  <RouterLink :to="link.link" class="rounded-3xl p-5 border-solid border-2 border-black">{{ link.title }}</RouterLink>
</template>
