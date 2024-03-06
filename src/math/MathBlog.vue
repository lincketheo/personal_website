<template>
  <div class="hello">
    <textarea v-model="formula" />
    <vue-mathjax :formula="formula" />
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
const formula = ref('$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$')

onMounted(() => {

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  min-height: 60px;
}
</style>


