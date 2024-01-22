<script setup lang="ts"></script>

<template>
  <UContainer class="flex flex-col gap-12 py-14">
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-4xl sm:text-5xl">Hi, User!</h1>
      <UButton
        icon="i-heroicons-plus-solid"
        size="xl"
        color="primary"
        variant="solid"
        label="Create note"
        :trailing="false" />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <!-- TODO: Display created notes -->
      <Note></Note>
      <Note></Note>
      <Note></Note>
      <Note></Note>
      <Note></Note>
      <Note></Note>
    </div>
  </UContainer>
</template>
