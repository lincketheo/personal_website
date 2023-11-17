<script setup lang="ts">

import {RouterLink} from "vue-router";

const links = [
  {
    title: "Home",
    link: '/'
  },
  {
    title: "Computer Science",
    link: '/cs'
  },
  {
    title: "Math",
    link: '/math'
  },
  {
    title: "Software Engineering",
    link: '/swe'
  }
]

</script>

<template>
  <nav>
    <div class="flex justify-between">
      <span>Theo Lincke</span>
      <ul class="flex">
        <li v-for="link in links" :key="link.title">
          <div class="px-5">
            <RouterLink :to="link.link">{{ link.title }}</RouterLink>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

