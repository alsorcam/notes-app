<script setup lang="ts">
const props = defineProps({
  id: String,
  title: String,
  text: String,
  isPinned: Boolean,
  creationDate: Date,
});
const emit = defineEmits(['togglePin']);
const isHover = ref(false);
const creationDate = computed(() => {
  return props.creationDate?.toLocaleString();
});

function togglePin(event: PointerEvent) {
  event.stopPropagation();
  emit('togglePin', !props.isPinned);
}
</script>

<template>
  <div
    class="bg-primary-200 transition duration-300 hover:shadow-lg border-transparent border-2 hover:border-primary-400 flex flex-col justify-between gap-4 py-4 px-5 rounded-lg cursor-pointer"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false">
    <div class="flex justify-between items-start gap-2">
      <h2 class="truncate text-primary-800">{{ title }}</h2>
      <UButton
        v-if="isPinned || isHover"
        icon="i-mdi-pin"
        size="sm"
        color="primary"
        square
        variant="solid"
        @click="togglePin($event)" />
    </div>
    <p class="text-sm text-gray-800 truncate">
      {{ text }}
    </p>
    <p class="text-sm text-gray-500">
      {{ creationDate }}
    </p>
  </div>
</template>
