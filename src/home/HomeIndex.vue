<script setup lang="ts">
  import {meta} from "@/meta"

const all = meta.cs.posts
    .concat(meta.math.posts)
    .sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1)

const recent = all.slice(0, 4)
const popular = all.filter(it => it.popular)

</script>

<template>
  <div class="grid-cols-3 grid gap-16">
    <div class="col-span-2 p-10">
      <p class="indent-5">

      Hi there. Welcome to my website. I'm a software engineer. Here are some of my
      favorites:
      <ul class=py-5>
        <li><span class="font-bold">Programming Language:</span> C</li>
        <li><span class="font-bold">Linux Distro:</span> Ubuntu</li>
        <li><span class="font-bold">Python Library:</span> numpy</li>
        <li><span class="font-bold">Text Editor:</span> Neovim</li>
        <li><span class="font-bold">Bash Command:</span> awk</li>
      </ul>
      </p>
      <p class="indent-5">
      This is a website for me to talk about software engineering, math, 
      and philosophy. Please keep in mind that any opinions and / or 
      thoughts represented on this website are purely my own and do not
      reflect the opinion of my employer.
      </p>
      <br>
    </div>
    <div class="col-span-1 flex flex-col items-center justify-center">
      <div>
        <img class="rounded-full" src="@/assets/theo-avatar.webp" alt="My Face"/>
      </div>
    </div>
  </div>
  <div class="grid-cols-3 grid gap-16">
    <div class="col-span-2">
      <div class="mb-5">
        <h1 class="font-bold text-2xl">How's this website built?</h1>
        <p class="indent-5">
        I'm not primarily a front end developer; but I like to dabble. 
        I put this together in Vue3. It's running 
        inside a Kubernetes Cluster on a Linode Server. 
        Is this overengineering? Yes! My hope is to 
        further expand my <a href="https://github.com/lincketheo/homelab" class="underline text-primary dark:text-primary-dark">homelab</a> as my projects start to 
        grow and I have more than 5 square feet to live in. There's also some CI/CD 
        and cloudflare sprinkled in here too.
        </p>
      </div>
      <div>
        <h1 class="text-xl">Popular</h1>
        <div class="grid grid-cols-2 gap-4 p-10 bg-surface dark:bg-surface-dark">
          <div class="text-on-surface dark:text-on-surface" v-for="post in popular" v-bind:key='post'>
            <p class="font-bold">{{ post.title }}</p>
            <p>
            {{ post.description }}
            </p>
            <a :href="post.route">more...</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-1 bg-surface dark:bg-surface-dark text-on-surface dark:text-on-surface-dark p-5">
      <h1 class="text-xl">Recent</h1>
      <hr class="rounded">
      <div class="p-4" v-for="post in recent" :key="post.name">
        <a :href="post.route" class="font-bold">{{ post.title }}</a>
        <p class="font-light italic">{{ post.date.toLocaleDateString() }}</p>
        <p>
        {{ post.description }}
        </p>
        <a :href="post.route">more...</a>
      </div>
    </div>
  </div>
</template>
