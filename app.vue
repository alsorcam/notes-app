<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import type { Note } from './types/note';

const isFormOpen = ref(false);
let selectedNote: Note | null = null;
const notes: Array<Note> = reactive([
  {
    id: uuid(),
    title: 'Note 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isPinned: false,
    creationDate: new Date(),
  },
  {
    id: uuid(),
    title: 'Note 2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isPinned: false,
    creationDate: new Date(),
  },
  {
    id: uuid(),
    title:
      'Note 3 - Very long name for testing purposes to check how much looks good in here',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isPinned: false,
    creationDate: new Date(),
  },
]);

const pinned: Array<Note> = reactive([]);

function saveNote(note: Note) {
  if (note.id == null) {
    // Create note
    notes.push({ ...note, id: uuid(), creationDate: new Date() });
  } else {
    // Edit note
    const idx = notes.findIndex((item) => item.id === note.id);
    if (idx > -1) {
      notes[idx] = note;
    }
  }
  closeForm();
}

function deleteNote(noteId?: string) {
  if (noteId != null) {
    const idx = notes.findIndex((item) => item.id === noteId);
    if (idx > -1) {
      notes.splice(idx, 1);
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
    const noteIdx = notes.findIndex((item) => item.id === note.id);
    notes.splice(noteIdx, 1);
    pinned.push(note);
  } else {
    const noteIdx = pinned.findIndex((item) => item.id === note.id);
    pinned.splice(noteIdx, 1);
    notes.push(note);
  }
}
</script>

<template>
  <UContainer class="flex flex-col gap-12 py-14">
    <div class="flex justify-between items-center">
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

    <div
      v-if="pinned.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Note
        v-for="note in pinned"
        v-bind="note"
        @click="editNote(note)"
        @togglePin="updatePin(note, $event)"></Note>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Note
        v-for="note in notes"
        v-bind="note"
        @click="editNote(note)"
        @togglePin="updatePin(note, $event)"></Note>
    </div>
  </UContainer>
</template>
