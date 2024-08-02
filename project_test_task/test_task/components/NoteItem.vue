<script setup lang="ts">

interface Note {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

const props = defineProps<{ note: Note }>();
const emits = defineEmits(['edit']);
const notesStore = useNotesStore();
const deleted = ref(false)

const showPopup = ref(false);
const selectedNote = ref<Note | null>(null);

const handleClick = () => {
  selectedNote.value = { ...props.note };
  showPopup.value = true;
};

const handlePopupClose = () => {
  showPopup.value = false;
};

const handleNoteUpdate = (updatedNote: Note) => {
  emits('edit', updatedNote);
  notesStore.updateNote(updatedNote);
  showPopup.value = false;
};

const handleDeleteNote = () => {
  notesStore.deleteNote(props.note.id);
};
</script>




<template>
  <section>
    <div class="NoteItem__section">
      <div class="NoteItem__deleteItem" :class="{ NoteItem__deleteItemAnimation: deleted }"
        @click.stop="handleDeleteNote">
        <img src="/public/img/delete_note.png" />
      </div>
      <div class="NoteItem__area" @click="handleClick">
        <h3 class="NoteItem__title">{{ note.title }}</h3>
        <p class="NoteItem__subtitle">{{ note.body }}</p>
      </div>
    </div>

    <Popup v-if="showPopup && selectedNote" 
      :isNew="false" 
      :note="selectedNote" 
      @close="handlePopupClose"
      @update="handleNoteUpdate" />
  </section>
</template>




<style lang="scss">
.NoteItem__section {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.NoteItem__section:hover {
  background-color: #e0e0e0;
  transform: scale(1.02);
}

.NoteItem__deleteItem {
  position: relative;

  cursor: pointer;

  img {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
  }

}

.NoteItem__area {
  margin-right: 20px;
}

.NoteItem__deleteItemAnimation {
  transition: 0.2 ease-in-out;
}

.NoteItem__title {
  font-size: 18px;
  margin: 0;
  color: #333;
}

.NoteItem__subtitle {
  font-size: 10px;
  color: #666;
  margin-top: 5px;
}
</style>
