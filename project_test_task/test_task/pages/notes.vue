<script setup lang="ts">

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push('/');
};

</script>




<template>
  <section class="Notes__section">
    <div class="Notes__items">
      <h2 class="Notes__h2">Мои заметки</h2>
      <button class="Notes__btn" @click="logout">Выйти</button>
    </div>
    <NotesList />
  </section>

</template>




<style lang="scss">
.Notes__section {
  background-color: black;
  padding: 50px 100px;
  width: 100%;
  min-height: 100vh;
}

.Notes__items {
  display: flex;
  align-items: center;
  position: relative;
}

.Notes__h2 {
  color: aliceblue;
  font-size: 48px;
}

.Notes__btn {
  position: absolute;
  right: 0;
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

</style>
