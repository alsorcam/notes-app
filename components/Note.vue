<script setup lang="ts">
defineProps({
  id: String,
  title: String,
  text: String,
});
</script>

<template>
  <div
    class="bg-primary-200 transition duration-300 hover:shadow-lg border-transparent border-2 hover:border-primary-400 flex flex-col gap-4 py-4 px-5 rounded-lg h-48 cursor-pointer">
    <h2>{{ title }}</h2>
    <p class="text-sm text-wrap truncate text-gray-800">
      {{ text }}
    </p>
  </div>
</template>
