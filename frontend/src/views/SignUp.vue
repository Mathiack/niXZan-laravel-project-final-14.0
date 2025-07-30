<template>
  <div class="sign-up">
    <h1>Sign up</h1>
    <form class="form" @submit.prevent="submitSignUp">

      <div class="input-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>

      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="form.username" required />
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>

      <div class="input-group">
        <label for="password-confirmation">Confirmar senha</label>
        <input type="password" id="password-confirmation" v-model="form.password_confirmation" required />
      </div>

      <button type="submit" :disabled="loading">Sign up</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const form = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const loading = ref(false)
const error = ref(null)

const auth = useAuthStore()
const router = useRouter()

async function submitSignUp() {
  error.value = null
  loading.value = true
  try {
    await auth.register(form)
    router.push('/login')
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      Object.values(err.response?.data?.errors || {})
        .flat()
        .join(', ') ||
      'Erro ao registrar.'
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.input-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.25rem;
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.6rem 1rem;
  border: none;
  background-color: #333;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #555;
}

.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
