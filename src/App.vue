<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/swe">Software Engineering</RouterLink>
          </li>
          <li>
            <RouterLink to="/cs">Computer Science</RouterLink>
          </li>
          <li>
            <RouterLink to="/math">Math</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <RouterView/>
</template>

<style scoped>
</style>
