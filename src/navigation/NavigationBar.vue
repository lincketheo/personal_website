<script setup lang="ts">

import {useRouter} from "vue-router";
import {computed} from "vue";
import meta from "@/meta.json"

let _meta = meta as any

const blog_links = Object.keys(_meta)
    // Removing math while I struggle with the hell of mathjax
    .filter(key => key !== 'math')
    .map(key => {
      return {
        title: _meta[key].nav_title,
        link: _meta[key].route,
        name: _meta[key].name,
      }
    })

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
  <nav class="bg-blue-800 p-16">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Theo Lincke</span>
      </a>
      <div class="w-full md:block md:w-auto">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
          <li v-for="link in links" :key="link.name">
            <a v-if="currentLink === link.name"
               :href="link.link"
               class="block py-2 px-3 text-blue-200 rounded p-0"
               aria-current="page">
              {{ link.title }}
            </a>
            <a v-else
               :href="link.link"
               class="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-blue-700 p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              {{ link.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

