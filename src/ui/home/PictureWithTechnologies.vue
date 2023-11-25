<script setup lang="ts">

</script>

<template>
  <div class="main-container">
    <div class="circle-element-container" style="--total: 6">
      <img class="absolute rounded-full center-image" src="@/assets/myface.jpg" alt="Face Picture">
      <img class="circle-element" style="--i:1" src="@/assets/Android-Logo-2014.png" alt="Android Logo">
      <img class="circle-element" style="--i:2" src="@/assets/IOS.png" alt="IOS Logo">
      <img class="circle-element" style="--i:3" src="@/assets/Kotlin.png" alt="Kotlin">
      <img class="circle-element rounded-full" style="--i:4" src="@/assets/springboot.png" alt="Spring Boot">
      <img class="circle-element" style="--i:5" src="@/assets/clogo.png" alt="C Logo">
      <img class="circle-element" style="--i:6" src="@/assets/linuxlogo.png" alt="Linux Logo">
    </div>
  </div>
</template>

<style scoped lang="scss">

.main-container{
  width: 100%;
  aspect-ratio: 1;
}

@mixin styling($circumference-span) {
  // No hover
  $div-radius: 10vw;
  $circumference-offset: 0turn; // Offset on the circumference

  .circle-element-container {
    display: grid;
    grid-template-areas: "layer";
    place-items: center;

    // Container is 2 x radius
    width: calc(2 * $div-radius);
    height: calc(2 * $div-radius);

    // For help
  }

  .center-image {
    width: calc(2 * 0.5 * $div-radius);
    height: calc(2 * 0.5 * $div-radius);
  }

  .circle-element {
    grid-area: layer;
    width: calc(2 * 0.2 * $div-radius);
    height: calc(2 * 0.2 * $div-radius);

    $element-fraction: calc(var(--i) / var(--total));
    $circumference-position: calc($circumference-span * $element-fraction + $circumference-offset);

    // Transform the elements
    $transform: rotate($circumference-position) translate(calc(0.75 * $div-radius)) rotate(calc(-1 * $circumference-position));

    transform: $transform;
    transition: transform 1.5s ease-out;
  }
}

@media (min-width: 1000px) {
  @include styling(0.5turn);
  .circle-element-container:hover {
    @include styling(-1turn);
  }
}

</style>
