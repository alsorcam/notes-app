<script setup lang="ts">
const username = ref(undefined);
const isEditing = ref(false);
</script>

<template>
  <h1 class="flex font-bold text-4xl sm:text-5xl">
    <span class="mr-1">Hi,</span>
    <span v-if="!isEditing" class="cursor-pointer" @click="isEditing = true">
      {{ username ?? "what's your name?" }}
    </span>
    <UInput
      v-if="isEditing"
      variant="none"
      inputClass="text-4xl sm:text-4xl border-b border-black rounded-none"
      v-model="username"
      placeholder="what's your name?"
      @keyup.enter="isEditing = false" />
    <UButton
      v-if="!isEditing"
      class="ml-4"
      icon="i-heroicons-pencil-square"
      size="xl"
      color="primary"
      square
      variant="ghost"
      @click="isEditing = true" />
  </h1>
</template>
