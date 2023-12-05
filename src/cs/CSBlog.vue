<script setup lang="ts">
import meta from "@/meta.json"

function fullRoute(route: string) {
  return meta.math.route + route
}
</script>

<template>
  <ul>
    <li v-for="post in meta.cs.posts" :key="post.title">
      <a :href="fullRoute(post.route)">{{ post.title }}</a>
    </li>
  </ul>
</template>
