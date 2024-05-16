<script setup lang="ts">
import {meta} from "@/meta"

const all = meta.cs.posts
    .concat(meta.math.posts)
    .sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1)

const recent = all.slice(0, 4)
const popular = all.filter(it => it.popular)

</script>

<template>
  <div class="grid-cols-4 grid gap-16">
    <div class="col-span-3 p-10">
      <p class="indent-5">
        Software Engineering is a complex blend of mathematics, philosophy, logic and business.
        It's so infantile that we haven't yet been able to fully split it up into appreciable
        domains like we have for other professions, although we are starting. At the core,
        Software Engineering is about managing information. From simplifying complex code bases
        to reducing runtime of an algorithm, all of which are examples of picking away concrete
        details to verify the root of the system: information. This blog isn't really a professional
        portfolio, but it may turn into one over time. I'll probably write a
        quick post for some of my personal projects, but mostly it's just a place for me to express my thoughts.
        My projects focus on whatever I want to learn at the time of execution.
        I only specialize for my job. My personal projects range from full stack applications
        in Kotlin to low level C TLS servers.
      </p>
      <p class="indent-5">
        Any opinions and / or thoughts represented on this website are purely my own and do not
        reflect the opinion of my employer.
      </p>
      <br>
      <ul class="list-disc">
        <li><span class="font-bold">Computer Science</span>: A collection of posts surrounding computer science and
          software engineering.
          Many will argue that some of the more "engineering"-y posts don't belong in a "science" category,
          but I thought an extra page dedicated to engineering would be overkill.
          There may be some intersection with math here, if I get a little bit more theoretical.
        </li>
        <li><span class="font-bold">Math</span>: Math posts. At this point, my applied mathematics degree is mostly
          a fancy piece of paper. I've largely lost a lot of the rigorous proof-based math I learned in college,
          so don't expect much too formal here.
        </li>
        <li><span class="font-bold">Thoughts</span>: I couldn't think of another name. This will be for "everything
          else". Philosophy, to politics to random thoughts I've had.
        </li>
      </ul>
    </div>
    <div class="col-span-1 flex flex-col items-center">
      <div>
        <img src="@/assets/dog.jpg" alt="My Face"/>
        <h5 class="font-bold pt-10">^ Not Theo Lincke</h5>
      </div>
    </div>
  </div>
  <div class="grid-cols-3 grid gap-16">
    <div class="col-span-2">
      <div class="mb-5">
        <h1 class="font-bold text-2xl">How's this website built?</h1>
        <p class="indent-5">
          This website is built using Vue3. I'm self hosting the website using a Kubernetes cluster
          in my <a href="https://github.com/lincketheo/homelab" class="underline text-primary dark:text-primary-dark">homelab</a>.
          It's self contained in a single Docker Container with an nginx proxy.
        </p>
      </div>
      <div>
        <h1 class="text-xl">Popular</h1>
        <div class="grid grid-cols-2 gap-4 p-10 bg-surface dark:bg-surface-dark">
          <div v-for="post in popular">
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
