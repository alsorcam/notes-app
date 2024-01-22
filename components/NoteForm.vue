<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';

interface NoteFormFields {
  title: string;
  text: string;
}

const props = defineProps({
  id: String,
  title: String,
  text: String,
});

const state = reactive({
  title: props.title ?? undefined,
  text: props.text ?? undefined,
});

const emit = defineEmits(['save', 'delete']);

function onDelete() {
  emit('delete', props.id);
}

async function onSubmit(event: FormSubmitEvent<NoteFormFields>) {
  emit('save', {
    id: props.id,
    title: event.data.title,
    text: event.data.text,
  });
}
</script>

<template>
  <UForm
    class="flex flex-col gap-9 py-6 px-8"
    :state="state"
    @submit="onSubmit">
    <div class="flex flex-col gap-4">
      <UInput
        placeholder="Title for your note"
        v-model="state.title"
        size="lg" />
      <UTextarea
        placeholder="Write something here..."
        name="text"
        v-model="state.text"
        :rows="12"
        size="lg" />
    </div>

    <div class="flex flex-col gap-2">
      <UButton
        v-if="id"
        variant="outline"
        label="Delete"
        block
        @click="onDelete()" />
      <UButton variant="solid" label="Save" type="submit" block />
    </div>
  </UForm>
</template>
