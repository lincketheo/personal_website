<script setup lang="ts">
import { meta } from "@/meta"
</script>

<template>
  <div class="mt-10">
    <div class="mb-5" v-for="post in meta.thoughts.posts" :key="post.name">
      <hr class="rounded">
      <a class="font-bold" :href="post.route">{{ post.title }}</a>
      <p>
        {{ post.description }}
      </p>
      <a class="text-primary dark:text-primary-dark" :href="post.route">more...</a>
    </div>
  </div>
</template>
