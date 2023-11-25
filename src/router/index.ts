import {createRouter, createWebHistory} from 'vue-router'
import HomeIndex from '@/ui/landing/HomeIndex.vue'
import CSIndex from "@/ui/landing/CSIndex.vue"
import MathIndex from "@/ui/landing/MathIndex.vue"
import SWEIndex from "@/ui/landing/SWEIndex.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeIndex
        },
        {
            path: '/cs',
            name: 'cs',
            component: CSIndex
        },
        {
            path: '/math',
            name: 'math',
            component: MathIndex
        },
        {
            path: '/swe',
            name: 'swe',
            component: SWEIndex
        },
    ]
})

export default router
