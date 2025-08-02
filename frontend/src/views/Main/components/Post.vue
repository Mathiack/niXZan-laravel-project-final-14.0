<template>
  <div class="bg-white rounded shadow-md p-4 mb-6">
    <div class="flex items-center mb-4">
      <img :src="post.user.avatar" class="w-10 h-10 rounded-full mr-3" />
      <h2 class="font-semibold">{{ post.user.name }}</h2>
    </div>
    <img :src="post.image" class="w-full rounded mb-4" />
    <p class="text-sm mb-2 text-gray-700">{{ post.caption }}</p>
    <div class="flex gap-4 text-gray-600 text-sm">
      <button @click="likePost">❤️ {{ post.likes_count }}</button>
      <button>💬 {{ post.comments_count }}</button>
      <button>🔁</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    likePost() {
      // ação de curtir (chamada para a API)
    }
  }
}
</script>
