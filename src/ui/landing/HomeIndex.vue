<script setup lang="ts">
</script>

<template>
  <main>
    <div class="grid-cols-4 grid gap-16">
      <p class="col-span-3">
        Software development is a young profession, and we are still learning the techniques and building the tools to
        do
        it effectively. I've been involved in this activity for over three decades and in the last two I've been writing
        on this website about patterns and practices that make it easier to build useful software. The site began as a
        place to put my own writing, but I also use it to publish articles by my colleagues. In 2000, I joined
        Thoughtworks, where my role is to learn about the techniques that we've learned to deliver
        software for our clients, and pass these techniques on to the wider software industry. As this site has
        developed
        into a respected platform on software development, I've edited and published articles by my colleagues, both
        ThoughtWorkers and others, to help useful writing reach a wider audience.
      </p>
      <div class="col-span-1 flex flex-col items-center h-[500px]">
        <div>
          <img class="w-[200px] h-[200px]" src="@/assets/myface.jpg" alt="My Face"/>
          <h5 class="font-bold pt-10">Theo Lincke</h5>
        </div>
      </div>
    </div>
    <div class="grid-cols-3 grid gap-16">
      <div class="col-span-2">
        <h1 class="text-xl">A Website for Some of my Musings</h1>
        <p>
          I have a hard time focusing in on one area of computer science.
          I went from programming in Android/Spring Boot to designing systems
          code in C. I like to write TLS servers in C, then the next day open up
          my Kotlin notes to programming something in a higher level language.
          ...
        </p>
      </div>
      <div class="col-span-1">
        <h1 class="text-xl">Recent</h1>
        <p>
          If you'd like to be notified when I post
          new material, subcribe to my RSS, Twitter,
          or Mastodon feeds. I also
          have a page dedicated to recent changes.
        </p>
        <hr class="rounded">
        <p class="font-bold">Bliki: DiffDebugging</p>
        <p>Regression bugs are newly appeared bugs in features of the software that have been around for a while. When
          hunting them, it usually valuable to figure out which change in the software caused them to appear. Looking at
          that change can give invaluable clues about where the bug is and how to squash it. There isn't a well-known
          term for this form of investigation, but I call it Diff Debugging.
        </p>
        <a class="underline">more...</a>
        <hr class="rounded">
        <p class="font-bold">Bliki: DiffDebugging</p>
        <p>Regression bugs are newly appeared bugs in features of the software that have been around for a while. When
          hunting them, it usually valuable to figure out which change in the software caused them to appear. Looking at
          that change can give invaluable clues about where the bug is and how to squash it. There isn't a well-known
          term for this form of investigation, but I call it Diff Debugging.
        </p>
        <a class="underline">more...</a>
        <hr class="rounded">
        <p class="font-bold">Bliki: DiffDebugging</p>
        <p>Regression bugs are newly appeared bugs in features of the software that have been around for a while. When
          hunting them, it usually valuable to figure out which change in the software caused them to appear. Looking at
          that change can give invaluable clues about where the bug is and how to squash it. There isn't a well-known
          term for this form of investigation, but I call it Diff Debugging.
        </p>
        <a class="underline">more...</a>
        <hr class="rounded">
        <p class="font-bold">Bliki: DiffDebugging</p>
        <p>Regression bugs are newly appeared bugs in features of the software that have been around for a while. When
          hunting them, it usually valuable to figure out which change in the software caused them to appear. Looking at
          that change can give invaluable clues about where the bug is and how to squash it. There isn't a well-known
          term for this form of investigation, but I call it Diff Debugging.
        </p>
        <a class="underline">more...</a>
      </div>
    </div>
  </main>
</template>
