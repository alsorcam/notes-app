<script setup lang="ts">
const props = defineProps({
  id: String,
  title: String,
  text: String,
  isPinned: Boolean,
});
const emit = defineEmits(['togglePin']);
const isHover = ref(false);

function togglePin(event: PointerEvent) {
  event.stopPropagation();
  emit('togglePin', !props.isPinned);
}
</script>

<template>
  <div
    class="bg-primary-200 transition duration-300 hover:shadow-lg border-transparent border-2 hover:border-primary-400 flex flex-col gap-4 py-4 px-5 rounded-lg h-48 cursor-pointer"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false">
    <div class="flex justify-between">
      <h2>{{ title }}</h2>
      <UButton
        v-if="isPinned || isHover"
        icon="i-mdi-pin"
        size="sm"
        color="primary"
        square
        variant="link"
        @click="togglePin($event)" />
    </div>
    <p class="text-sm text-wrap truncate text-gray-800">
      {{ text }}
    </p>
  </div>
</template>
