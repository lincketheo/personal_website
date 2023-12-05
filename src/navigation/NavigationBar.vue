<script setup lang="ts">

import {useRouter} from "vue-router";
import {computed} from "vue";
import SelectedRoute from "@/navigation/SelectedRoute.vue";
import NotSelectedRoute from "@/navigation/NotSelectedRoute.vue";
import meta from "@/meta.json"

let _meta = meta as any

const blog_links = Object.keys(_meta).map(key => {
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
  <nav>
    <ul class="flex justify-end p-20">
      <li v-for="link in links" :key="link.title" class="px-5 text-2xl flex flex-col justify-center">
        <SelectedRoute v-if="currentLink === link.name" :link="link"/>
        <NotSelectedRoute v-else :link="link"/>
      </li>
    </ul>
  </nav>
</template>

