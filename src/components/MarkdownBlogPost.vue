<script setup lang="ts">
import {computed, ref} from "vue";
import {marked} from "marked";

const props = defineProps<{ route: string, mathjaxmsg?: boolean }>()

const mkdata = ref("")
const mkhtml = computed(() => {
  return marked(mkdata.value)
})
fetch(props.route).then(async it => {
  mkdata.value = await it.text()
})
</script>

<template>
  <p v-if="mathjaxmsg" class="pb-10 italic">Some of the formula on this page are rendered using MathJax. If they don't
    render immediately, you can just hard reload (Ctrl+Shift+R).</p>
  <div class="flex-row justify-center">
    <article class="prose max-w-none dark:prose-invert" v-html="mkhtml"></article>
  </div>
</template>
