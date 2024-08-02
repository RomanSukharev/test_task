<script setup lang="ts">

const authStore = useAuthStore();
const router = useRouter();

const username = ref<string>('');
const password = ref<string>('');
const hasError = ref<boolean>(false);

const login = async () => {
  try {
    await authStore.login(username.value, password.value);
    router.push('/notes');
  } catch (error) {
    console.error('Login failed', error);
    hasError.value = true;
    setTimeout(() => hasError.value = false, 1000); 
  }
};
</script>




<template>
  <section class="LoginForm__wrapper">
    <div :class="['LoginForm__container', { 'LoginForm__error': hasError }]">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="LoginForm__inputGroup">
          <input type="text" v-model="username" placeholder="Username" required />
        </div>
        <div class="LoginForm__inputGroup">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit" class="LoginForm__button">Login</button>
      </form>
    </div>
  </section>
</template>




<style lang="scss">
.LoginForm__wrapper {
  margin-top: 15%;
}

.LoginForm__container {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.LoginForm__error {
  animation: shake 0.8s cubic-bezier(.36, .07, .19, .97) both;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.LoginForm__inputGroup {
  margin-bottom: 15px;
}

.LoginForm__inputGroup input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}


.LoginForm__button {
  width: 100%;
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