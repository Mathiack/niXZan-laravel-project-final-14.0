<template>
  <div class="login">
    <h1>Login</h1>

    <form class="form" @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()

const handleLogin = async () => {
  try {
    await auth.login({ email: email.value, password: password.value })
    // redirecionamento ou feedback
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    // opcional: exibir mensagem de erro ao usuário
  }
}
</script>

<style scoped>
.register {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

input, select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
}

input:focus, select:focus {
  outline: none;
  border-color: #665;
  background-color: #f0f0f0;
}

button {
  padding: 0.75rem 1.25rem;
  border: none;
  background-color: #222;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #444;
}

.error {
  color: crimson;
  margin-top: 1rem;
  font-size: 0.95rem;
  text-align: center;
}

@media (min-width: 1024px) {
  .register {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
  }
}
</style>
