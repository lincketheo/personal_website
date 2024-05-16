import { type MetaInformation } from "./models"

export const meta: MetaInformation = {
  cs: {
    route: "/cs",
    prefix: "cs",
    entry: () => import("./cs/CSBlog.vue"),
    nav_title: "Computer Science",
    name: "cs",
    posts: [
      {
        title: "Building a Bootloader",
        date: new Date("2023-04-03"),
        entry: () => import("./cs/posts/building-a-bootloader/BuildingABootloader.vue"),
        route: "/cs/building-a-bootloader",
        description: "I'll build a bootloader from scratch for an Intel x86 32-bit processor in this post. You should have some assembly experience before embarking on your bootloader journey.",
        name: "building-a-bootloader",
        popular: true,
        tags: [
          "Operating Systems",
          "Bootloader"
        ]
      },
      {
        title: "Kotlin and Error Handling",
        date: new Date("2023-02-08"),
        entry: () => import("./cs/posts/kotlin-error-handling/KotlinErrorHandling.vue"),
        route: "/cs/kotlin-error-handling",
        description: "Handling errors cleanly in Kotlin. Which layer do I handle my exceptions and how do I prevent try catch hell?",
        name: "kotlin-error-handling",
        popular: true,
        tags: [
          "Error Handling",
          "Kotlin"
        ]
      }
    ]
  },
  math: {
    route: "/math",
    prefix: "math",
    entry: () => import("./math/MathBlog.vue"),
    nav_title: "Math",
    name: "math",
    posts: [
      {
        title: "Measure Theory",
        date: new Date("2023-02-08"),
        entry: () => import("./math/posts/measure-theory/MeasureTheory.vue"),
        route: "/math/measure-theory",
        description: "In this post, I will first lay the basic analysis groundwork needed to understand Borel Sigma Algebras (and of course, I will also explain sigma algebras). Then I will explain the basics of Measure Theory necessary for defining Lp and weak-Lp spaces in subsequent blog posts.",
        name: "measure-theory",
        popular: false,
        tags: [
          "Error Handling",
          "Kotlin"
        ]
      },
      {
        title: "Cantor, Natural Numbers and Formal Systems",
        date: new Date("2023-05-07"),
        entry: () => import("./math/posts/nn-systems-cantor/NNSystemsCantor.vue"),
        route: "/math/nn-systems-cantor",
        description: "In this post, I will explore some properties of natural numbers and abstract systems in mathematics.",
        name: "nn-systems-cantor",
        popular: true,
        tags: [
          "Natural Numbers",
          "Formal Systems",
          "Set Theory"
        ]
      },
      {
        title: "Some Silly Paradoxes",
        date: new Date("2023-05-14"),
        entry: () => import("./math/posts/paradoxes/SillyParadoxes.vue"),
        route: "/math/silly-paradoxes",
        description: "In this post, I will explore some interesting paradoxes. I'll probably add to this post in the future, but for now, I just want this post to be about some silly little paradoxes that have shown up in math in the past.",
        name: "silly-paradoxes",
        popular: true,
        tags: [
          "Paradoxes"
        ]
      }
    ]
  },
  thoughts: {
    route: "/thoughts",
    prefix: "thoughts",
    entry: () => import("./thoughts/ThoughtsBlog.vue"),
    nav_title: "Thoughts",
    name: "thoughts",
    posts: [
      {
        title: "On Pattern Recognition and Closed Systems",
        date: new Date("2023-05-22"),
        entry: () => import("./thoughts/posts/pattern-recognition/PatternRecognition.vue"),
        route: "/thoughts/pattern-recognition",
        description: "Owl: Whoo, well who-ello my friends, I'm delighted to have you stop by just in time for my extra delicious Banana flavored tea with spam, eggs and fried marmot!",
        name: "pattern-recognition",
        popular: false,
        tags: [
          "Machine Learning"
        ]
      }
    ]
  },
  projects: {
    route: "/projects",
    prefix: "projects",
    entry: () => import("./projects/ProjectsBlog.vue"),
    nav_title: "Projects",
    name: "projects",
    posts: [
    ]
  }
}