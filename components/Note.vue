<script setup lang="ts">
const props = defineProps({
  id: String,
  title: String,
  text: String,
});
</script>

<template>
  <div class="flex flex-col gap-4 items-center grow cursor-pointer">
    <div
      class="h-64 w-full border border-gray-500 py-2 px-3 rounded-lg text-xs text-wrap text-gray-600 truncate">
      {{ text }}
    </div>
    <span class="font-bold">{{ title }}</span>
  </div>
</template>
