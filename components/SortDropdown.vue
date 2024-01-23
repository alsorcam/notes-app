<script setup lang="ts">
import type { DropdownItem } from '@nuxt/ui/dist/runtime/types';
import { SortBy } from '../types/sort';

const emit = defineEmits(['changeSort']);

let currentSort = SortBy.NEWEST;
const items: DropdownItem[][] = [
  [
    {
      label: SortBy.NEWEST,
      click: () => {
        updateSort(SortBy.NEWEST);
      },
    },
    {
      label: SortBy.OLDEST,
      click: () => {
        updateSort(SortBy.OLDEST);
      },
    },
    {
      label: SortBy.A_Z,
      click: () => {
        updateSort(SortBy.A_Z);
      },
    },
    {
      label: SortBy.Z_A,
      click: () => {
        updateSort(SortBy.Z_A);
      },
    },
  ],
];

function updateSort(sortType: SortBy) {
  currentSort = sortType;
  emit('changeSort', sortType);
}
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton
      label="Sort by"
      class="hover:no-underline"
      color="black"
      variant="link"
      trailing-icon="i-heroicons-chevron-down-20-solid" />

    <template #item="{ item }">
      <span
        class="truncate"
        :class="{ 'font-bold': item.label === currentSort }"
        >{{ item.label }}</span
      >
      <UIcon
        v-if="item.label === currentSort"
        name="i-heroicons-check-20-solid"
        class="flex-shrink-0 h-4 w-4 ms-auto" />
    </template>
  </UDropdown>
</template>
