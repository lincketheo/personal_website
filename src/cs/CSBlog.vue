<script setup lang="ts">
import meta from "@/meta.json"
import {removeTrailingAndLeadingSlashes} from "@/util/strings";

console.log(meta.cs.posts)

function fullRoute(route: string) {
  return "/" + removeTrailingAndLeadingSlashes(meta.cs.route) + "/" + removeTrailingAndLeadingSlashes(route)
}
</script>

<template>
  <ul>
    <li v-for="post in meta.cs.posts" :key="post.title">
      <a :href="fullRoute(post.route)">{{ post.title }}</a>
    </li>
  </ul>
</template>
