<script setup lang="ts">
import PictureWithTechnologies from "@/ui/home/PictureWithTechnologies.vue";
</script>

<template>
  <div class="grid grid-cols-3">
    <div class="col-span-3 min-[1000px]:col-span-2 text-2xl text-left">
      <div class="flex justify-start">
        <p class="pb-16 w-[600px]">
          I build rapid full stack apps consisting of
          <span class="text-androidGreen font-bold">Android</span>,
          <span class="text-iphoneSilver font-bold">IOS</span>,
          <span class="text-springBootGreen font-bold">Spring Boot</span>, and
          <span class="text-vueGreen font-bold">Vue</span> in
          my free time.
        </p>
      </div>
      <div class="flex justify-start">
        <p class="py-16 w-[600px]">
          I think about software architecture patterns so I can break
          domain-specific language barriers.
        </p>
      </div>
      <div class="flex justify-end">
        <p class="py-16 w-[600px]">
          I received my
          <span class="text-appliedMathBlue font-bold">Applied Math</span>
          and
          <span class="text-cuBoulderGold font-bold">Computer Science</span>
          undergraduate degrees from the
          <span class="text-cuBoulderGold font-bold">University of</span>
          <span class="text-cuBoulderLightGray font-bold"> Colorado</span>,
          <span class="text-cuBoulderGold font-bold">Boulder</span>
        </p>
      </div>
      <div class="flex justify-end">
        <p class="py-16 w-[600px]">
          And I like dancing, swimming and lifting
        </p>
      </div>
    </div>
    <div class="min-[2000px]:col-span-1 text-3xl text-right invisible min-[2000px]:visible">
      <p>
        Hello, I'm Theo
      </p>
      <div class="invisible min-[1000px]:visible">
        <PictureWithTechnologies/>
      </div>
    </div>
  </div>


</template>
