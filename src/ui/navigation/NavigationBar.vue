<script setup lang="ts">

import {RouterLink, useRouter} from "vue-router";
import {computed} from "vue";
import SelectedRoute from "@/ui/navigation/SelectedRoute.vue";
import NotSelectedRoute from "@/ui/navigation/NotSelectedRoute.vue";

const links = [
  {
    title: "Home",
    link: '/',
    name: 'home'
  },
  {
    title: "Computer Science",
    link: '/cs',
    name: 'cs'
  },
  {
    title: "Math",
    link: '/math',
    name: 'math'
  },
  {
    title: "Software Engineering",
    link: '/swe',
    name: 'swe'
  }
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

