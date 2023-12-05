import {createRouter, createWebHistory} from 'vue-router'
import HomeIndex from '@/home/HomeIndex.vue'
import meta from "@/meta.json"

// TODO - might want to add types to this meta blob
const _meta = meta as any

const blog_routes = Object.keys(_meta).map(key => {
    return {
        path: _meta[key].route,
        component: () => import("../" + _meta[key].entry + ".vue"),
        name: _meta[key].name
    }
})

const main_routes = [
    {
        path: '/',
        component: HomeIndex,
        name: "home"
    },
    ...blog_routes
]

const sub_routes = Object.keys(_meta).flatMap(key => {
    const posts: any[] = _meta[key].posts
    return posts.map(post => {
        const full_entry = `/${_meta[key].prefix}/${post.entry}`
        return {
            path: _meta[key].route + post.route,
            component: () => import("../" + full_entry + ".vue"),
            name: post.name,
        }
    })
})

const routes = [...main_routes, ...sub_routes]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router
