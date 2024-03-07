<script setup lang="ts">
import meta from "@/meta.json"
</script>

<template>
  <div v-for="post in meta.cs.posts" :key="post.name">
    <hr class="rounded">
    <p class="font-bold">{{ post.title }}</p>
    <p>
      {{ post.description }}
    </p>
    <a :href="post.route">more...</a>
  </div>
</template>
