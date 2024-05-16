import {createRouter, createWebHistory} from 'vue-router'
import HomeIndex from '@/home/HomeIndex.vue'
import { meta } from "@/meta"
import {postToVueRoute, topicToVueRoute} from "@/models";

/**
 * All the meta information about the blog
 * TODO - add typing
 */

const routes = [
    {
        path: '/',
        component: HomeIndex,
        name: "home"
    },
    topicToVueRoute(meta.cs),
    topicToVueRoute(meta.math),
    topicToVueRoute(meta.thoughts),
    topicToVueRoute(meta.projects),
    ...(meta.cs.posts.map(it => postToVueRoute(it, meta.cs))),
    ...(meta.math.posts.map(it => postToVueRoute(it, meta.math))),
    ...(meta.thoughts.posts.map(it => postToVueRoute(it, meta.thoughts))),
    ...(meta.projects.posts.map(it => postToVueRoute(it, meta.projects)))
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router
