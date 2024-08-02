<script setup lang="ts">

interface Note {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

const notesStore = useNotesStore();
const showPopup = ref<boolean>(false);
const isCreatingNewNote = ref<boolean>(false);
const selectedNote = ref<Note | null>(null);
const displayedNotesCount = ref<number>(9);

const hasMoreNotes = computed(() => notesStore.notes.length > displayedNotesCount.value);

const visibleNotes = computed(() => {
  return notesStore.notes
    .slice()
    .sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, displayedNotesCount.value);
});

const openPopup = (isNew: boolean, note: Note | null = null) => {
  isCreatingNewNote.value = isNew;
  selectedNote.value = note;
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
};

const handleNoteUpdate = (updatedNote: Note) => {
  if (isCreatingNewNote.value) {
    notesStore.notes.unshift(updatedNote);
  } else {
    notesStore.updateNote(updatedNote);
  }
  closePopup();
};

const loadMoreNotes = () => {
  displayedNotesCount.value += 9;
};

onMounted(() => {
  notesStore.initializeNotes();
});
</script>





<template>
  <section class="NotesList__area">
    <button class="NotesList__addNote" @click="openPopup(true)">Добавить заметку</button>
    <div class="NotesList__section">
      <NoteItem v-for="note in visibleNotes" :key="note.id" :note="note" />
    </div>
    <div class="NotesList__btnArea">
      <button class="NotesList__loadMoreNotes" v-if="hasMoreNotes" @click="loadMoreNotes">
        Загрузить ещё...
      </button>
    </div>
    <Popup v-if="showPopup"
      :note="isCreatingNewNote ? { id: Date.now(), title: '', subtitle: '', createdAt: new Date().toISOString() } : null"
      :isNew="isCreatingNewNote" @close="closePopup" @update="handleNoteUpdate" />

  </section>
</template>




<style lang="scss">
.NotesList__area {
  padding-top: 20px;
}

.NotesList__addNote {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #5e6ee8;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #4d5cc1;
  }
}

.NotesList__btnArea {
  display: flex;
  justify-content: center;
  align-items: center;
}

.NotesList__loadMoreNotes {
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #60616f;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #afb3ba;
  }
}

.NotesList__section {
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}


@media screen and (max-width: 1200px) {
  .NotesList__section {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 920px) {
  .NotesList__section {
    grid-template-columns: 1fr;
  }
}
</style>
