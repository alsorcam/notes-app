<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import { useStorage } from '@vueuse/core';

import type { Note } from './types/note';
import { SortBy } from './types/sort';

const storage = useStorage<{ notes: Array<Note>; pinned: Array<Note> }>(
  'notes-store',
  { notes: [], pinned: [] }
);

const isFormOpen = ref(false);
let currentSort = SortBy.NEWEST;
let selectedNote: Note | null = null;

function saveNote(note: Note) {
  if (note.id == null) {
    // Create note
    storage.value.notes.push({ ...note, id: uuid(), creationDate: new Date() });
    sortNotes(currentSort);
  } else {
    // Edit note
    const idx = storage.value.notes.findIndex((item) => item.id === note.id);
    if (idx > -1) {
      storage.value.notes[idx] = note;
    }
  }
  closeForm();
}

function deleteNote(noteId?: string) {
  if (noteId != null) {
    const idx = storage.value.notes.findIndex((item) => item.id === noteId);
    if (idx > -1) {
      storage.value.notes.splice(idx, 1);
    }
    closeForm();
  }
}

function editNote(note: Note) {
  selectedNote = note;
  openForm();
}

function openForm() {
  isFormOpen.value = true;
}

function closeForm() {
  isFormOpen.value = false;
  selectedNote = null;
}

function updatePin(note: Note, isPinned: boolean) {
  note.isPinned = isPinned;
  if (isPinned) {
    const noteIdx = storage.value.notes.findIndex(
      (item) => item.id === note.id
    );
    storage.value.notes.splice(noteIdx, 1);
    storage.value.pinned.push(note);
  } else {
    const noteIdx = storage.value.pinned.findIndex(
      (item) => item.id === note.id
    );
    storage.value.pinned.splice(noteIdx, 1);
    storage.value.notes.push(note);
  }
}

function sortNotes(sortType: SortBy) {
  currentSort = sortType;
  SORT_NOTES[sortType](storage.value.notes);
}
</script>

<template>
  <ClientOnly>
    <UContainer class="flex flex-col gap-9 py-14">
      <div
        class="flex flex-col gap-4 md:flex-row md:justify-between items-center">
        <Username />
        <UButton
          icon="i-heroicons-plus-solid"
          size="xl"
          variant="solid"
          label="Create note"
          :trailing="false"
          @click="openForm()" />
      </div>
      <USlideover v-model="isFormOpen" prevent-close>
        <div class="text-right pt-6 px-8">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="closeForm()" />
        </div>
        <NoteForm
          @save="saveNote($event)"
          @delete="deleteNote($event)"
          v-bind="selectedNote" />
      </USlideover>

      <div class="flex justify-start">
        <SortDropdown @change-sort="sortNotes($event)"></SortDropdown>
      </div>
      <div
        v-if="storage.pinned.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Note
          v-for="note in storage.pinned"
          v-bind="note"
          @click="editNote(note)"
          @togglePin="updatePin(note, $event)"></Note>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Note
          v-for="note in storage.notes"
          v-bind="note"
          @click="editNote(note)"
          @togglePin="updatePin(note, $event)"></Note>
      </div>
    </UContainer>
  </ClientOnly>
</template>
