<script setup lang="ts">
import { meta } from "@/meta"
</script>

<template>
  <div class="flex flex-row justify-center">
    <div class="w-[1024px]">
      <div v-for="post in meta.thoughts.posts" :key="post.name">
        <hr class="rounded">
        <p class="font-bold">{{ post.title }}</p>
        <p>
          {{ post.description }}
        </p>
        <a :href="post.route">more...</a>
      </div>
    </div>
  </div>
</template>
