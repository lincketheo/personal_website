<script setup lang="ts">
import meta from "../meta.json"

const all = meta.cs.posts
    .concat(meta.math.posts)
    .sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1)

const recent = all.slice(0, 4)
const popular = all.filter(it => it.popular)

/**
 const recent = all.sort((a: any, b: any) => {
 const aDate = new Date(a.date)
 const bDate = new Date(b.date)
 return aDate > bDate
 })
 **/
</script>

<template>
  <main class="mx-10">
    <div class="grid-cols-4 grid gap-16">
      <p class="col-span-3 p-10">
        Software Engineering is a complex blend of mathematics, philosophy, logic and business.
        I believe it's

        It's so infantile that we haven't yet been able to fully split it up into appreciable
        domains like we have for other professions, although we are starting. At the core,
        Software Engineering is about managing information. From simplifying complex code bases
        to reducing runtime of an algorithm, all of which are examples of picking away concrete
        details to verify the root of the system: information.
        <br>
        <br>
        I'm interested in how information is expressed in computer programs. There are robust fields of
        Software Engineering like digital signal processing with low levels of shannon entropy
        and entropy-rich fields like Machine Learning and a steady dance between the two fields to
        squeeze as much complexity into a single controlled component. My interests are in evolving
        computer science. I believe certain underrepresented fields of
        computer science could make another emergence (where underrepresented == "something that
        isn't machine learning"). For starters, programming languages are pretty limited.
        <br>
        <br>
        It's my hope that this blog appeals to most professionals out there. I will attempt to
        keep my tone informal and just talk about the nitty gritty details of computer science.
        I don't keep this blog for any other reasons than to explore cool things in the field of
        information. Enjoy!
      </p>
      <div class="col-span-1 flex flex-col items-center">
        <div>
          <img class="w-[200px] h-[200px]" src="@/assets/myface.jpg" alt="My Face"/>
          <h5 class="font-bold pt-10">Theo Lincke</h5>
        </div>
      </div>
    </div>
    <div class="grid-cols-3 grid gap-16">
      <div class="col-span-2">
        <div>
          <h1 class="font-bold text-2xl">A Website for Some of my Musings</h1>
          <p class="p-10">
            My projects focus on whatever I want to learn at the time of execution.
            To an industry person: "I'm an Android/Spring Boot Engineer". To anybody else,
            I'm whatever I want to be the day I built my project. From full stack applications
            in Kotlin to low level C TLS servers. I'll only specialize for my job. E.g.
            I'll always be the best Android/Spring Boot developer that I can be in my professional life.
            However, when I leave work, I'll build whatever I want to build.
          </p>
        </div>
        <div>
          <h1 class="text-xl">Popular</h1>
          <div class="grid grid-cols-2 gap-4 p-10 border-solid border-2">
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
      <div class="col-span-1">
        <h1 class="text-xl">Recent</h1>
        <div v-for="post in recent" :key="post.name">
          <hr class="rounded">
          <p class="font-bold">{{ post.title }}</p>
          <p>
            {{ post.description }}
          </p>
          <a :href="post.route">more...</a>
        </div>
      </div>
    </div>
  </main>
</template>
