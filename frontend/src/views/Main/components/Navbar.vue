<template>
  <nav class="flex justify-between items-center px-6 py-4 bg-white shadow">
    <h1 class="text-2xl font-bold text-pink-600">InstaClone</h1>
    <div class="flex gap-4">
      <button @click="logout" class="text-gray-600 hover:text-pink-500">Sair</button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      axios.post('/logout').then(() => {
        window.location.href = '/login'
      })
    }
  }
}
</script>
