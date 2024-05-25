import type {RouteRecordRaw} from "vue-router";

export interface MetaInformation {
    cs: Topic
    math: Topic
    thoughts: Topic
}

interface Topic {
    route: string
    prefix: string
    entry: any
    nav_title: string
    name: string
    posts: Post[]
}

interface Post {
    title: string
    date: Date
    entry: any
    route: string
    description: string
    name: string
    popular: boolean
    tags: string[]
}

//////////////////// UI Layer
export function topicToVueRoute(topic: Topic): RouteRecordRaw {
    return {
        path: topic.route,
        component: topic.entry,
        name: topic.name
    }
}

export function postToVueRoute(post: Post, topic: Topic): RouteRecordRaw {
    return {
        path: post.route,
        component: post.entry,
        name: post.name
    }
}