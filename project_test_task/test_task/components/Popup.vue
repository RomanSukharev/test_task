<script setup lang="ts">

interface Note {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

const props = defineProps<{
  note: Note | any;
  isNew: boolean;
}>();

const emit = defineEmits(['close', 'update']);

const notesStore = useNotesStore();

const is_hidden = ref(false);
const isClosing = ref(false);
const title = ref(props.note.title);
const body = ref(props.note.body);

const saveChanges = async () => {
  if (isClosing.value) return;
  isClosing.value = true;
  if (props.isNew) {
    await notesStore.createNote(title.value, body.value);
  } else {
    await notesStore.updateNote({
      id: props.note.id,
      title: title.value,
      body: body.value,
      created_at: props.note.created_at
    });
  }
  is_hidden.value = true;
  setTimeout(() => {
    emit('close');
    isClosing.value = false; 
  }, 380);
};

const closePopup = () => {
  if (isClosing.value) return;
  is_hidden.value = true;
  setTimeout(() => {
    emit('close');
    isClosing.value = false;
  }, 380);
};

watch(() => props.note, (newNote: Note) => {
  if (!is_hidden.value) {
    title.value = newNote.title;
    body.value = newNote.body;
  }
}, { immediate: true });

var scrollWidth = 0;

onMounted(() => {
  scrollWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollWidth}px`;
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = `0px`;
});
</script>




<template>
  <section class="Popup__overlay" @click.self="closePopup">
    <div class="Popup__content" :class="{ Popup__contentHidden: is_hidden }">
      <h2>Заметочка</h2>
      <label for="title">Название:</label>
      <input id="title" v-model="title" type="text" />
      <label for="body">Описание:</label>
      <input id="body" v-model="body" type="text" />
      <button class="Popup__btnSave" @click="saveChanges">Сохранить</button>
      <button class="Popup__btnClose" @click="closePopup">Закрыть</button>
    </div>
  </section>
</template>




<style lang="scss">
.Popup__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.Popup__content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  animation: slidein 0.4s;
}

.Popup__contentHidden {
  animation: slideout 0.4s;
}

.Popup__content h2 {
  margin-top: 0;
}

.Popup__content label {
  display: block;
  margin-bottom: 5px;
}

.Popup__content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.Popup__btnSave {
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #5e6ee8;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transition: 0.2s ease-in-out;
    background-color: #4d5cc1;
  }
}

.Popup__btnClose {
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #e85656;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transition: 0.2s ease-in-out;
    background-color: #c93a3a;
  }
}
</style>
