<script setup lang="ts">

  import {useRouter} from "vue-router";
import {computed} from "vue";
import {meta} from "@/meta"

const blog_links = [
  {
    title: meta.cs.nav_title,
    link: meta.cs.route,
    name: meta.cs.name,
  },
  {
    title: meta.math.nav_title,
    link: meta.math.route,
    name: meta.math.name,
  },
  {
    title: meta.thoughts.nav_title,
    link: meta.thoughts.route,
    name: meta.thoughts.name,
  },
]

const links = [
  {
    title: "Home",
    link: '/',
    name: "home"
  },
  ...blog_links
]

const router = useRouter()
const currentLink = computed(() => {
  return router.currentRoute.value.name
})

</script>

<template>
  <nav class="bg-surface dark:bg-surface-dark p-16">
    <div class="flex flex-wrap items-center justify-between">
      <div class="text-on-surface dark:text-on-surface flex items-center justify-between">
        <a href="https://github.com/lincketheo">
          <font-awesome-icon class="text-3xl pr-10" :icon="['fab', 'github']"/>
        </a>
        <a href="https://www.linkedin.com/in/theo-lincke/">
          <font-awesome-icon class="text-3xl pr-10" :icon="['fab', 'linkedin']"/>
        </a>
        <a href="/">
          <span class="text-2xl font-bold text-primary dark:text-primary-dark">theolincke.com</span>
        </a>
      </div>
      <ul class="flex flex-row space-x-8">
        <li v-for="link in links" :key="link.name">
          <a v-if="currentLink === link.name"
             :href="link.link"
             class="text-primary dark:text-primary-dark"
             aria-current="page">
            {{ link.title }}
          </a>
          <a v-else
             :href="link.link"
             class="text-on-surface dark:text-on-surface-dark"
             aria-current="page">
            {{ link.title }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

