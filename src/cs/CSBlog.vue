<script setup lang="ts">
import meta from "@/meta.json"
const formula = '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
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
  <vue-mathjax :formula="formula"></vue-mathjax>
</template>
